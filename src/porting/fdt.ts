import { readFileSync } from "fs";

// Minimal Flattened Device Tree (DTB) parser, used to pull the OEM device tree
// out of stock ipTIME firmware images (FIT images embed the kernel DTB as-is).

const FDT_MAGIC = 0xd00dfeed;
const FDT_BEGIN_NODE = 1;
const FDT_END_NODE = 2;
const FDT_PROP = 3;
const FDT_NOP = 4;
const FDT_END = 9;

export interface FdtNode {
  name: string;
  props: Map<string, Buffer>;
  children: FdtNode[];
}

export interface OemPartition {
  label: string;
  offset: number;
  size: number;
}

export interface OemDeviceTree {
  file: string;
  offset: number;
  model: string;
  compatible: string[];
  allCompatibles: string[];
  partitions: OemPartition[];
}

function parseFdt(buf: Buffer, base: number): FdtNode | undefined {
  const total = buf.readUInt32BE(base + 4);
  const offStruct = buf.readUInt32BE(base + 8);
  const offStrings = buf.readUInt32BE(base + 12);
  const end = base + total;

  if (offStruct >= total || offStrings >= total) {
    return undefined;
  }

  const readCString = (pos: number) => {
    const zero = buf.indexOf(0, pos);
    return buf.toString("latin1", pos, zero < 0 || zero > end ? end : zero);
  };

  const stack: FdtNode[] = [];
  let root: FdtNode | undefined;
  let pos = base + offStruct;

  while (pos + 4 <= end) {
    const token = buf.readUInt32BE(pos);
    pos += 4;

    if (token === FDT_BEGIN_NODE) {
      const name = readCString(pos);
      pos += (name.length + 1 + 3) & ~3;
      const node: FdtNode = { name, props: new Map(), children: [] };
      stack.at(-1)?.children.push(node);
      root ??= node;
      stack.push(node);
    } else if (token === FDT_END_NODE) {
      stack.pop();
    } else if (token === FDT_PROP) {
      const len = buf.readUInt32BE(pos);
      const nameOff = buf.readUInt32BE(pos + 4);
      pos += 8;
      if (pos + len > end) {
        return undefined;
      }
      stack.at(-1)?.props.set(readCString(base + offStrings + nameOff), buf.subarray(pos, pos + len));
      pos += (len + 3) & ~3;
    } else if (token === FDT_NOP) {
      continue;
    } else if (token === FDT_END) {
      return root;
    } else {
      return undefined;
    }
  }

  return root;
}

function stringList(value: Buffer | undefined): string[] {
  return value ? value.toString("latin1").split("\0").filter(Boolean) : [];
}

function cells(value: Buffer | undefined): number[] {
  if (!value) {
    return [];
  }
  return Array.from({ length: Math.floor(value.length / 4) }, (_, i) => value.readUInt32BE(i * 4));
}

function walk(node: FdtNode, visit: (node: FdtNode, parent: FdtNode | undefined) => void, parent?: FdtNode) {
  visit(node, parent);
  node.children.forEach((child) => walk(child, visit, node));
}

function collectPartitions(root: FdtNode): OemPartition[] {
  const partitions: OemPartition[] = [];

  walk(root, (node, parent) => {
    if (!node.name.startsWith("partition@") || !parent) {
      return;
    }
    const addressCells = cells(parent.props.get("#address-cells"))[0] ?? 1;
    const sizeCells = cells(parent.props.get("#size-cells"))[0] ?? 1;
    const reg = cells(node.props.get("reg"));
    const join = (values: number[]) => values.reduce((acc, value) => acc * 2 ** 32 + value, 0);
    const label = stringList(node.props.get("label"))[0] ?? node.name;

    partitions.push({
      label,
      offset: join(reg.slice(0, addressCells)),
      size: join(reg.slice(addressCells, addressCells + sizeCells)),
    });
  });

  return partitions;
}

// Scans a firmware blob for embedded DTBs and returns the one that looks like the
// kernel device tree (skips FIT containers, prefers the tree with most partitions).
export function extractOemDeviceTree(file: string): OemDeviceTree | undefined {
  const buf = readFileSync(file);
  const magic = Buffer.alloc(4);
  magic.writeUInt32BE(FDT_MAGIC);

  let best: OemDeviceTree | undefined;
  let bestScore = -1;

  for (let pos = buf.indexOf(magic); pos >= 0 && pos + 40 <= buf.length; pos = buf.indexOf(magic, pos + 4)) {
    const total = buf.readUInt32BE(pos + 4);
    if (total < 64 || total > 4_000_000 || pos + total > buf.length) {
      continue;
    }

    let root: FdtNode | undefined;
    try {
      root = parseFdt(buf, pos);
    } catch {
      continue;
    }
    if (!root || root.children.some((child) => child.name === "images")) {
      continue; // FIT container, the real DTB is found separately inside it
    }

    const allCompatibles = new Set<string>();
    walk(root, (node) => stringList(node.props.get("compatible")).forEach((c) => allCompatibles.add(c)));
    if (allCompatibles.size === 0) {
      continue;
    }

    const partitions = collectPartitions(root);
    const score = partitions.length * 1000 + allCompatibles.size;
    if (score > bestScore) {
      bestScore = score;
      best = {
        file,
        offset: pos,
        model: stringList(root.props.get("model"))[0] ?? "",
        compatible: stringList(root.props.get("compatible")),
        allCompatibles: [...allCompatibles].sort(),
        partitions,
      };
    }
  }

  return best;
}

export function formatLayout(partitions: OemPartition[]): string {
  const hex = (n: number) => "0x" + n.toString(16);
  return partitions.map((p) => `${p.label}@${hex(p.offset)}+${hex(p.size)}`).join(", ");
}

export type LayoutMatch = "identical" | "same-labels" | "partial" | "different";

export function compareLayouts(a: OemPartition[], b: OemPartition[]): { match: LayoutMatch; jaccard: number } {
  const key = (p: OemPartition) => `${p.label.toLowerCase()}@${p.offset}+${p.size}`;
  const labelsA = new Set(a.map((p) => p.label.toLowerCase()));
  const labelsB = new Set(b.map((p) => p.label.toLowerCase()));
  const union = new Set([...labelsA, ...labelsB]);
  const intersection = [...labelsA].filter((label) => labelsB.has(label));
  const jaccard = union.size === 0 ? 0 : intersection.length / union.size;

  if (a.length > 0 && a.length === b.length && a.map(key).join() === b.map(key).join()) {
    return { match: "identical", jaccard };
  }
  if (jaccard === 1) {
    return { match: "same-labels", jaccard };
  }
  return { match: jaccard >= 0.5 ? "partial" : "different", jaccard };
}

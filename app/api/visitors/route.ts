import { promises as fs } from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "visitors.json");

let memoryCount: number | null = null;

async function readCount(): Promise<number> {
  try {
    const raw = await fs.readFile(DATA_FILE, "utf8");
    return Number(JSON.parse(raw).count) || 0;
  } catch {
    return memoryCount ?? 0;
  }
}

async function increment(): Promise<number> {
  const next = (await readCount()) + 1;
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify({ count: next }), "utf8");
  } catch {
    memoryCount = next;
  }
  return next;
}

export async function GET() {
  const count = await increment();
  return Response.json({ count });
}
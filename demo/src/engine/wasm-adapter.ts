import type { ExplorerNode, ViewMode } from "../domain/view-model";

export type LayoutNode = {
  id: string;
  kind: ExplorerNode["kind"];
  parentId: string | null;
  x: number;
  y: number;
  size: number;
  depth: number;
};

export type SectionLabel = {
  id: string;
  label: string;
  x: number;
  y: number;
};

export type LayoutResult = {
  canvasHeight: number;
  nodes: LayoutNode[];
  sections: SectionLabel[];
};

type EngineModule = typeof import("../wasm/pkg/culture_engine");

let enginePromise: Promise<EngineModule> | null = null;

export async function layoutWithWasm(
  mode: ViewMode,
  width: number,
  height: number,
  nodes: ExplorerNode[],
): Promise<LayoutResult> {
  const engine = await loadEngine();
  const request = {
    mode,
    width,
    height,
    nodes: nodes.map((node) => ({
      id: node.id,
      kind: node.kind,
      section: node.section,
      parentId: node.parentId,
      weight: node.weight,
    })),
  };
  return JSON.parse(engine.layout_view(JSON.stringify(request))) as LayoutResult;
}

export async function transitionDuration(
  from: ViewMode,
  to: ViewMode,
  nodeCount: number,
): Promise<number> {
  const engine = await loadEngine();
  return engine.transition_duration_ms(from, to, nodeCount);
}

async function loadEngine(): Promise<EngineModule> {
  if (!enginePromise) {
    enginePromise = import("../wasm/pkg/culture_engine").then(async (engine) => {
      await engine.default();
      return engine;
    });
  }
  return enginePromise;
}

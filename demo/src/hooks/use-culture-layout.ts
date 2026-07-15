import { useEffect, useRef, useState } from "react";
import type { ExplorerNode, ViewMode } from "../domain/view-model";
import {
  layoutWithWasm,
  transitionDuration,
  type LayoutResult,
} from "../engine/wasm-adapter";

type EngineState = "loading" | "ready" | "error";

export function useCultureLayout(
  mode: ViewMode,
  width: number,
  height: number,
  nodes: ExplorerNode[],
): { layout: LayoutResult | null; engineState: EngineState; transitionMs: number } {
  const [layout, setLayout] = useState<LayoutResult | null>(null);
  const [engineState, setEngineState] = useState<EngineState>("loading");
  const [transitionMs, setTransitionMs] = useState(560);
  const previousMode = useRef<ViewMode>(mode);

  useEffect(() => {
    if (width < 1 || height < 1) return;
    let current = true;

    Promise.all([
      layoutWithWasm(mode, width, height, nodes),
      transitionDuration(previousMode.current, mode, nodes.length),
    ])
      .then(([nextLayout, duration]) => {
        if (!current) return;
        setLayout(nextLayout);
        setTransitionMs(duration || 360);
        setEngineState("ready");
        previousMode.current = mode;
      })
      .catch((error: unknown) => {
        if (!current) return;
        console.error("Culture layout engine failed", error);
        setEngineState("error");
      });

    return () => {
      current = false;
    };
  }, [height, mode, nodes, width]);

  return { layout, engineState, transitionMs };
}

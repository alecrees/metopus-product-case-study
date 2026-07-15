import { FolderOpen, Home, Radio } from "lucide-react";
import type { CSSProperties, RefObject } from "react";
import type { ExplorerNode } from "../domain/view-model";
import { initials } from "../domain/view-model";
import type { LayoutResult } from "../engine/wasm-adapter";

type CultureCanvasProps = {
  measureRef: RefObject<HTMLDivElement | null>;
  nodes: ExplorerNode[];
  layout: LayoutResult | null;
  selectedId: string | null;
  engineState: "loading" | "ready" | "error";
  transitionMs: number;
  baseHeight: number;
  onSelect: (node: ExplorerNode) => void;
};

type NodeStyle = CSSProperties & {
  "--node-color": string;
  "--node-size": string;
  "--transition-ms": string;
};

export function CultureCanvas({
  measureRef,
  nodes,
  layout,
  selectedId,
  engineState,
  transitionMs,
  baseHeight,
  onSelect,
}: CultureCanvasProps) {
  const nodeById = new Map(nodes.map((node) => [node.id, node]));
  const layoutById = new Map(layout?.nodes.map((node) => [node.id, node]) ?? []);
  const homeLayout = layout?.nodes.find((node) => node.kind === "home");
  const canvasHeight = Math.max(baseHeight, layout?.canvasHeight ?? baseHeight);

  const connections = (layout?.nodes ?? []).flatMap((item) => {
    const parent = item.parentId ? layoutById.get(item.parentId) : null;
    const source = parent ?? (item.kind === "group" ? homeLayout : null);
    if (!source) return [];
    return [{ id: `${source.id}-${item.id}`, source, target: item }];
  });

  return (
    <div className="canvas-shell" ref={measureRef}>
      <div className="culture-canvas" style={{ height: canvasHeight }} aria-label="Culture and Scene visualisation">
        <svg className="connection-layer" width="100%" height={canvasHeight} aria-hidden="true">
          {connections.map(({ id, source, target }) => (
            <line key={id} x1={source.x} y1={source.y} x2={target.x} y2={target.y} />
          ))}
        </svg>

        {layout?.sections.map((section) => (
          <div
            key={section.id}
            className="scene-label"
            style={{ left: section.x, top: section.y }}
          >
            {section.label}
          </div>
        ))}

        {layout?.nodes.map((position) => {
          const node = nodeById.get(position.id);
          if (!node) return null;
          const style: NodeStyle = {
            left: position.x,
            top: position.y,
            zIndex: Math.round(position.depth * 10),
            "--node-color": node.color,
            "--node-size": `${position.size}px`,
            "--transition-ms": `${transitionMs}ms`,
          };
          const status = node.artist?.status;

          return (
            <div key={node.id} className={`node-position node-position--${node.kind}`} style={style}>
              <button
                type="button"
                className={`culture-node ${selectedId === node.id ? "is-selected" : ""}`}
                aria-label={`${node.name}, ${node.kind === "group" ? `${node.memberCount} artists` : node.section}`}
                aria-pressed={selectedId === node.id}
                title={node.name}
                onClick={() => onSelect(node)}
              >
                <span className="node-face">
                  {node.kind === "group" ? (
                    <FolderOpen size={22} aria-hidden="true" />
                  ) : (
                    <span>{initials(node.name)}</span>
                  )}
                </span>
                {node.kind === "home" ? (
                  <span className="node-badge node-badge--home" title="Home Artist">
                    <Home size={11} aria-hidden="true" />
                  </span>
                ) : null}
                {status === "broadcasting" ? (
                  <span className="node-badge node-badge--live" title="Broadcasting">
                    <Radio size={11} aria-hidden="true" />
                  </span>
                ) : status ? (
                  <span className={`status-dot status-dot--${status}`} aria-hidden="true" />
                ) : null}
              </button>
              <span className="node-name">{node.name}</span>
              {node.kind === "group" ? <span className="node-meta">{node.memberCount} artists</span> : null}
            </div>
          );
        })}

        {engineState === "loading" && !layout ? (
          <div className="engine-message" role="status">
            Loading Rust/WASM engine
          </div>
        ) : null}
        {engineState === "error" ? (
          <div className="engine-message engine-message--error" role="alert">
            The layout engine could not be started.
          </div>
        ) : null}
      </div>
    </div>
  );
}

import { useMemo, useRef, useState } from "react";
import { CheckCircle2, CircleAlert } from "lucide-react";
import metopusLogo from "../../assets/brand/metopus-logo-dark.png";
import fixture from "../fixtures/culture.json";
import { ControlBar } from "./components/ControlBar";
import { CultureCanvas } from "./components/CultureCanvas";
import { InspectorPanel } from "./components/InspectorPanel";
import { genresFor, parseCultureContract } from "./domain/culture-contract";
import {
  buildExplorerNodes,
  type ExplorerNode,
  type ViewMode,
} from "./domain/view-model";
import { useCultureLayout } from "./hooks/use-culture-layout";
import { useElementSize } from "./hooks/use-element-size";

const contract = parseCultureContract(fixture);

export default function App() {
  const [mode, setMode] = useState<ViewMode>("culture");
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("all");
  const [groupingEnabled, setGroupingEnabled] = useState(true);
  const [expandedGroupId, setExpandedGroupId] = useState<string | null>(null);
  const [homeArtistId, setHomeArtistId] = useState(contract.homeArtistId);
  const [selectedId, setSelectedId] = useState<string | null>(contract.homeArtistId);
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasSize = useElementSize(canvasRef);
  const baseHeight = canvasSize.width > 0 && canvasSize.width < 600 ? 560 : 640;

  const nodes = useMemo(
    () =>
      buildExplorerNodes(contract, {
        mode,
        homeArtistId,
        query,
        genre,
        groupingEnabled,
        expandedGroupId,
      }),
    [expandedGroupId, genre, groupingEnabled, homeArtistId, mode, query],
  );
  const { layout, engineState, transitionMs } = useCultureLayout(
    mode,
    canvasSize.width,
    baseHeight,
    nodes,
  );
  const selectedNode = nodes.find((node) => node.id === selectedId) ?? nodes.find((node) => node.id === homeArtistId) ?? null;

  const handleModeChange = (nextMode: ViewMode) => {
    setMode(nextMode);
    if (nextMode === "scene") {
      setExpandedGroupId(null);
    }
  };

  const handleSelect = (node: ExplorerNode) => {
    setSelectedId(node.id);
    if (node.kind === "group") {
      setExpandedGroupId((current) => (current === node.id ? null : node.id));
    }
  };

  const handleToggleGroup = (groupId: string) => {
    setExpandedGroupId((current) => (current === groupId ? null : groupId));
  };

  const handleReset = () => {
    setMode("culture");
    setQuery("");
    setGenre("all");
    setGroupingEnabled(true);
    setExpandedGroupId(null);
    setHomeArtistId(contract.homeArtistId);
    setSelectedId(contract.homeArtistId);
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand-lockup">
          <img src={metopusLogo} alt="Metopus" />
          <div>
            <span>Public engineering demo</span>
            <strong>Culture / Scene Explorer</strong>
          </div>
        </div>
        <div className={`engine-status engine-status--${engineState}`}>
          {engineState === "error" ? (
            <CircleAlert size={15} aria-hidden="true" />
          ) : (
            <CheckCircle2 size={15} aria-hidden="true" />
          )}
          {engineState === "ready" ? "Rust/WASM active" : engineState === "error" ? "Engine unavailable" : "Starting engine"}
        </div>
      </header>

      <ControlBar
        mode={mode}
        query={query}
        genre={genre}
        genres={genresFor(contract)}
        groupingEnabled={groupingEnabled}
        onModeChange={handleModeChange}
        onQueryChange={setQuery}
        onGenreChange={setGenre}
        onGroupingChange={(enabled) => {
          setGroupingEnabled(enabled);
          if (!enabled) setExpandedGroupId(null);
        }}
        onReset={handleReset}
      />

      <main className="workspace">
        <CultureCanvas
          measureRef={canvasRef}
          nodes={nodes}
          layout={layout}
          selectedId={selectedNode?.id ?? null}
          engineState={engineState}
          transitionMs={transitionMs}
          baseHeight={baseHeight}
          onSelect={handleSelect}
        />
        <InspectorPanel
          contract={contract}
          selectedNode={selectedNode}
          expandedGroupId={expandedGroupId}
          homeArtistId={homeArtistId}
          onToggleGroup={handleToggleGroup}
          onSetHomeArtist={(artistId) => {
            setHomeArtistId(artistId);
            setSelectedId(artistId);
          }}
        />
      </main>

      <footer className="status-bar">
        <span>{mode === "culture" ? "Culture view" : "Scene view"}</span>
        <span>{nodes.length} visible nodes</span>
        <span>Fixture contract v{contract.version}</span>
      </footer>
    </div>
  );
}

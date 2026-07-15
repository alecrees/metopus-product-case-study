import { Layers3, Orbit, RotateCcw, Rows3, Search } from "lucide-react";
import type { ViewMode } from "../domain/view-model";

type ControlBarProps = {
  mode: ViewMode;
  query: string;
  genre: string;
  genres: string[];
  groupingEnabled: boolean;
  onModeChange: (mode: ViewMode) => void;
  onQueryChange: (query: string) => void;
  onGenreChange: (genre: string) => void;
  onGroupingChange: (enabled: boolean) => void;
  onReset: () => void;
};

export function ControlBar({
  mode,
  query,
  genre,
  genres,
  groupingEnabled,
  onModeChange,
  onQueryChange,
  onGenreChange,
  onGroupingChange,
  onReset,
}: ControlBarProps) {
  return (
    <section className="control-bar" aria-label="View controls">
      <div className="segment-control" aria-label="View mode">
        <button
          type="button"
          className={mode === "culture" ? "is-active" : ""}
          aria-pressed={mode === "culture"}
          onClick={() => onModeChange("culture")}
        >
          <Orbit size={16} aria-hidden="true" />
          Culture
        </button>
        <button
          type="button"
          className={mode === "scene" ? "is-active" : ""}
          aria-pressed={mode === "scene"}
          onClick={() => onModeChange("scene")}
        >
          <Rows3 size={16} aria-hidden="true" />
          Scene
        </button>
      </div>

      <label className="search-control">
        <Search size={16} aria-hidden="true" />
        <span className="sr-only">Search artists</span>
        <input
          type="search"
          value={query}
          placeholder="Search artists"
          onChange={(event) => onQueryChange(event.target.value)}
        />
      </label>

      <label className="select-control">
        <span>Genre</span>
        <select value={genre} onChange={(event) => onGenreChange(event.target.value)}>
          <option value="all">All genres</option>
          {genres.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      <label className={`toggle-control ${mode === "scene" ? "is-disabled" : ""}`}>
        <Layers3 size={16} aria-hidden="true" />
        <span>Culture grouping</span>
        <input
          type="checkbox"
          checked={groupingEnabled}
          disabled={mode === "scene"}
          onChange={(event) => onGroupingChange(event.target.checked)}
        />
        <span className="toggle-track" aria-hidden="true">
          <span />
        </span>
      </label>

      <button
        type="button"
        className="icon-button"
        aria-label="Reset explorer"
        title="Reset explorer"
        onClick={onReset}
      >
        <RotateCcw size={17} aria-hidden="true" />
      </button>
    </section>
  );
}

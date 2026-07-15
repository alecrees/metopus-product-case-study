import { Activity, FolderOpen, Home, Radio, Users } from "lucide-react";
import type { CultureContract } from "../domain/culture-contract";
import { formatFollowers } from "../domain/culture-contract";
import type { ExplorerNode } from "../domain/view-model";

type InspectorPanelProps = {
  contract: CultureContract;
  selectedNode: ExplorerNode | null;
  expandedGroupId: string | null;
  homeArtistId: string;
  onToggleGroup: (groupId: string) => void;
  onSetHomeArtist: (artistId: string) => void;
};

export function InspectorPanel({
  contract,
  selectedNode,
  expandedGroupId,
  homeArtistId,
  onToggleGroup,
  onSetHomeArtist,
}: InspectorPanelProps) {
  if (!selectedNode) {
    return (
      <aside className="inspector-panel">
        <p className="panel-kicker">Selection</p>
        <h2>No visible result</h2>
        <p className="panel-muted">Adjust the current search or genre filter.</p>
      </aside>
    );
  }

  if (selectedNode.group) {
    const members = selectedNode.group.artistIds
      .map((id) => contract.artists.find((artist) => artist.id === id))
      .filter((artist) => Boolean(artist));
    const expanded = expandedGroupId === selectedNode.group.id;

    return (
      <aside className="inspector-panel">
        <div className="panel-heading">
          <span className="panel-icon" style={{ backgroundColor: selectedNode.color }}>
            <FolderOpen size={20} aria-hidden="true" />
          </span>
          <div>
            <p className="panel-kicker">Artist folder</p>
            <h2>{selectedNode.name}</h2>
          </div>
        </div>

        <dl className="detail-grid">
          <div>
            <dt>Members</dt>
            <dd>{members.length}</dd>
          </div>
          <div>
            <dt>State</dt>
            <dd>{expanded ? "Expanded" : "Grouped"}</dd>
          </div>
        </dl>

        <button
          type="button"
          className="primary-command"
          onClick={() => onToggleGroup(selectedNode.group!.id)}
        >
          <FolderOpen size={16} aria-hidden="true" />
          {expanded ? "Collapse folder" : "Expand folder"}
        </button>

        <div className="member-list" aria-label={`${selectedNode.name} members`}>
          {members.map((artist) =>
            artist ? (
              <div key={artist.id} className="member-row">
                <span className="member-swatch" style={{ backgroundColor: artist.color }} />
                <span>
                  <strong>{artist.name}</strong>
                  <small>{artist.genre}</small>
                </span>
                <span className={`member-status member-status--${artist.status}`}>{artist.status}</span>
              </div>
            ) : null,
          )}
        </div>
      </aside>
    );
  }

  const artist = selectedNode.artist;
  if (!artist) return null;
  const isHome = artist.id === homeArtistId;

  return (
    <aside className="inspector-panel">
      <div className="panel-heading">
        <span className="panel-icon" style={{ backgroundColor: artist.color }}>
          {artist.status === "broadcasting" ? (
            <Radio size={20} aria-hidden="true" />
          ) : (
            <Activity size={20} aria-hidden="true" />
          )}
        </span>
        <div>
          <p className="panel-kicker">{isHome ? "Home Artist" : "Artist"}</p>
          <h2>{artist.name}</h2>
          <p className="panel-muted">{artist.genre}</p>
        </div>
      </div>

      <dl className="detail-grid">
        <div>
          <dt>
            <Users size={13} aria-hidden="true" /> Followers
          </dt>
          <dd>{formatFollowers(artist.followers)}</dd>
        </div>
        <div>
          <dt>
            <Activity size={13} aria-hidden="true" /> Activity
          </dt>
          <dd>{artist.activity}%</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd className="capitalize">{artist.status}</dd>
        </div>
        <div>
          <dt>Contract</dt>
          <dd>v{contract.version}</dd>
        </div>
      </dl>

      <div className="activity-meter" aria-label={`Activity ${artist.activity} percent`}>
        <span style={{ width: `${artist.activity}%`, backgroundColor: artist.color }} />
      </div>

      <button
        type="button"
        className="primary-command"
        disabled={isHome}
        onClick={() => onSetHomeArtist(artist.id)}
      >
        <Home size={16} aria-hidden="true" />
        {isHome ? "Current Home Artist" : "Set as Home Artist"}
      </button>
    </aside>
  );
}

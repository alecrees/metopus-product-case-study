import type { CultureArtist, CultureContract, CultureGroup } from "./culture-contract";

export type ViewMode = "culture" | "scene";
export type ExplorerNodeKind = "home" | "artist" | "group";

export type ExplorerNode = {
  id: string;
  name: string;
  kind: ExplorerNodeKind;
  section: string;
  color: string;
  weight: number;
  parentId: string | null;
  artist: CultureArtist | null;
  group: CultureGroup | null;
  memberCount: number;
};

export type BuildViewOptions = {
  mode: ViewMode;
  homeArtistId: string;
  query: string;
  genre: string;
  groupingEnabled: boolean;
  expandedGroupId: string | null;
};

export function buildExplorerNodes(
  contract: CultureContract,
  options: BuildViewOptions,
): ExplorerNode[] {
  const query = options.query.trim().toLocaleLowerCase();
  const visibleArtists = contract.artists.filter((artist) => {
    const matchesQuery = !query || artist.name.toLocaleLowerCase().includes(query);
    const matchesGenre = options.genre === "all" || artist.genre === options.genre;
    return matchesQuery && matchesGenre;
  });
  const homeArtist = contract.artists.find((artist) => artist.id === options.homeArtistId);
  const visibleIds = new Set(visibleArtists.map((artist) => artist.id));
  if (homeArtist) {
    visibleIds.add(homeArtist.id);
  }

  if (options.mode === "scene" || !options.groupingEnabled) {
    return contract.artists
      .filter((artist) => visibleIds.has(artist.id))
      .map((artist) => artistNode(artist, artist.id === options.homeArtistId));
  }

  const groupedIds = new Set(contract.groups.flatMap((group) => group.artistIds));
  const result: ExplorerNode[] = [];

  if (homeArtist) {
    result.push(artistNode(homeArtist, true));
  }

  for (const group of contract.groups) {
    const members = group.artistIds
      .map((artistId) => contract.artists.find((artist) => artist.id === artistId))
      .filter((artist): artist is CultureArtist => Boolean(artist))
      .filter((artist) => artist.id !== options.homeArtistId && visibleIds.has(artist.id));

    if (members.length === 0) {
      continue;
    }

    result.push(groupNode(group, members.length));
    if (group.id === options.expandedGroupId) {
      result.push(...members.map((artist) => artistNode(artist, false, group.id)));
    }
  }

  if (!options.expandedGroupId) {
    result.push(
      ...contract.artists
        .filter(
          (artist) =>
            artist.id !== options.homeArtistId &&
            visibleIds.has(artist.id) &&
            !groupedIds.has(artist.id),
        )
        .map((artist) => artistNode(artist, false)),
    );
  }

  return result;
}

export function initials(name: string): string {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

function artistNode(artist: CultureArtist, isHome: boolean, parentId: string | null = null): ExplorerNode {
  return {
    id: artist.id,
    name: artist.name,
    kind: isHome ? "home" : "artist",
    section: artist.genre,
    color: artist.color,
    weight: artist.activity / 100,
    parentId,
    artist,
    group: null,
    memberCount: 0,
  };
}

function groupNode(group: CultureGroup, memberCount: number): ExplorerNode {
  return {
    id: group.id,
    name: group.name,
    kind: "group",
    section: "Artist folders",
    color: group.color,
    weight: Math.min(1, 0.56 + memberCount * 0.07),
    parentId: null,
    artist: null,
    group,
    memberCount,
  };
}

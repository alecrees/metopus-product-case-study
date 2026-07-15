export type ArtistStatus = "broadcasting" | "active" | "new" | "quiet";

export type CultureArtist = {
  id: string;
  name: string;
  genre: string;
  color: string;
  activity: number;
  followers: number;
  status: ArtistStatus;
};

export type CultureGroup = {
  id: string;
  name: string;
  color: string;
  artistIds: string[];
};

export type CultureContract = {
  version: 1;
  viewerId: string;
  homeArtistId: string;
  artists: CultureArtist[];
  groups: CultureGroup[];
};

const ARTIST_STATUSES = new Set<ArtistStatus>(["broadcasting", "active", "new", "quiet"]);

export function parseCultureContract(value: unknown): CultureContract {
  const contract = requireRecord(value, "culture contract");
  if (contract.version !== 1) {
    throw new Error("The public demo supports Culture contract version 1.");
  }

  const artists = requireArray(contract.artists, "artists").map((artist, index) =>
    parseArtist(artist, index),
  );
  const groups = requireArray(contract.groups, "groups").map((group, index) =>
    parseGroup(group, index),
  );
  const artistIds = new Set(artists.map((artist) => artist.id));
  const homeArtistId = requireString(contract.homeArtistId, "homeArtistId");

  if (!artistIds.has(homeArtistId)) {
    throw new Error("homeArtistId must reference an artist in the contract.");
  }

  for (const group of groups) {
    for (const artistId of group.artistIds) {
      if (!artistIds.has(artistId)) {
        throw new Error(`Group ${group.id} references an unknown artist: ${artistId}`);
      }
    }
  }

  return {
    version: 1,
    viewerId: requireString(contract.viewerId, "viewerId"),
    homeArtistId,
    artists,
    groups,
  };
}

export function genresFor(contract: CultureContract): string[] {
  return [...new Set(contract.artists.map((artist) => artist.genre))].sort((a, b) =>
    a.localeCompare(b),
  );
}

export function formatFollowers(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    notation: value >= 10_000 ? "compact" : "standard",
    maximumFractionDigits: 1,
  }).format(value);
}

function parseArtist(value: unknown, index: number): CultureArtist {
  const artist = requireRecord(value, `artists[${index}]`);
  const status = requireString(artist.status, `artists[${index}].status`) as ArtistStatus;
  if (!ARTIST_STATUSES.has(status)) {
    throw new Error(`artists[${index}].status is not supported.`);
  }

  return {
    id: requireString(artist.id, `artists[${index}].id`),
    name: requireString(artist.name, `artists[${index}].name`),
    genre: requireString(artist.genre, `artists[${index}].genre`),
    color: requireHexColor(artist.color, `artists[${index}].color`),
    activity: requireRange(artist.activity, `artists[${index}].activity`, 0, 100),
    followers: requireRange(artist.followers, `artists[${index}].followers`, 0, Number.MAX_SAFE_INTEGER),
    status,
  };
}

function parseGroup(value: unknown, index: number): CultureGroup {
  const group = requireRecord(value, `groups[${index}]`);
  return {
    id: requireString(group.id, `groups[${index}].id`),
    name: requireString(group.name, `groups[${index}].name`),
    color: requireHexColor(group.color, `groups[${index}].color`),
    artistIds: requireArray(group.artistIds, `groups[${index}].artistIds`).map((id, artistIndex) =>
      requireString(id, `groups[${index}].artistIds[${artistIndex}]`),
    ),
  };
}

function requireRecord(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${label} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function requireArray(value: unknown, label: string): unknown[] {
  if (!Array.isArray(value)) {
    throw new Error(`${label} must be an array.`);
  }
  return value;
}

function requireString(value: unknown, label: string): string {
  if (typeof value !== "string" || !value.trim()) {
    throw new Error(`${label} must be a non-empty string.`);
  }
  return value.trim();
}

function requireHexColor(value: unknown, label: string): string {
  const color = requireString(value, label);
  if (!/^#[0-9a-f]{6}$/i.test(color)) {
    throw new Error(`${label} must be a six-digit hex colour.`);
  }
  return color;
}

function requireRange(value: unknown, label: string, min: number, max: number): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < min || value > max) {
    throw new Error(`${label} must be between ${min} and ${max}.`);
  }
  return value;
}

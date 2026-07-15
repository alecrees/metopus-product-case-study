import { describe, expect, it } from "vitest";
import fixture from "../../fixtures/culture.json";
import { parseCultureContract } from "./culture-contract";
import { buildExplorerNodes, type BuildViewOptions } from "./view-model";

const contract = parseCultureContract(fixture);
const baseOptions: BuildViewOptions = {
  mode: "culture",
  homeArtistId: contract.homeArtistId,
  query: "",
  genre: "all",
  groupingEnabled: true,
  expandedGroupId: null,
};

describe("buildExplorerNodes", () => {
  it("collapses grouped artists into public folder nodes", () => {
    const nodes = buildExplorerNodes(contract, baseOptions);
    expect(nodes.filter((node) => node.kind === "group")).toHaveLength(3);
    expect(nodes.some((node) => node.id === "north-static")).toBe(false);
  });

  it("reveals only the selected folder members", () => {
    const nodes = buildExplorerNodes(contract, {
      ...baseOptions,
      expandedGroupId: "night-circuit",
    });
    expect(nodes.find((node) => node.id === "north-static")?.parentId).toBe("night-circuit");
    expect(nodes.some((node) => node.id === "black-harbour")).toBe(false);
    expect(nodes.some((node) => node.id === "june-atlas")).toBe(false);
  });

  it("shows individual artists in Scene mode", () => {
    const nodes = buildExplorerNodes(contract, { ...baseOptions, mode: "scene" });
    expect(nodes).toHaveLength(contract.artists.length);
    expect(nodes.every((node) => node.kind !== "group")).toBe(true);
  });

  it("keeps the Home Artist visible while filtering", () => {
    const nodes = buildExplorerNodes(contract, {
      ...baseOptions,
      genre: "Rock",
      groupingEnabled: false,
    });
    expect(nodes.some((node) => node.id === contract.homeArtistId)).toBe(true);
  });
});

import { describe, expect, it } from "vitest";
import fixture from "../../fixtures/culture.json";
import { parseCultureContract } from "./culture-contract";

describe("parseCultureContract", () => {
  it("accepts the reviewed public fixture", () => {
    const contract = parseCultureContract(fixture);
    expect(contract.version).toBe(1);
    expect(contract.artists).toHaveLength(18);
    expect(contract.groups).toHaveLength(3);
  });

  it("rejects a home artist outside the contract", () => {
    expect(() =>
      parseCultureContract({
        ...fixture,
        homeArtistId: "missing-artist",
      }),
    ).toThrow(/homeArtistId/);
  });

  it("rejects group references to unknown artists", () => {
    expect(() =>
      parseCultureContract({
        ...fixture,
        groups: [{ ...fixture.groups[0], artistIds: ["missing-artist"] }],
      }),
    ).toThrow(/unknown artist/);
  });
});

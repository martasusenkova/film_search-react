import { describe, it, expect } from "vitest";
import { transformMovies } from "../services/mappers/transformMovies";
import type { MovieAPI } from "types";

describe("transformMovies", () => {
  it("maps API movie fields to internal Movie type", () => {
    const api: MovieAPI[] = [
      { Title: "A Movie", Year: "2000", Type: "movie", Poster: "url", imdbID: "tt001" },
    ];
    const res = transformMovies(api);
    expect(res).toEqual([
      { title: "A Movie", year: "2000", type: "movie", poster: "url", imdbID: "tt001" },
    ]);
  });
});

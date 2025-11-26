import { describe, it, expect } from "vitest";
import { transformMovies } from "../services/mappers/transformMovies";
describe("transformMovies", () => {
    it("maps API movie fields to internal Movie type", () => {
        const api = [
            { Title: "A Movie", Year: "2000", Type: "movie", Poster: "url", imdbID: "tt001" },
        ];
        const res = transformMovies(api);
        expect(res).toEqual([
            { title: "A Movie", year: "2000", type: "movie", poster: "url", imdbID: "tt001" },
        ]);
    });
});

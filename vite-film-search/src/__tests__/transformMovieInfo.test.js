import { describe, it, expect } from "vitest";
import { transformMovieInfo } from "../services/mappers/transformMovieInfo";
describe("transformMovieInfo", () => {
    it("splits genres and maps ratings", () => {
        const api = {
            imdbID: "tt1",
            Title: "My Movie",
            Actors: "A, B",
            Released: "01 Jan 2000",
            Year: "2000",
            Genre: "Drama,Comedy",
            Director: "D",
            Writer: "W",
            Plot: "Plot",
            Country: "Country",
            Poster: "poster.jpg",
            Ratings: [{ Source: "Internet", Value: "8/10" }],
            Metascore: "75",
            imdbRating: "8.0",
            totalSeasons: undefined,
            BoxOffice: "$1",
            Production: "Prod",
            Runtime: "120 min",
            Rated: "",
            Language: "",
            Awards: "",
            imdbVotes: "",
            Type: "",
            Response: "",
        };
        const res = transformMovieInfo(api);
        expect(res.genres).toEqual(["Drama", "Comedy"]);
        expect(res.ratings).toEqual([{ value: "8/10", source: "Internet" }]);
        expect(res.totalSeasons).toBe("");
    });
});

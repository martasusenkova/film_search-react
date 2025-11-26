import axios from "axios";
class restMoviesAPI {
    urlAPI = import.meta.env.VITE_API_URL ?? "";
    keyAPI = import.meta.env.VITE_API_KEY ?? "";
    API = axios.create({
        baseURL: this.urlAPI,
        params: {
            apikey: this.keyAPI,
        },
    });
    async getMovie(id) {
        const params = {
            i: id,
            plot: "full",
        };
        const { data } = await this.API.get("", { params });
        if (data.Error)
            throw new Error(data.Error);
        return data;
    }
    async getSearchMovies({ name, type = null, year = null, page }) {
        const params = {
            s: name,
            type,
            y: year,
            page,
        };
        const { data } = await this.API.get("", { params });
        if (data.Error)
            throw new Error(data.Error);
        return data;
    }
}
export const moviesApi = new restMoviesAPI();

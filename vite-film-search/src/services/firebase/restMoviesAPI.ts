import axios from "axios";
import type { MovieSearchAPI, MovieInfoAPI, RequestOption } from "types";

class restMoviesAPI {
  private readonly urlAPI = import.meta.env.VITE_API_URL ?? "";
  private readonly keyAPI = import.meta.env.VITE_API_KEY ?? "";
  private readonly API = axios.create({
    baseURL: this.urlAPI,
    params: {
      apikey: this.keyAPI,
    },
  });

  public async getMovie(id: string) {
    const params = {
      i: id,
      plot: "full",
    };
    const { data } = await this.API.get<MovieInfoAPI>("", { params });
    if (data.Error) throw new Error(data.Error);
    return data;
  }
  public async getSearchMovies({ name, type = null, year = null, page }: RequestOption) {
    const params = {
      s: name,
      type,
      y: year,
      page,
    };
    const { data } = await this.API.get<MovieSearchAPI>("", { params });
    if (data.Error) throw new Error(data.Error);
    return data;
  }
}

export const moviesApi = new restMoviesAPI();

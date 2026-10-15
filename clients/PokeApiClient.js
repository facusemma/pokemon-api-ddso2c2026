import axios from 'axios';

export default class PokeApiClient {
  constructor() {
    this.baseUrl = 'https://pokeapi.co/api/v2';
  }

  async fetchBaseList(limit = 50) {
    const response = await axios.get(`${this.baseUrl}/pokemon?limit=${limit}`);
    return response.data.results;
  }

  async fetchDetail(url) {
    const response = await axios.get(url);
    return response.data;
  }
}
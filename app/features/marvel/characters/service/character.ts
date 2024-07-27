import { AxiosInstance } from 'axios';

export default class CharacterService {
  private api: AxiosInstance;

  constructor(api: AxiosInstance) {
    this.api = api;
  }

  async getCharacterById(id: number): Promise<any> {
    const response = await this.api.get(`/characters/${id}`);
    return response.data.data.results[0];
  }

  async getCharacters(limit: number = 20, offset: number = 0): Promise<any[]> {
    const response = await this.api.get('/characters', {
      params: {
        limit,
        offset,
      },
    });
    return response.data.data.results;
  }
}

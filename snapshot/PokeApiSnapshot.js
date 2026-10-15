import fsPromises from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import PokeApiClient from '../clients/PokeApiClient.js';
import Pokemon from '../models/Pokemon.js';
import { MapPokemon } from '../mappers/MapPokemon.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class PokeApiSnapshot {
  constructor() {
    this.client = new PokeApiClient();
    this.filePath = path.join(__dirname, 'pokemon_snapshot.json');
  }

  existsOnDisk() {
    return existsSync(this.filePath);
  }

  async refresh() {
    console.log('Obteniendo datos de la API externa...');
    try {
      const list = await this.client.fetchBaseList(50);
      const detailPromises = list.map(p => this.client.fetchDetail(p.url));
      const rawDetails = await Promise.all(detailPromises);

      const mappedData = rawDetails.map(MapPokemon);

      await fsPromises.writeFile(this.filePath, JSON.stringify(mappedData, null, 2), 'utf-8');
      console.log(`Snapshot guardado exitosamente: ${this.filePath}`);
    } catch (error) {
      console.error('Error al generar el snapshot:', error.message);
      throw error;
    }
  }

  async readFromDisk() {
    if (!this.existsOnDisk()) {
      throw new Error('El archivo de snapshot no existe.');
    }
    const rawContent = await fsPromises.readFile(this.filePath, 'utf-8');
    const rawList = JSON.parse(rawContent);

    return rawList.map(data => new Pokemon(data));
  }
}

export default new PokeApiSnapshot();
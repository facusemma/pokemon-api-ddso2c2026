import crypto from 'crypto'; 

export default class Entrenador {
  constructor({ nombre, edad, ciudad, equipoPokemon = [], medallas = [] }) {
    this.id = crypto.randomUUID();
    this.nombre = nombre;
    this.edad = edad;
    this.ciudad = ciudad;
    this.equipoPokemon = equipoPokemon;
    this.medallas = medallas;
  }

  agregarPokemon(pokemon) {
    return this.equipoPokemon.push(pokemon);
  }

  quitarPokemon(pokemon) {
    return this.equipoPokemon = this.equipoPokemon.filter(p => p.id !== pokemon.id);
  }

  agregarMedalla(medalla) {
    return this.medallas.push(medalla);
  }

  quitarMedalla(medalla) {
    return this.medallas = this.medallas.filter(m => m.nombre !== medalla.nombre);
  }
}
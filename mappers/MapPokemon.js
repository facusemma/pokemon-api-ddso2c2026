const diccionarioTipos = {
    normal: "normal", fighting: "lucha", flying: "volador",
    poison: "veneno", ground: "tierra", rock: "roca",
    bug: "bicho", ghost: "fantasma", steel: "acero",
    fire: "fuego", water: "agua", grass: "planta",
    electric: "electrico", psychic: "psiquico", ice: "hielo",
    dragon: "dragon", dark: "siniestro", fairy: "hada"
};

const diccionarioStats = {
    "hp": "vida",
    "attack": "ataque",
    "defense": "defensa",
    "special-attack": "ataque especial",
    "special-defense": "defensa especial",
    "speed": "velocidad"
};

export const MapPokemon = (raw) => {
  return {
    id: raw.id,
    nombre: raw.name,
    altura: raw.height,
    peso: raw.weight,
    estadisticas: raw.stats.map(s => ({
      nombre: diccionarioStats[s.stat.name] || s.stat.name,
      stat_base: s.base_stat
    })),
    tipos: raw.types.map(t => diccionarioTipos[t.type.name] || t.type.name)
  };
};
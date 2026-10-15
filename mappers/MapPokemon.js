export const MapPokemon = (raw) => {
  return {
    id: raw.id,
    nombre: raw.name,
    altura: raw.height,
    peso: raw.weight,
    estadisticas: raw.stats.map(s => ({
      nombre: s.stat.name,
      stat_base: s.base_stat
    })),

    tipos: raw.types.map(t => t.type.name)
  };
};
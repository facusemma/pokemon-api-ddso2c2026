export default class Pokemon {
  constructor({ id, nombre, altura, peso, estadisticas, tipos }) {
    this.id = id;
    this.nombre = nombre;
    this.altura = altura;
    this.peso = peso;
    this.estadisticas = estadisticas;
    this.tipos = tipos;
  }

  getTotalestadisticas() {
    return this.estadisticas.reduce((total, stat) => total + stat.stat_base, 0);
  }

  getStatValue(statnombre) {
    const stat = this.estadisticas.find(s => s.nombre === statnombre.toLowerCase());
    return stat ? stat.stat_base : 0;
  }

  hasType(typenombre) {
    return this.tipos.includes(typenombre.toLowerCase());
  }
}
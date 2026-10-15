import crypto from 'crypto';

export default class Medalla {
    constructor({ nombre, descripcion, fechaYHoraObtencion, nombreJefe }) {
        this.id = crypto.randomUUID();
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaYHoraObtencion = fechaYHoraObtencion;
        this.nombreJefe = nombreJefe;
    }
}
import { MedallasService } from "../services/MedallasService.js";

export class MedallasController {
    constructor({ medallasService = new MedallasService() } = {}) {
        this.medallasService = medallasService;
    }

    crearMedalla = async (req, res) => {
        const medalla = await this.medallasService.crearMedalla(req.body);
        res.status(201).json(medalla);
    }

    obtenerMedallas = async (req, res) => {
        const medallas = await this.medallasService.obtenerMedallas();
        res.json(medallas);
    }

    obtenerMedalla = async (req, res) => {
        const medalla = await this.medallasService.obtenerMedalla(req.params.idMedalla);
        res.json(medalla);
    }

    editarMedalla = async (req, res) => {
        const medallaActualizada = await this.medallasService.editarMedalla(req.params.idMedalla, req.body);
        res.json(medallaActualizada);
    }

    borrarMedalla = async (req, res) => {
        const resultado = await this.medallasService.borrarMedalla(req.params.idMedalla);
        res.json(resultado);
    }
}
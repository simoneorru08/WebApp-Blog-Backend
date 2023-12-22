"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
const Articolo_1 = __importDefault(require("../../Articolo"));
const path_1 = __importDefault(require("path"));
const router = express_1.default.Router();
//Path del file json
const articoliListPath = path_1.default.join(__dirname, "../../ArticoliList.json");
//Lista degli articoli presenti
const fileContent = fs_1.default.readFileSync(articoliListPath, 'utf-8');
const articoli = JSON.parse(fileContent);
// Restituisce dettaglio singolo articolo
router.get('/:id', (req, res) => {
    const found = articoli.some((articolo) => articolo.id === req.params.id);
    //Se l'articolo è presente, restituisco il dettaglio
    if (found) {
        res.json(articoli.filter((articolo) => articolo.id === req.params.id)[0]);
    }
    else {
        res.status(400).json({ msg: "Non esiste nessun articolo con l'id " + req.params.id });
    }
});
// Restituisci tutti gli articoli
router.get('/', (req, res) => {
    res.json(articoli);
});
// Crea nuovo articolo
router.post('/crea', (req, res) => {
    //In caso di dati mancanti, restituisce errore
    if (!req.body.titolo || !req.body.nomeAutore || !req.body.testo) {
        return res.status(400).json({ msg: "Non tutti i campi sono valorizzati" });
    }
    //Creo il nuovo articolo e lo inserisco
    const nuovoArticolo = new Articolo_1.default((0, uuid_1.v4)(), req.body.titolo, req.body.nomeAutore, req.body.testo, (0, moment_1.default)().format());
    articoli.push(nuovoArticolo);
    //Vado a modificare il json
    fs_1.default.writeFileSync("src/ArticoliList.json", JSON.stringify(articoli, null, 2), 'utf8');
    res.send("Success");
});
module.exports = router;

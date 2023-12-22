import express from "express";
import fs from 'fs';
import {v4 as uuidv4 } from 'uuid';
import moment from 'moment';
import Articolo from '../../Articolo';
import path from "path";

const router = express.Router();

//Path del file json
const articoliListPath = path.join(__dirname, "../../ArticoliList.json");

//Lista degli articoli presenti
const fileContent = fs.readFileSync(articoliListPath, 'utf-8');
const articoli: Articolo[] = JSON.parse(fileContent);

// Restituisce dettaglio singolo articolo
router.get('/:id', (req, res) => {
    const found = articoli.some((articolo: Articolo) => articolo.id === req.params.id);
    //Se l'articolo è presente, restituisco il dettaglio
    if(found){
        res.json(articoli.filter((articolo: Articolo) =>articolo.id === req.params.id)[0]);
    }else{
        res.status(400).json({msg: "Non esiste nessun articolo con l'id " + req.params.id});
    }
});


// Restituisci tutti gli articoli
router.get('/', (req,res) => {
    res.json(articoli);
});


// Crea nuovo articolo
router.post('/crea', (req, res) => {
    //In caso di dati mancanti, restituisce errore
    if(!req.body.titolo || !req.body.nomeAutore || !req.body.testo){
        return res.status(400).json({msg: "Non tutti i campi sono valorizzati"});
    }

    //Creo il nuovo articolo e lo inserisco
    const nuovoArticolo = new Articolo(uuidv4(),req.body.titolo,req.body.nomeAutore,req.body.testo,moment().format());
    (articoli as any[]).push(nuovoArticolo);

    //Vado a modificare il json
    fs.writeFileSync("src/ArticoliList.json", JSON.stringify(articoli, null, 2), 'utf8');

    res.send("Success");
})

module.exports = router;
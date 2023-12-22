export default class Article {
    id: string;
    titolo: string;
    nomeAutore: string;
    testo: string;
    dataCreazione: string;

    constructor(id: string, titolo: string, nomeAutore: string, testo: string, dataCreazione: string){
        this.id = id;
        this.titolo = titolo;
        this.nomeAutore = nomeAutore;
        this.testo = testo;
        this.dataCreazione = dataCreazione;
    }
}
# Taekwondo Caserta Hub

Agisci come un web designer e sviluppatore front-end esperto. Crea il sito web completo di una scuola di taekwondo, scritto in italiano.



## Obiettivo

Un sito moderno e curato che permetta a famiglie e adulti di trovare subito orari, sede e telefono. Il pubblico comprende anche persone anziane poco abituate alla tecnologia, quindi la semplicità d'uso viene prima dell'effetto scenico.



## Dati della scuola

- Nome: Taekwondo Ispanico Caserta (Team Rago)

- Motto: "Volere è potere con il Taekwondo Ispanico"

- Direttore tecnico: M. Antonio Rago, 8° Dan

- Affiliazioni: World Taekwondo, FITA

- Corsi iniziati il 1° settembre

- Sede: Santangelo Sport Village, Via Eugenio Ruggiero 12, 81100 Caserta (CE)

- Telefono: +39 327 622 6136

- Instagram: @taekwondo.ispanico (https://www.instagram.com/taekwondo.ispanico)



## Orari e fasce d'età

Lunedì, mercoledì e venerdì:

- 18:00–19:00, primo turno, 5–10 anni

- 19:00–20:15, secondo turno, 10–14 anni

- 20:15–21:30, terzo turno, dai 14 anni

Martedì e giovedì:

- 19:15–20:15, turno unico, over e amatori



## Logo e colori

Ti allego il logo (cerchio nero con scritta bianca, sagoma di un calcio di taekwondo e scritta in coreano). Ricava la palette dal logo: principalmente nero, bianco e un grigio medio. Niente altri colori accesi. Usa il logo nell'intestazione e nella parte iniziale della pagina.



## Stile

- Moderno, sobrio, con un carattere deciso. Sfondo nero, testi bianchi, nessuna decorazione superflua.

- Titoli con un font serif elegante e corposo, che richiami le lettere del logo (per esempio Playfair Display). Testi con un font sans-serif molto leggibile (per esempio Atkinson Hyperlegible).

- Evita l'aspetto da modello generico: niente gradienti decorativi, niente schede tutte uguali con ombre, niente animazioni continue.



## Accessibilità e semplicità (requisito prioritario)

- Testo base di almeno 20 px, interlinea ampia, righe non più larghe di circa 70 caratteri.

- Contrasto altissimo (bianco su nero), rispetto delle linee guida WCAG AA.

- Pulsanti grandi (altezza minima 56 px) con testo chiaro: "Chiama ora", "Vedi gli orari", "Apri la mappa".

- Menu con poche voci, sempre visibile in alto, senza menu a tendina né hamburger nascosti.

- Evidenzia sempre l'evidenza della tastiera (focus visibile) e rispetta "riduci animazioni".

- Il numero di telefono deve essere cliccabile (link tel:) e comparire nella parte iniziale.

- Perfettamente utilizzabile da telefono, tablet e computer.



## Sezioni (in quest'ordine)

1. Parte iniziale: logo, motto come titolo, una frase di presentazione, pulsanti "Chiama ora" e "Vedi gli orari".

2. Chi siamo: presentazione breve della scuola, delle affiliazioni e dell'inizio dei corsi. Lascia un segnaposto per storia e risultati.

3. Corsi e orari: due tabelle chiare (lunedì-mercoledì-venerdì e martedì-giovedì) con turno, orario ed età. Pulsante "Chiama per informazioni".

4. Istruttori: scheda di M. Antonio Rago (direttore tecnico, 8° Dan) e una scheda segnaposto per gli altri istruttori, con spazio per foto e breve biografia.

5. Galleria foto: griglia di immagini con didascalia, con un messaggio semplice se non ci sono ancora foto.

6. Foto di eventi e gare: modulo per caricare nuove foto (scelta del file e descrizione) che le aggiunge alla galleria, con messaggi chiari di conferma o di errore.

7. Contatti e dove siamo: indirizzo, telefono, Instagram e una mappa (incorporata, oppure un pulsante che apre Google Maps).

8. Piè di pagina: nome della scuola e affiliazioni.



## Contenuti mancanti

Dove mancano informazioni (email, biografie, storia, prezzi, foto), inserisci segnaposto evidenti tra parentesi quadre, facili da trovare e sostituire. Non inventare dati, risultati o prezzi.



## Aspetti tecnici

- Fornisci il codice completo e funzionante, preferibilmente in un unico file HTML con CSS e JavaScript inclusi, senza dipendenze complicate.

- Includi i tag meta per i motori di ricerca (titolo, descrizione) e i dati strutturati della scuola sportiva con indirizzo e telefono.

- Per il caricamento delle foto, spiega come collegarlo a un servizio di archiviazione (per esempio Firebase Storage, Supabase o Cloudinary) e inserisci nel codice i punti da configurare. Se non è possibile, proponi l'alternativa più semplice (per esempio invio via WhatsApp o email e pubblicazione da parte del responsabile).

- Aggiungi in fondo le istruzioni, in italiano e per un non esperto, per pubblicare il sito online e per modificare testi, orari e foto.



Prima di scrivere il codice, riassumi in poche righe le scelte di design (palette, caratteri, struttura). Se qualcosa non è chiaro, fai al massimo tre domande.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/db166a09-4473-41dd-9a77-4da0899eb1d8).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

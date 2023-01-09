# VUE-ramverk
Denna webbplats är skapad med Vue. 

Detta är en intranätsapplikation för hantering av lagervaror till ett fiktivt företag.

Funktion som är implementerad i applikationen:
- Lägga till, läsa ut, redigera och radera enkilda produkter
- Lägga till, läsa ut, redigera och radera enskilda produktkategorier
- Lägga till, läsa ut och radera rapporter
- Läsa ut logg (ny rad adderas när uppdatering av antal varor skett på produkt och raderas när produkten raderas)

## Git clone
Använd <i>git clone https://github.com/Webbutvecklings-programmet/projekt---klient-applikation-rasmus-ason.git</i> för att ladda ner repo lokalt.

## Installera NPM-paket
```sh
npm install
```

### Utveckla lokalt
Öppnar lokal server
```sh
npm run dev
```

### Skapa/uppdatera dist-katalog för publicering
```sh
npm run build
```

### Uppdatera repo
1. git add .
2. git commit "kommentar"
3. git push


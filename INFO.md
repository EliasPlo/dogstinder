## Vaihe 1: Suunnittelu ja määrittely
Tavoitteena on varmistaa, että projekti on hyvin suunniteltu ja kaikki tekniset sekä liiketoiminnalliset vaatimukset ovat selkeitä.

### 1.1. Teknologiapäätökset
- Frontend: React + Material UI
- Backend: Node.js + Express
- Tietokanta: MongoDB
- Karttapalvelu: OpenStreetMap + Leaflet.js
- Reaaliaikaisuus: WebSockets (esim. Socket.io)

### 1.2. Käyttöliittymän suunnittelu
Luo Figma-prototyyppi sovelluksen näkymistä:
- Rekisteröinti/kirjautuminen
- Pääsivu/etusivu
- kartta ja puistojen aktiivisuus
- Profiilin hallinta
- Chat- ja ilmoitusnäkymät
- Tapahtuman ja reittienhallintanäkymät

- Asetukset:
  - Käyttöehdot ja tietosuojakäytännöt.
  - Profiilin yksityisyys: Julkinen, yksityinen, vain kaverit.
- Käyttäjätasot:
  - Peruskäyttäjä: Voi ladata kuvia, luoda tapahtumia.
  - Super User: Voi hallita tapahtumia ja moderointia.
  - Admin: Ylläpitää palvelua, hallitsee käyttäjiä.

2. Keskeiset ominaisuudet
    - Profiilin luonti: Käyttäjät voivat luoda profiilin itselleen ja koiralleen.
    - Kartta: Reaaliaikainen näkymä koirapuistoista ja niiden aktiivisuudesta.
    - Ilmoitukset: Mahdollisuus vastaanottaa ilmoituksia kaverien aktiviteeteista   (valittavissa käyttäjäasetuksissa).
    - Viestintä: Chat-ominaisuus ja keskusteluyhteisö.
    - Tapahtumat: Mahdollisuus järjestää ja osallistua tapahtumiin.
    - Kuvien jakaminen: Kameraominaisuus, kuvien tykkäykset ja kommentit.
    - Reitit: Ulkoilureittien jakaminen ja nauhoittaminen.
    - Koiraystävälliset paikat: Kahvilat, ravintolat ja muut palvelut.
    - Koiran ruokakaupat: Ilmoitukset tarjouksista ja myyntipaikat.
    - Eläinlääkärit ja hoitolat: Sijainnit ja aukioloajat.

3. Käyttötapaukset
1. Omistaja:
   - Luo profiilin.
   - Lisää viestin.
   - Luo ulkoilureitin.
   - Selaa ruokapaikkoja ja kauppoja.
   - Selaa ja hakee puistoja.
   - Selaa eläinlääkäreitä.
   - Saa ilmoituksia ystävien aktiviteeteista.
2. Tapahtuman järjestäjä: 
   - Luo tapahtuman ja kutsuu osallistujia.
3. Admin:
   - Lisää puiston järjestelmään.
   - Lisää eläinlääkärin tietokantaan.
   - Hallinnoi käyttäjiä ja tapahtumia.

## Vaihe 2: MVP-kehitys (Minimum Viable Product)
Tavoitteena saada sovelluksen perusominaisuudet nopeasti toimintaan ja testata käytettävyyttä.

### 2.1. Backendin rakentaminen
 Käyttäjähallinta:

Node.js + Express REST API
Firebase Auth tai OAuth tunnistautuminen
 Tietokanta (MongoDB + Mongoose):

Käyttäjäprofiilit (omistaja + koira)
Koirapuistojen sijainnit ja aktiivisuus
Viestit ja tapahtumat
Tallennetut reitit
 Kartta-API ja sijaintipalvelut:

OpenStreetMap-integraatio (Leaflet.js)
Reaaliaikainen sijaintipäivitys
 Ilmoitukset ja chat:

Socket.io WebSockets reaaliaikaisiin viesteihin
Push-ilmoitukset Firebase Cloud Messaging (FCM)

## Vaihe 3: Frontend-kehitys
Komponenttien kehitys Reactilla: 
- Profiilisivu (käyttäjä + koira), 
- Karttanäkymä (puistot + aktiivisuus), 
- Chat ja ilmoitukset, 
- Tapahtumien hallinta

Tilanhallinta: React Context API / Redux
Tyylit: Material UI


















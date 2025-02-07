**Projektisuunnitelma ja vaatimusmäärittely: KoiraSovellus**

**1. Johdanto**
KoiraSovellus on koiranomistajille suunnattu sosiaalisen median sovellus, joka mahdollistaa koirapuistojen aktiivisuuden tarkistamisen, ilmoitusten vastaanottamisen kavereiden puistoaktiviteeteista sekä viestinnän muiden koiranomistajien kanssa. Sovellus tarjoaa myös muita lisäominaisuuksia, kuten tapahtumien järjestämisen, reittien tallentamisen ja koiraystävällisten paikkojen kartoittamisen.

**2. Keskeiset ominaisuudet**
- **Profiilin luonti**: Käyttäjät voivat luoda profiilin itselleen ja koiralleen.
- **Kartta**: Reaaliaikainen näkymä koirapuistoista ja niiden aktiivisuudesta.
- **Ilmoitukset**: Mahdollisuus vastaanottaa ilmoituksia kaverien aktiviteeteista (valittavissa käyttäjäasetuksissa).
- **Viestintä**: Chat-ominaisuus ja keskusteluyhteisö.
- **Tapahtumat**: Mahdollisuus järjestää ja osallistua tapahtumiin.
- **Kuvien jakaminen**: Kameraominaisuus, kuvien tykkäykset ja kommentit.
- **Reitit**: Ulkoilureittien jakaminen ja nauhoittaminen.
- **Koiraystävälliset paikat**: Kahvilat, ravintolat ja muut palvelut.
- **Koiran ruokakaupat**: Ilmoitukset tarjouksista ja myyntipaikat.
- **Eläinlääkärit ja hoitolat**: Sijainnit ja aukioloajat.

**3. Käyttötapaukset**
1. **Omistaja**:
   - Luo profiilin.
   - Lisää viestin.
   - Luo ulkoilureitin.
   - Selaa ruokapaikkoja ja kauppoja.
   - Selaa ja hakee puistoja.
   - Selaa eläinlääkäreitä.
   - Saa ilmoituksia ystävien aktiviteeteista.
2. **Tapahtuman järjestäjä**: 
   - Luo tapahtuman ja kutsuu osallistujia.
3. **Admin**:
   - Lisää puiston järjestelmään.
   - Lisää eläinlääkärin tietokantaan.
   - Hallinnoi käyttäjiä ja tapahtumia.

**4. Skaalautuvuus ja jatkokehitys**
- **Suurten käyttäjämäärien hallinta**: Pilvipohjainen infrastruktuuri, kuormantasaukset ja reaaliaikaiset päivitykset.
- **Hinnoittelumalli**:
  - Ilmainen peruskäyttö.
  - **Pronssi**: Kertamaksu tai edullinen kuukausimaksu, sis. lisäominaisuuksia.
  - **Hopea**: Laajennetut ilmoitukset ja reittianalytiikka.
  - **Kulta**: Kaikki ominaisuudet, ensisijainen asiakastuki.
- **Kieliversiot ja kansainvälinen laajentuminen**: Mahdollisuus eri kieliversioihin ja aluekohtaisiin palveluihin.
- **Tekijänoikeudet**:
  - Käyttäjien kuvat: Latausoikeudet ja sisällön moderointi.
  - Sovelluksen brändioikeudet ja tavaramerkit.
- **Asetukset**:
  - Käyttöehdot ja tietosuojakäytännöt.
  - Profiilin yksityisyys: Julkinen, yksityinen, vain kaverit.
- **Käyttäjätasot**:
  - **Peruskäyttäjä**: Voi ladata kuvia, luoda tapahtumia.
  - **Super User**: Voi hallita tapahtumia ja moderointia.
  - **Admin**: Ylläpitää palvelua, hallitsee käyttäjiä.
- **Päivitettävyys**: Säännölliset päivitykset, uudet ominaisuudet ja parannukset.

**5. Tekninen toteutus**
- **Käyttäjärajapinta**: React 
- **Taustajärjestelmä**: Node.js
- **Tietokanta**: MongoDB.
- **Sijaintipalvelut**: OpenStreetMap.

**6. Yhteenveto**
KoiraSovellus tarjoaa kattavan sovelluksen koiranomistajille, jossa yhdistyvät sosiaalinen media, tapahtumat ja koiraystävälliset palvelut. Jatkokehityksessä huomioidaan skaalautuvuus, kansainvälinen laajentuminen ja uudet ominaisuudet, kuten premium-tilaukset ja reitti-analytiikka.


EKRK RABA Front-End

Kasutus- ja paigaldusjuhend

## Sisukord

- [Sissejuhatus](#sissejuhatus)
- [Installeerimine ning käivitamine](#installeerimine-ning-käivitamine)
  - [Eelnõuded](#eelnõuded)
  - [Installeerimine ja käivitamine](#installeerimine-ja-käivitamine) 
- [Kasutamisest](#kasutamisest)
  - [Back-end liidestamine](#back-end-liidestamine)
  - [Registreerimine ja kasutaja autentimine](#registreerimine-ja-kasutaja-autentimine)
  - [Abilehe täiendamine](#abilehe-täiendamine)
- [Internatsionaliseeritavus](#internatsionaliseeritavus)
  - [Tõlked](#tõlked)
- [EL logo suuruse muutmine](#EL-logo-suuruse-muutmine)
- [RABA logo asetamine lehe päisesse](#RABA-logo-asetamine-lehe-päisesse)

## Sissejuhatus

Antud RABA kasutajaliides võimaldab teostada CQL ja FCS-QL keeles päringuid määratud korpustest ning vastavaid tulemusi kuvada ekraanil. 

## Installeerimine ning käivitamine

### Eelnõuded

Enne installeerimist tuleb vastavasse arvutisse installeerida uusim NodeJS ning yarn (https://nodejs.org/en/ ning https://yarnpkg.com/en/).

### Installeerimine ja käivitamine

Rakenduse käivitamiseks localhostis tuleb esmalt käsurealt (cmd) minna lähtekoodi hoidvasse kausta ning sisestada käsureale 'yarn install'. Seejärel laetakse alla ning installeeritakse kõik vajalikud paketid rakenduse käivitamiseks.

Järgnevalt tuleb sisestada käsklus 'yarn start', mille järel käivitatakse rakendus vaikimisi kasutatavaks määratud veebilehitsejas aadressil localhost:3000.

## Kasutamisest

Hetkel on võimalik teostada otsinguid, näha otsingurida, otsingunuppu, vahetada lihtotsingu (CQL) ning laiendatud (FCS-QL) otsingu moodi vahel, eksisteerib ka kasutaja sisselogimise lehekülg ning abilehekülg. Viimasel on hetkel kirjeldatud otsingute tegemine.

Kasutajaliides võimaldab vahetada ka keeli, vajutades vastava lipu peale (Eesti, Inglise). Võimaldatud on ka kasutajate registreerimine ja sisse logimine. Oauth 2.0 läbi väliste teenuste on hetkel testimisel aga lokaalselt on autentimine võimaldatud. Hetkeseisuga on kõik kasutajad vaikimisi tavakasutaja rollis, kes saavad ligi ka hiljem administraatorile mõeldud funktsionaalsustele (mis hetkel olemas).

### Back-end liidestamine

Ühendamaks back-end'iga, tuleb src > assets > js > constants > constants.jsx failis olevale const back_end_host juurde märkida back-end'i URL.

### Registreerimine ja kasutaja autentimine

Võimaldatud on ka kasutajate registreerimine ja sisse logimine. Oauth 2.0 läbi väliste teenustega on hetkel testimisel aga lokaalselt on autentimine võimaldatud. Hetkeseisuga on kõik kasutajad vaikimisi tavakasutaja rollis, kes saavad ligi ka hiljem administraatorile mõeldud funktsionaalsustele (mis hetkel olemas). Täiendavalt lisandub ka SAML (TAAT) autentimise võimalus.

Kasutaja lokaalseks registreerimiseks on vaja navigeerida läbi login lehekülje registreerimise leheküljele, kus tuleb täita vastavad lahtrid ning vajutada nuppu registreeri. Eduka registreerimise järgselt logitakse kasutaja ka koheselt sisse ning suunatakse agregaatori otsingu lehele. Mitte õnnestunud registreerimise kohta kuvatakse kasutajale ka vastava sisulist tagasidet koos näpunäidetega, kuidas probleemi oleks võimalik lahendada.

Kasutaja sisse logimiseks on vaja vastavalt navigeerida sisse logimise leheküljele ning täita vajalikud lahtrid. Eduka sisenemise korral suunatakse kasutaja edasi agregaatori lehele. Ebaõnnestunud autentimise korral aga kuvatakse võimalikke probleeme ning näpunäiteid probleemi lahendamiseks.

Hetkel välja logimiseks tuleb samuti minna esialgsele lehele, kust logiti sisse. Seal on nüüd võimalik klõpsata vastaval nupul, mis lõpetab sisse logitud sessiooni.

### Abilehe täiendamine

Abilehe täiendamiseks tuleb lisada vajalik tekst (pealkiri, lõik) sõnaraamatusse src > translations > dictionary.js faili helppage jaotuse alla (igas olemasolevas keeles).

Seejärel tuleb src > assets > js > pages > helppage.jsx faili lisada viide vastavale sõnaraamatu kirjele kas <h3></h3> märkide vahele pealkirja puhul või <p></p> märkide vahele tekstilõigu puhul. 

## Internatsionaliseeritavus

### Tõlked

Antud tõlked on hetkel kaasas failis src > translations > dictionary.js eesti ja inglise keele jaoks. Iga tõlgitav lause käib kaasas oma identifikaatoriga. Analoogiliselt antud faili sisule on võimalik luua ka tõlkeid näiteks saksakeelsele, venekeelsele ja nii edasi kasutajaliidestele.

src > assets > img kausta tuleb panna vastava keele lipu fail. See fail tuleb importida 'main.jsx' faili reaga (näidis Suurbritannia lipu kohta):
import GbFlag from '../img/gb-icon.png';

'main.jsx' failis olevas funktsioonis renderCollapsible tuleb lipukese ikooni kuvamiseks lisada read (näidis Suurbritannia lipu kohta):
  <a className='nav-item navbar-brand' tabIndex='-1' onClick={this.changeToEN}>
    <img className='ico' src={GbFlag} alt='ENG' />
  </a>

kus onClick={this.changeToEN} viitab keele vahetamise funktsioonile (funktsiooni tegemine on kirjas allpool), mille nimes viimased 2 tähte märgivad konkreetset keelt, antud juhul inglise keelt ('EN'),
src={GbFlag} viitab imporditud Suurbritannia lipu ikoonile, mida kuvatakse ekraanil,
alt='ENG' viitab keele lühendile.

Tuleb lisada ka keele vahetamise funktsioon vastavale uuele keelele 'main.jsx' faili. Näidis inglise keele valimise funktsioonist:
changeToEN = () => {
  this.setState({
    language: 'en'
  })
}

siin language: 'en' kahetäheline keele lühend vastab dictionary.js failis olevale vastava keele indikaatorile. Sellele vastavalt saadakse kätte vastavad tõlgitud laused.

Eesti Keeleressursside Keskuse logo on võimalik kuvada nii inglise kui eesti keelsena. Tõlke keele jaoks, kui on ka teistes keeltes logosid olemas, tuleb logo lisada src > assets > img kausta ning importida 'main.jsx' faili vastav logo, nagu on inglise keelse logo importimiseks tehtud järgnevalt:
import EnEKRKlogo from '../img/ekrk-logo-eng.png';

Millist logo konkreetse keele puhul kuvatakse tuleb määrata 'main.jsx' failis (hetkel real 23 asuvas) muutujas logoIntl:

const logoIntl = {
  ee: EeEKRKlogo,
  en: EnEKRKlogo
};

Otsitavate kihtide nimede tõlked tuleb panna dictionary.js failis queryinput > layer jaotuse alla.
Kihi märgendite tõlked tuleb panna dictionary.js failis queryinput > valueOptions jaotuse alla.
Uues keeles korpuse keele tõlge tuleb panna dictionary.js failis language jaotuse alla kujul:
keele 3-täheline lühend: 'tõlge'

Tõlked tuleks panna iga olemasoleva keele kohta.

## EL logo suuruse muutmine

Euroopa Liidu Regionaalarengu Fondi logo suurus on määratud logo kõrgusega pikslites.
Selle muutmiseks tuleb muuta src > index.css failis .footer-img-left all atribuudi 'height' väärtust.

## RABA logo asetamine lehe päisesse

Kausta src > assets > img tuleb sealse tühja valge ristküliku faili "rabalogo.png" asemele kopeerida õige RABA logo fail nimega "rabalogo.png".


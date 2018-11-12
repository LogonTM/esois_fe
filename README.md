EKRK RABA Front-End

Kasutus- ja paigaldusjuhend

## Sisukord

- [Sissejuhatus](#sissejuhatus)
- [Installeerimine ning käivitamine](#installeerimine-ning-käivitamine)
  - [Eelnõuded](#eelnõuded)
  - [Installeerimine ja käivitamine](#installeerimine-ja-käivitamine) 
- [Kasutamisest](#kasutamisest)
- [Internatsionaliseeritavus](#internatsionaliseeritavus)
  - [Tõlked](#tõlked)

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

Kasutajaliides võimaldab vahetada ka keeli, vajutades vastava lipu peale (Eesti, Inglise).

## Internatsionaliseeritavus

Internatsionaliseeritavuse jaoks on kasutatud 'react-intl' liidest, mis võimaldab vajalikku funktsionaalsust.

### Tõlked

Antud tõlked on hetkel kaasas failides 'ee.js' ja 'en.js' vastavalt siis eesti ja inglise keele jaoks. Iga tõlgitav lause käib kaasas oma identifikaatoriga. Analoogiliselt antud failidele on võimalik luua ka tõlkeid näiteks saksakeelsele, venekeelsele ja nii edasi kasutajaliidestele.

Vastava tõlke rakendamiseks on vaja lisada veel 'main.jsx' päisesse vastav lokalisatsiooni import, näiteks inglise keele jaoks on vajalik:
import locale_en from 'react-intl/locale-data/en';

Täiendavalt tuleb laiendada konstanti 

const messages = {
    'ee': messages_ee,
    'en': messages_en
};

soovitud lokaali ning tõlgetega, mida soovitakse kuvada. 

Lisaks tuleb lisada reale 26 (hetkel, võib muutuda), kus asub "addLocaleData([...locale_ee, ...locale_en])", vastav lokaalisatsiooni rida. Näiteks saksa lokalisatsiooni jaoks tuleks täiendada antud rida järgnevalt:

addLocaleData([...locale_ee, ...locale_en, ...locale_de])

Vene keele jaoks aga:

addLocaleData([...locale_ee, ...locale_en, ...locale_ru])

Samuti on vaja sisse importida uue keele '.js' fail translations folderist 'main.jsx' faili näiteks reaga:
import messages_en from "../../translations/en.js";

src > assets > img kausta tuleb panna vastava keele lipu fail. See fail tuleb importida 'main.jsx' faili reaga (näidis Suurbritannia lipu kohta):
import GbFlag from '../img/gb-icon.png';

'main.jsx' failis funktsioonis renderCollapsible (hetkel algab real 176) tuleb lipukese ikooni kuvamiseks lisada read (näidis Suurbritannia lipu kohta):
  <a className='nav-item navbar-brand' tabIndex='-1' onClick={this.changeToEN}>
    <img className='ico' src={GbFlag} alt='ENG' />
  </a>

kus onClick={this.changeToEN} viitab keele vahetamise funktsioonile (funktsiooni tegemine on kirjas allpool), mille nimes viimased 2 tähte märgivad konkreetset keelt, antud juhul inglise keelt ('EN'),
src={GbFlag} viitab imporditud Suurbritannia lipu ikoonile, mida kuvatakse ekraanil,
alt='ENG' viitab keele lühendile.

Tuleb lisada ka keele vahetamise funktsioon vastavale uuele keelele. Näidis inglise keele valimise funktsioonist:
changeToEN = () => {
  this.setState({
    language: 'en'
  })
}

siin language: 'en' kahetäheline keele lühend vastab 'const messages' olevale vastava keele indikaatorile. Sellele vastavalt saadakse kätte vastavad tõlgitud laused.

Tulenevalt raamistiku eripärast on mõned tõlked lahendatud otse koodis:
1. aggregatorpage.jsx failis tõlge väljendile kui otsitakse kõigis keeltes:
  hetkel real 31:
  	anyLanguages = {
      ee: 'igas keeles',
      en: 'Any language'
    }

2. aggregatorpage.jsx failis otsingu tekstilahtri kohahoidjad:
  hetkel real 43:
    searchPlaceholders = [
      {
        ee: 'Koer',
        en: 'Elephant'
      },
      {
        ee: "[word = 'märkus'][word = 'keskendunud']",
        en: "[word = 'annotation'][word = 'focused']"
      }
    ]

Eesti Keeleressursside Keskuse logo on võimalik kuvada nii inglise kui eesti keelsena. Tõlke keele jaoks, kui on ka teistes keeltes logosid olemas, tuleb logo lisada src > assets > img kausta ning importida 'main.jsx' faili vastav logo, nagu on inglise keelse logo importimiseks tehtud järgnevalt:
import EnEKRKlogo from '../img/ekrk-logo-eng.png';

Millist logo konkreetse keele puhul kuvatakse tuleb määrata 'main.jsx' failis (hetkel real 33 asuvas) muutujas logoIntl:
const logoIntl = {
  ee: EeEKRKlogo,
  en: EnEKRKlogo
};
export default {
    ee: {
        button: {
            add: 'Lisa',
            close: 'Sulge',
            delete: 'Kustuta',
            download: 'Allalaadimine',
            edit: 'Muuda',
            layers: 'Kasutuses kihid',
            login: 'Sisene',
            logout: 'Välju',
            register: 'Registreeri',
            save: 'Salvesta',
            update: 'Uuenda',
            upload: 'Üleslaadimine',
            view: 'Vaata',
        },
        common: {
            actions: 'Tegevused',
            anyLanguage: 'igas keeles',
            homepage: '– Koduleht',
            password: 'Salasõna',
            search: 'Otsing',
            toggleNavigation: 'Ava navigatsiooni menüü',
            username: 'Kasutajanimi',
        },
        aggregatorpage: {
            andShowUpTo: 'ja näita kuni',
            collections: 'Korpused',
            erf: 'RABA loomist on toetanud Euroopa Liidu Euroopa Regionaalarengu Fond',
            hitsPerEndpoint: 'vastet allika kohta',
            in: 'keeles',
            searchFor: 'Otsi',
            selectLanguage: 'Vali keel',
        },
        corpus: {
            delete: {
                confirm: 'Kas oled kindel, et soovid korpuse kustutada?',
                success: 'Korpus on edukalt kustutatud',
            },
            upload: {
                fail: 'Korpuse andmete üles laadimine ei õnnestunud',
                success: 'Korpuse andmed on edukalt üles laetud'
            },
            browse: 'Vali fail',
            edit: 'Muuda korpust:',
            layer: 'Kiht',
            name: 'Nimi',
            operator: 'Operaatorid',
            valueOptions: 'Kihi väärtused',
            protocol: 'Protokoll',
            synonym: 'Sünonüüm',
        },
        corpusview: {
            collapse: 'Peida',
            expand: 'Laienda',
            subcollections: 'alamkorpust',
            deselectAll: 'Kõik mitte valituks',
            selectAll: 'Kõik valituks',
            searchCorpusBox: 'Otsi korpust',
            howManyAreShownP1: 'Näitan',
            howManyAreShownP2: 'korpust',
            howManyAreShownP3: '(alam)korpusest',
            selected: {
                all: 'kõigist korpustest',
                one: 'ühest valitud korpusest',
                some: 'valitud korpusest',
            },
        },
        cql: {
            nameBtn: 'Lihtne (CQL)',
            placeholder: 'koer',
        },
        errors: {
            cannotFindRequiredCollection: 'Ei leia soovitud korpust, otsin selle asemel kõigist korpustest',
            noNetwork: 'Viga võrgu ühenduses, palun kontrolli oma interneti ühendust',
            selectCollection: 'Palun vali korpus, millest otsingut teostada',
        },
        errorlogs: {
            headers: [
                // { key: 'id', label: 'Kasutaja ID'},
                { key: 'createdAt', label: 'Aeg'},
                { key: 'errorType', label: 'Vea tüüp'},
                { key: 'errorValue', label: 'Vea väärtus'},
            ],
        },
        fcs: {
            form: 'vorm',
            nameBtn: 'Laiendatud (FCS-QL)',
            placeholder: '[word = "märkus"][word = "keskendunud"]',
            text: 'tekst',
        },
        footer: {
            ekrk: 'Eesti Keeleressursside Keskus',
            estonia: ' '
        },
        helppage: {
            adjustSearchTitle: 'Otsingukriteeriumite muutmine',
            adjustSearchParagraph1: 'FCS aggregaator võimaldab valida spetsiifilisi korpuseid vastavalt nende nimele või kasutatavale keelele ning määratleda vastete arvu korpuse kohta, mida ühel lehel näidatakse. Kasutajaliides, mis võimaldab vastavaid valikuid teha, asetseb otsinguvälja all.',
            howToSearchTitle: 'Kuidas otsida',
            howToSearchParagraph1: 'Teostamaks lihtsat sõnaotsingut (CQL) üle kõikvõimalike korpuste, tuleb sisestada otsinguväljale otsitav sõna ning vajutada otsingu nupule või vajutada klaviatuuril "Enter".',
            howToSearchParagraph2: 'Teostamaks laiendatud otsinguid, seda toetavatest korpustest, kaasates otsingusse ka annotatsioonid (FCS-QL), tuleb valida rippmenüüst FCS otsingumood ning sisestada vastav FCS otsing otsinguväljale. Seejärel vajutada otsingu nupule või vajutada klaviatuuril "Enter".',
            howToSearchParagraph3: 'Otsingu käivitumisel hakkab lehekülg täituma vastustega erinevatest korpustest.',
            howToSearchParagraph4: 'Mõne korpuse vastete lähema tutvumise jaoks tuleb vajutada vastavate tulemuste juures olevale "Vaata" nupule.',
            mainTitle: 'Abileht ja seaded',
        },
        language: {
            est: 'eesti',
            mul: 'igas',
            vot: 'vadja',
            vro: 'võru',
        },
        loginpage: {
            error: {
                incorrect: 'RABA: Teie kasutajanimi või parool on vale. Palun proovige uuesti!',
                servercatch: 'RABA: Vabandame! Midagi läks valesti. Palun proovige uuesti!', 
            },
            messageP1: 'Tere',
            messageP2: 'olete sisse logitud',
        },
        managelogs: {
            searchlogs: 'Otsilogid',
            userlogs: 'Kasutajalogi',
            errorlogs: 'Vealogi',
        },
        queryinput: {
            and: 'ja',
            layer: {
                'word': 'sõna',
                'analysis': 'analüüs',
                'cases': 'kääne',
                'dephead': 'peasõna',
                'deprel': 'süntaktiline funktsioon',
                'lemma': 'algvorm',
                'mood': 'kõneviis',
                'msd': 'morfoloogiline analüüs',
                'negation': 'kõneliik',
                'nominal': 'infinitiivsed vormid',
                'number': 'arv',
                'person': 'isik',
                'PHONEME': 'häälik',
                'pos': 'sõnaliik',
                'ref': 'järjekorranumber',
                'SYLLABLE': 'silp',
                'tense': 'aeg',
                'voice': 'tegumood',
            },
            layerOperators: {
                'IS': 'on',
                'IS_NOT': 'ei ole',
                'STARTS_WITH': 'algab',
                'CONTAINS': 'sisaldab',
                'ENDS_WITH': 'lõppeb',
                'REGEX': 'regulaaravaldis',
                'NOT_REGEX': 'ei ole regulaaravaldis',
            },
            or: 'või',
            repeatMenu: {
                repeat: 'korda',
                times: 'korda',
                to: 'kuni',
            },
            sentenceEnd: 'Lause lõpp',
            sentenceStart: 'Lause algus',
            tooltips: {
                analysis: 'Analüüs on põnev',
                word: 'Pane mingi sõna',
            },
            valueOptions: {
                // cases
                'Abe': 'abessiiv (ilmaütlev)',
                'Abl': 'ablatiiv (alaltütlev)',
                'Ade': 'adessiiv (alalütlev)',
                'All': 'allatiiv (alaleütlev)',
                'Com': 'komitatiiv (kaasaütlev)',
                'Ela': 'elatiiv (seestütlev)',
                'Ess': 'essiiv (olev)',
                'Gen': 'genitiiv (omastav)',
                'Ill': 'illatiiv (sisseütlev)',
                'Ine': 'inessiiv (seesütlev)',
                'Nom': 'nominatiiv (nimetav)',
                'Par': 'partitiiv (osastav)',
                'Trm': 'terminatiiv (rajav)',
                'Tra': 'translatiiv (saav)',

                // mood
                'Quot': 'kaudne',
                'Ind': 'kindel',
                'Imprt': 'käskiv',
                'Cond': 'tingiv',

                // negation
                'Neg': 'eitav kõne',
                'Aff': 'jaatav kõne',

                // nominal
                'Ger': 'des-vorm',
                'Inf': 'da-tegevusnimi',
                'Prc': 'kesksõna',
                'Sup': 'ma-tegevusnimi',

                // number
                'Sg': 'ainsus',
                'Pl': 'mitmus',

                // part of speech
                'ADJ': 'omadussõna',
                'ADP': 'kaassõna',
                'ADV': 'määrsõna',
                'CONJ': 'sidesõna',
                'INTJ': 'hüüdsõna',
                'NOUN': 'nimisõna',
                'PRON': 'asesõna',
                'PROPN': 'pärisnimi',
                'PUNCT': 'kirjavahemärk',
                'SYM': 'sümbol',
                'VERB': 'verb',
                'X': 'muu',
                '_B_': 'lausepartikkel',
                '_G_': 'genitiivatribuut',
                '_N_': 'põhiarvsõna',
                '_O_': 'järgarvsõna',
                '_Q_': 'tundmatu',
                '_X_': 'verbi juurde kuuluv sõna',
                '_Y_': 'lühend',

                // tense
                'Prt': 'minevik',
                'Prs': 'olevik',

                // voice
                'Impers': 'umbisikuline',
                'Pers': 'isikuline',
            },
        },
        register: {
            name: 'Teie täispikk nimi',
            nameerror: {
                shortP1: 'Nimi on liiga lühike (Vähemalt',
                shortP2: 'tähemärki on nõutud.)',
                longP1: 'Nimi on liiga pikk (Maksimaalselt',
                longP2: 'tähemärki on lubatud.)',
            },
            username: 'Teie kasutajanimi',
            usernameerror: {
                notavailable: 'See kasutajanimi on juba kasutusel',
                shortP1: 'Kasutajanimi on liiga lühike (Minimaalselt',
                shortP2: 'tähemärki on nõutud.)',
                longP1: 'Kasutajanimi on liiga pikk (Maksimaalselt',
                longP2: 'tähemärki on lubatud.)',
            },
            email: 'Teie e-mail',
            emailerror: {
                notavailable: 'See e-mail on juba kasutuses',
                notvalid: 'E-mail pole õige',
                longP1: 'Sisestatud e-mail on liiga pikk (Maksimaalselt',
                longP2: 'tähemärki lubatud)',
            },
            password: 'Teie parool',
            passworderror: {
                shortP1: 'Salasõna on liiga lühike (Vähemalt',
                shortP2: 'tähemärki on nõutud.)',
                longP1: 'Salasõna on liiga pikk (Maksimaalselt',
                longP2: 'tähemärki on lubatud)',
                nomatch: 'Salasõnad ei ole ühesugused.',
            },
            passwordvalidation: 'Teie parooli kinnitus',
        },
        resultfunctions: {
            causedBy: 'Põhjustaja:',
            display: {
                adv: 'Näita laiendatud andmete vaadet (ADV)',
                kwic: 'Näita KWIC',
            },
            download: {
                csv: 'CSV formaadis fail',
                json: 'JSON formaadis fail',
                xml: 'XML formaadis fail',
            },
            exception: 'Erand:'
        },
        results: {
        	collectionsFound: 'vastavat korpust leitud',
            progressMessageP1: 'vastavat korpust leitud',
            progressMessageP2: 'otsitud korpusest',
            loading: 'Laen tulemusi, palun oota...',
        },
        searchlogs: {
            headers: [
                // { key: 'id', label: 'Kasutaja ID'},
                { key: 'createdAt', label: 'Aeg'},
                { key: 'username', label: 'Kasutaja'},
                { key: 'query', label: 'Otsing'},
                // { key: 'enabled', label: 'Kasutajakonto olek'},
                { key: 'corporas', label: 'Otsitud korpustest'},
            ],
        },
        user: {
            edit: {
                accountstate: 'Kasutajakonto olek',
                email: 'e-mail',
                name: 'Nimi',
                username: 'Kasutajanimi',
                success: 'Kasutaja andmed on edukalt uuendatud',
            },
            headers: [
                // { key: 'id', label: 'Kasutaja ID'},
                { key: 'name', label: 'Nimi'},
                { key: 'username', label: 'Kasutajanimi'},
                { key: 'email', label: 'e-mail'},
                // { key: 'enabled', label: 'Kasutajakonto olek'},
                { key: 'userRole', label: 'Kasutaja roll(id)'},
            ],
            manage: {
                edit: 'Kasutaja andmete muutmine',
                    enabled: {
                        true: 'aktiivne',
                        false: 'suletud',
                    },
                role: {
                    ROLE_ADMIN: 'Admin ',
                    ROLE_USER: 'Tavakasutaja ',
                },
            },
        },
        userlogs: {
            headers: [
                // { key: 'id', label: 'Kasutaja ID'},
                { key: 'createdAt', label: 'Aeg'},
                { key: 'username', label: 'Kasutaja'},
                { key: 'consent', label: 'Andis nõusoleku'},
                { key: 'initialregister', label: 'Algne registreering'},
                { key: 'logedin', label: 'Logis sisse'},
            ],
            consent: {
                true: 'Jah',
                false: 'Ei',
            },
            initialregister: {
                true: 'Jah',
                false: 'Ei',
            },
            logedin: {
                true: 'Jah',
                false: 'Ei',
            },
        },
        zoomedresult: {
            moreResults: 'Rohkem tulemusi',
            noMoreResults: 'Sellele päringule pole rohkem tulemusi',
            pleaseWait: 'Võtan tulemusi vastu, palun oota...',
        },
    },
    en: {
        button: {
            add: 'Add',
            close: 'Close',
            delete: 'Delete',
            download: 'Download',
            edit: 'Edit',
            layers: 'Layers in use',
            login: 'Login',
            logout: 'Log out',
            register: 'Register',
            save: 'Save',
            update: 'Update',
            upload: 'Upload file',
            view: 'View',
        },
        common: {
            actions: 'Actions',
            anyLanguage: 'any language',
            homepage: '– Homepage',
            password: 'Password',
            search: 'Search',
            toggleNavigation: 'Toggle navigation',
            username: 'Username',
        },
        aggregatorpage: {
            andShowUpTo: 'and show up to',
            collections: 'Collections',
            erf: 'The creation of RABA has been supported by the European Union European Regional Development Fund',
            hitsPerEndpoint: 'hits per endpoint',
            in: 'in',
            searchFor: 'Search for',
            selectLanguage: 'Select Language',
        },
        corpus: {
            delete: {
                confirm: 'Are you sure you want to delete this corpus?',
                success: 'Corpus has been deleted successfully',
            },
            upload: {
                fail: "Uploading corpus' data has failed",
                success: "Corpus' data upload was successful"
            },
            browse: 'Choose file',
            edit: 'Edit corpus:',
            layer: 'Layer',
            name: 'Name',
            operator: 'Operators',
            valueOptions: 'Value options',
            protocol: 'Protocol',
            synonym: 'Synonym',
        },
        corpusview: {
            collapse: 'Collapse',
            expand: 'Expand',
            subcollections: 'subcollections',
            deselectAll: 'Deselect all',
            selectAll: 'Select all',
            searchCorpusBox: 'Search for collection',
            howManyAreShownP1: 'Showing',
            howManyAreShownP2: 'out of',
            howManyAreShownP3: '(sub)collections',
            selected: {
                all: 'All available collections',
                one: '1 selected collection',
                some: 'selected collections',
            }
        },
        cql: {
            nameBtn: 'Simple (CQL)',
            placeholder: 'Elephant',
        },
        errors: {
            cannotFindRequiredCollection: 'Cannot find the required collection, will search all collections instead',
            noNetwork: 'Network error, please check your internet connection',
            selectCollection: 'Please select a collection to search into',
        },
        errorlogs: {
            headers: [
                // { key: 'id', label: 'Kasutaja ID'},
                { key: 'createdAt', label: 'Created at'},
                { key: 'errorType', label: 'Error type'},
                { key: 'errorValue', label: 'Error value'},
            ],
        },
        fcs: {
            form: 'form',
            nameBtn: 'Advanced (FCS-QL)',
            placeholder: '[word = "annotation"][word = "focused"]',
            text: 'text',
        },
        footer: {
            ekrk: 'Center of Estonian Language Resources',
            estonia: ', Estonia ',
        },
        helppage: {
            adjustSearchTitle: 'Adjusting search criteria',
            adjustSearchParagraph1: 'The FCS Aggregator makes possible to select specific corpora based on their name or language and to specify the number of search results (hits) per corpus per page. The user interface controls that allows to change these options are located right below the search fiels on the main page. The current options are to filter resources based on their language, to select specific resources, and to set the maximum number of hits.',
            howToSearchTitle: 'Performing search in Federated Content Search corpora',
            howToSearchParagraph1: "To perform a simple keyword search in all corpora, go to the search field at the top of the page, enter your query, and click the 'search' button or press the 'Enter' key.",
            howToSearchParagraph2: "To perform an advanced search on multiple annotation layers in corpora that support this, switch to Multi-layer Federated Content Search (FCS) in the dropdown list, enter a FCS query in the search field at the top of the page, and click the 'search' button or press the 'Enter' key.",
            howToSearchParagraph3: 'When the search starts, the page will start filling in with the corpora responses.',
            howToSearchParagraph4: "If you are particularly interested in the results returned by a corpus, you have the option to focus only on the results of that corpus, by clicking on the 'View' button.",
            mainTitle: 'Help',
        },
        language: {
            est: 'Estonian',
            mul: 'any language',
            vot: 'Votic',
            vro: 'Võro',
        },
        loginpage: {
            error: {
                incorrect: 'RABA: Your Username or Password is incorrect. Please try again!',
                servercatch: 'RABA: Sorry! Something went wrong. Please try again!',
            },
            messageP1: 'Hello',
            messageP2: 'you have logged in',
        },
        managelogs: {
            searchlogs: 'Search logs',  
            userlogs: 'User logs',
            errorlogs: 'Error logs',
        },
        queryinput: {
            and: 'and',
            layer: {
                'word': 'word',
                'analysis': 'analysis',
                'cases': 'case',
                'dephead': 'dephead',
                'deprel': 'syntactic function',
                'lemma': 'baseform',
                'mood': 'mood',
                'msd': 'msd',
                'negation': 'negation',
                'nominal': 'infinite forms',
                'number': 'number',
                'person': 'person',
                'PHONEME': 'phoneme',
                'pos': 'part-of-speech',
                'ref': 'ref',
                'SYLLABLE': 'syllable',
                'tense': 'tense',
                'voice': 'voice',
            },
            layerOperators: {
                'IS': 'is',
                'IS_NOT': 'is not',
                'STARTS_WITH': 'starts with',
                'CONTAINS': 'contains',
                'ENDS_WITH': 'ends with',
                'REGEX': 'regex',
                'NOT_REGEX': 'not regex',
            },
            or: 'or',
            repeatMenu: {
                repeat: 'repeat',
                times: 'times',
                to: 'to',
            },
            sentenceEnd: 'Sentence end',
            sentenceStart: 'Sentence start',
            tooltips: {
                analysis: 'Analysis is interesting',
                word: 'Put some word',
            },
            valueOptions: {
                // cases
                'Abe': 'abessive',
                'Abl': 'ablative',
                'Ade': 'adessive',
                'All': 'allative',
                'Com': 'comitative',
                'Ela': 'elative',
                'Ess': 'essive',
                'Gen': 'genitive',
                'Ill': 'illative',
                'Ine': 'inessive',
                'Nom': 'nominative',
                'Par': 'partitive',
                'Trm': 'terminative',
                'Tra': 'translative',

                // mood
                'Quot': 'quotative',
                'Ind': 'indicative',
                'Imprt': 'imperative/jussive',
                'Cond': 'conditional',

                // negation
                'Neg': 'negative',
                'Aff': 'affirmative',

                // nominal
                'Ger': 'gerund',
                'Inf': 'infinitive',
                'Prc': 'participle',
                'Sup': 'supine',

                // number
                'Sg': 'singular',
                'Pl': 'plural',

                // part of speech
                'ADJ': 'adjective',
                'ADP': 'adposition',
                'ADV': 'adverb',
                'CONJ': 'conjunction',
                'INTJ': 'interjection',
                'NOUN': 'noun',
                'PRON': 'pronoun',
                'PROPN': 'proper name',
                'PUNCT': 'punctuation',
                'SYM': 'symbol',
                'VERB': 'verb',
                'X': 'other',
                '_B_': 'sentence particle',
                '_G_': 'genitive attribute',
                '_N_': 'cardinal numeral',
                '_O_': 'ordinal numeral',
                '_Q_': 'unknown',
                '_X_': 'particle',
                '_Y_': 'abbreviation',

                // tense
                'Prt': 'past',
                'Prs': 'present',

                // voice
                'Impers': 'impersonal',
                'Pers': 'personal',
            },
        },
        register: {
            name: 'Your full name',
            nameerror: {
                shortP1: 'Name is too short (Minimum',
                shortP2: 'characters needed.)',
                longP1: 'Name is too long (Maximum',
                longP2: 'characters allowed.)',
            },
            username: 'Your username',
            usernameerror: {
                notavailable: 'This username is already taken',
                shortP1: 'Username is too short (Minimum',
                shortP2: 'characters needed.)',
                longP1: 'Username is too long (Maximum',
                longP2: 'characters allowed.)',
            },
            email: 'Your e-mail',
            emailerror: {
                notavailable: 'This Email is already registered',
                notvalid: 'Email not valid',
                longP1: 'Email is too long (Maximum ',
                longP2: ' characters allowed)',
            },
            password: 'Your password',
            passworderror: {
                shortP1: 'Password is too short (Minimum ',
                shortP2: ' characters needed.)',
                longP1: 'Password is too long (Maximum ',
                longP2: ' characters needed.)',
                nomatch: 'Password do not match.',
            },
            passwordvalidation: 'Your password confirmation',
        },
        resultfunctions: {
            causedBy: 'Caused by:',
            display: {
                adv: 'Display as AdvancedDataView (ADV)',
                kwic: 'Display as Key Word In Context',
            },
            download: {
                csv: 'As CSV file',
                json: 'As JSON file',
                xml: 'As XML file',
            },
            exception: 'Exception:',
        },
        results: {
            collectionsFound: 'matching collections found',
            progressMessageP1: 'matching collections found in',
            progressMessageP2: 'searched collections',
            loading: 'Loading results, please wait...',
        },
        searchlogs: {
            headers: [
                // { key: 'id', label: 'Kasutaja ID'},
                { key: 'createdAt', label: 'Created at'},
                { key: 'username', label: 'User'},
                { key: 'query', label: 'Query'},
                { key: 'corporas', label: 'Searched from corpora(s)'},
            ],
        },
        user: {
            edit: {
                accountstate: 'Useraccount state',
                email: 'e-mail',
                name: 'Name',
                username: 'Username',
                success: 'User is updated successfully',
            },
            headers: [
                // { key: 'id', label: 'User ID'},
                { key: 'name', label: 'Name'},
                { key: 'username', label: 'Username'},
                { key: 'email', label: 'e-mail'},
                // { key: 'enabled', label: 'Useraccount state'},
                { key: 'userRole', label: 'User role(s)'},
            ],
            manage: {
                edit: 'Edit user data',
                enabled: {
                    true: 'Active',
                    false: 'Disabled',
                },
                role: {
                    ROLE_ADMIN: 'Admin ',
                    ROLE_USER: 'Regular ',
                },
            },
        },
        userlogs: {
            headers: [
                // { key: 'id', label: 'Kasutaja ID'},
                { key: 'createdAt', label: 'Created at'},
                { key: 'username', label: 'User'},
                { key: 'consent', label: 'Consent'},
                { key: 'initialregister', label: 'Intial registration'},
                { key: 'logedin', label: 'Loged in'},
            ],
            consent: {
                true: 'Yes',
                false: 'No',
            },
            initialregister: {
                true: 'Yes',
                false: 'No',
            },
            logedin: {
                true: 'Yes',
                false: 'No',
            },
        },
        zoomedresult: {
            moreResults: 'More Results',
            noMoreResults: 'No other results available for this query',
            pleaseWait: 'Retrieving results, please wait...',
        }
    }
}
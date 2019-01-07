export default {
    ee: {
        button: {
            add: 'Lisa',
            close: 'Sulge',
            delete: 'Kustuta',
            download: 'Allalaadimine',
            edit: 'Muuda',
            login: 'Sisene',
            logout: 'Välju',
            register: 'Registreeri',
            save: 'Salvesta',
            update: 'Uuenda',
            view: 'Vaata'
        },
        common: {
            actions: 'Tegevused',
            anyLanguage: 'igas keeles',
            homepage: '– Koduleht',
            in: ' ',
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
            searchFor: 'Otsi',
            selectLanguage: 'Vali keel',
        },
        center: {
            add: {
                checkData: 'Palun kontrolli sisestatud andmete õigsust',
                enterId: 'Sisesta korpuse ID',
                success: 'Uus korpus on edukalt lisatud'
            },
            common: {
                id: 'Korpuse ID',
                enterLink: 'Sisesta korpuse URL',
                enterName: 'Sisesta korpuse nimi',
                name: 'Korpuse nimi'
            },
            delete: {
                confirm: 'Kas oled kindel, et soovid korpuse kustutada?',
                success: 'Korpus on edukalt kustutatud'
            },
            edit: {
                success: 'Korpuse andmed on edukalt uuendatud'
            },
            headers: [
                { key: 'id', label: 'Korpuse ID'},
                { key: 'centerName', label: 'Korpuse nimi'},
                { key: 'link', label: 'URL'}
            ],
            manage: {
                add: 'Lisa uus korpus',
                edit: 'Korpuse andmete muutmine'
            }
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
                some: 'valitud korpusest'
            }
        },
        cql: {
            name: 'tekstikihi kontekstuaalses päringukeeles (CQL)',
            nameBtn: 'Lihtne (CQL)',
            placeholder: 'koer',
            searchLabel: 'Tekstikihi CQL päring'
        },
        errors: {
            cannotFindRequiredCollection: 'Ei leia soovitud korpust, otsin selle asemel kõigist korpustest',
            noNetwork: 'Viga võrgu ühenduses, palun kontrolli oma interneti ühendust',
            selectCollection: 'Palun vali korpus, millest otsingut teostada'
        },
        fcs: {
            name: 'mitmekihilise ühendatud sisuotsingu päringukeeles (FCS-QL)',
            nameBtn: 'Edasijõudnuile (FCS-QL)',
            placeholder: '[word = "märkus"][word = "keskendunud"]',
            searchLabel: 'Mitmekihiline FCS päring'
        },
        fcsform: {
            nameBtn: 'Laiendatud (FCS-QL)'
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
            mainTitle: 'Abileht ja seaded'
        },
        languageselector: {
            radioByGuess: 'Filtreeri tulemusi kasutades keele tuvastajat',
            radioByMeta: 'Kasuta korpuses täpsustatud keelt tulemuste filtreerimiseks',
            radioByMetaAndGuess: 'Esmalt kasuta filtreerimiseks korpuses täpsustatud keelt ja seejärel kasuta ka keele tuvastajat'        
        },
        loginpage: {
            error: {
                incorrect: 'RABA: Teie kasutajanimi või parool on vale. Palun proovige uuesti!',
                servercatch: 'RABA: Vabandame! Midagi läks valesti. Palun proovige uuesti!'    
            },
            messageP1: 'Tere',
            messageP2: 'olete sisse logitud',
        },
        queryinput: {
            and: 'ja',
            fcsQueryFromButton: 'Otsinguvormi vaatele',
            fcsTextFieldButton: 'Tekstivälja vaatele',
            layerCategories: [
                {cat: 'word', label: 'Sõna', layers: ['word']},
                {cat: 'wordAttribute', label: 'Sõna atribuut', layers: ['pos', 'lemma', 'orth', 'norm', 'phonetic', 'text']},
                {cat: 'textAttribute', label: 'Teksti atribuut', layers: ['_.text_language']},
            ],
            layers: {
                'word': {
                    label: 'sõna',
                    argOpts: 'wordOptions',
                },
                'pos': {
                    label: 'sõnaliik',
                    argOpts: 'setOptions',
                    valueOptions: [
                        {value: "ADJ", label: "Omadussõna"},
                        {value: "ADV", label: "Määrsõna"},
                        {value: "INTJ", label: "Hüüdsõna"},
                        {value: "NOUN", label: "Nimisõna"},
                        {value: "PROPN", label: "Pärisnimi"},
                        {value: "VERB", label: "Tegusõna"},
                        {value: "ADP", label: "Kaassõna"},
                        {value: "AUX", label: "Auxiliary"},
                        {value: "CCONJ", label: "Coordinating conjunction"},
                        {value: "DET", label: "Determiner"},
                        {value: "NUM", label: "Arvsõna"},
                        {value: "PART", label: "Particle"},
                        {value: "PRON", label: "Asesõna"},
                        {value: "SCONJ", label: "Subordinating conjunction"},
                        {value: "PUNCT", label: "Kirjavahemärk"},
                        {value: "SYM", label: "Sümbol"},
                        {value: "X", label: "Muu"},
                    ],
                },
                'lemma': {
                    label: 'lemma',
                    argOpts: 'wordOptions',
                },
                'orth': {
                    label: 'orthographic transcription',
                    argOpts: 'wordOptions',
                },
                'norm': {
                    label: 'orthographic normalization',
                    argOpts: 'wordOptions',
                },
                'phonetic': {
                    label: 'phonetic transcription SAMPA',
                    argOpts: 'wordOptions',
                },
                'text': {
                    label: 'Layer only for Basic Search',
                    argOpts: 'wordOptions',
                },
                '_.text_language': {
                    label: 'keel',
                    argOpts: 'wordOptions',
                }
            },
            or: 'või',
            repeatMenu: {
                repeat: 'korda',
                times: 'korda',
                to: 'kuni'
            },
            sentenceEnd: 'Lause lõpp',
            sentenceStart: 'Lause algus',
            setOptions: [
                {value: "is", label: "on"},
                {value: "is_not", label: "ei ole"},
            ],
            wordOptions: [
                {value: 'is', label: 'on'},
                {value: 'is_not', label: 'ei ole'},
                {value: 'contains', label: 'sisaldab'},
                {value: 'starts_with', label: 'algab'},
                {value: 'ends_with', label: 'lõppeb'},
                {value: 'regex', label: 'regulaaravaldis'},
                {value: 'not_regex', label: 'ei ole regulaaravaldis'},
            ]
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
                longP2: 'tähemärki lubatud)'
            },
            password: 'Teie parool',
            passworderror: {
                shortP1: 'Salasõna on liiga lühike (Vähemalt',
                shortP2: 'tähemärki on nõutud.)',
                longP1: 'Salasõna on liiga pikk (Maksimaalselt',
                longP2: 'tähemärki on lubatud)',
                nomatch: 'Salasõnad ei ole ühesugused.'
            },
            passwordvalidation: 'Teie parooli kinnitus'
        },
        resultfunctions: {
            causedBy: 'Põhjustaja:',
            display: {
                adv: 'Näita laiendatud andmete vaadet (ADV)',
                kwic: 'Näita KWIC'
            },
            download: {
                csv: 'CSV formaadis fail',
                json: 'JSON formaadis fail',
                xml: 'XML formaadis fail'
            },
            exception: 'Erand:'
        },
        results: {
            howManyMatchingCollectionsFound: 'vastavat korpust leitud',
            progressMessageP1: 'vastavat korpust leitud',
            progressMessageP2: 'otsitud korpusest',
        },
        user: {
            edit: {
                accountstate: 'Kasutajakonto olek',
                email: 'e-mail',
                name: 'Nimi',
                username: 'Kasutajanimi',
                success: 'Kasutaja andmed on edukalt uuendatud'
            },
            headers: [
/*                 { key: 'id', label: 'Kasutaja ID'}, */
                { key: 'name', label: 'Nimi'},
                { key: 'username', label: 'Kasutajanimi'},
                { key: 'email', label: 'e-mail'},
                { key: 'enabled', label: 'Kasutajakonto olek'}
            ],
            manage: {
                edit: 'Kasutaja andmete muutmine',
                enabled: {
                    true: 'aktiivne',
                    false: 'suletud'
                }
            }
        },
        zoomedresult: {
            moreResults: 'Rohkem tulemusi',
            noMoreResults: 'Sellele päringule pole rohkem tulemusi',
            pleaseWait: 'Võtan tulemusi vastu, palun oota...'
        }
    },
    en: {
        button: {
            add: 'Add',
            close: 'Close',
            delete: 'Delete',
            download: 'Download',
            edit: 'Edit',
            login: 'Login',
            logout: 'Log out',
            register: 'Register',
            save: 'Save',
            update: 'Update',
            view: 'View'
        },
        common: {
            actions: 'Actions',
            anyLanguage: 'Any Language',
            homepage: '– Homepage',
            in: 'in',
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
            searchFor: 'Search for',
            selectLanguage: 'Select Language',
        },
        center: {
            add: {
                checkData: 'Please check that the data you inserted is correct',
                enterId: "Enter corpus' ID",
                success: 'New corpus has been added successfully'
            },
            common: {
                id: "Corpus' ID",
                enterLink: "Enter corpus' URL",
                enterName: "Enter corpus' name",
                name: "Corpus' name"
            },
            delete: {
                confirm: 'Are you sure you want to delete this corpus?',
                success: 'Corpus has been deleted successfully',
            },
            edit: {
                success: 'Corpus is updated successfully'
            },
            headers: [
                { key: 'id', label: "Corpus' ID"},
                { key: 'centerName', label: "Corpus' name"},
                { key: 'link', label: 'URL' }
            ],
            manage: {
                add: 'Add new corpus',
                edit: 'Edit corpus data'
            }
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
                some: 'selected collections'
            }
        },
        cql: {
            name: 'Text layer Contextual Query Language (CQL)',
            nameBtn: 'Simple (CQL)',
            placeholder: 'Elephant',
            searchLabel: 'Text layer CQL query'
        },
        errors: {
            cannotFindRequiredCollection: 'Cannot find the required collection, will search all collections instead',
            noNetwork: 'Network error, please check your internet connection',
            selectCollection: 'Please select a collection to search into'
        },
        fcs: {
            name: 'Multi-layer Federated Content Search Query Language (FCS-QL)',
            nameBtn: 'Advanced (FCS-QL)',
            placeholder: '[word = "annotation"][word = "focused"]',
            searchLabel: 'Multi-layer FCS query'
        },
        fcsform: {
            nameBtn: 'Extended (FCS-QL)'
        },
        footer: {
            ekrk: 'Center of Estonian Language Resources',
            estonia: ', Estonia '        
        },
        helppage: {
            adjustSearchTitle: 'Adjusting search criteria',
            adjustSearchParagraph1: 'The FCS Aggregator makes possible to select specific corpora based on their name or language and to specify the number of search results (hits) per corpus per page. The user interface controls that allows to change these options are located right below the search fiels on the main page. The current options are to filter resources based on their language, to select specific resources, and to set the maximum number of hits.',
            howToSearchTitle: 'Performing search in Federated Content Search corpora',
            howToSearchParagraph1: "To perform a simple keyword search in all corpora, go to the search field at the top of the page, enter your query, and click the 'search' button or press the 'Enter' key.",
            howToSearchParagraph2: "To perform an advanced search on multiple annotation layers in corpora that support this, switch to Multi-layer Federated Content Search (FCS) in the dropdown list, enter a FCS query in the search field at the top of the page, and click the 'search' button or press the 'Enter' key.",
            howToSearchParagraph3: 'When the search starts, the page will start filling in with the corpora responses.',
            howToSearchParagraph4: "If you are particularly interested in the results returned by a corpus, you have the option to focus only on the results of that corpus, by clicking on the 'View' button.",
            mainTitle: 'Help'
        },
        languageselector: {
            radioByGuess: 'Filter results by using a language detector',
            radioByMeta: 'Use the collections\' specified language to filter results',
            radioByMetaAndGuess: 'First use the collections specified language then also use a language detector'        
        },
        loginpage: {
            error: {
                incorrect: 'RABA: Your Username or Password is incorrect. Please try again!',
                servercatch: 'RABA: Sorry! Something went wrong. Please try again!'
            },
            messageP1: 'Hello',
            messageP2: 'you have logged in',
        },
        queryinput: {
            and: 'and',
            fcsQueryFromButton: 'To Query Form View',
            fcsTextFieldButton: 'To Text Field View',
            layerCategories: [
                {cat: 'word', label: 'Word', layers: ['word']},
                {cat: 'wordAttribute', label: 'Word attribute', layers: ['pos', 'lemma', 'orth', 'norm', 'phonetic', 'text']},
                {cat: 'textAttribute', label: 'Text attribute', layers: ['_.text_language']},
            ],
            layers: {
                'word': {
                    label: 'word',
                    argOpts: 'wordOptions',
                },
                'pos': {
                    label: 'part-of-speech UD v2.0 tagset',
                    argOpts: 'setOptions',
                    valueOptions: [
                        {value: "ADJ", label: "Adjective"},
                        {value: "ADV", label: "Adverb"},
                        {value: "INTJ", label: "Interjection"},
                        {value: "NOUN", label: "Noun"},
                        {value: "PROPN", label: "Proper noun"},
                        {value: "VERB", label: "Verb"},
                        {value: "ADP", label: "Adposition"},
                        {value: "AUX", label: "Auxiliary"},
                        {value: "CCONJ", label: "Coordinating conjunction"},
                        {value: "DET", label: "Determiner"},
                        {value: "NUM", label: "Numeral"},
                        {value: "PART", label: "Particle"},
                        {value: "PRON", label: "Pronoun"},
                        {value: "SCONJ", label: "Subordinating conjunction"},
                        {value: "PUNCT", label: "Punctuation"},
                        {value: "SYM", label: "Symbol"},
                        {value: "X", label: "Other"},
                    ],
                },
                'lemma': {
                    label: 'lemmatization of tokens',
                    argOpts: 'wordOptions',
                },
                'orth': {
                    label: 'orthographic transcription',
                    argOpts: 'wordOptions',
                },
                'norm': {
                    label: 'orthographic normalization',
                    argOpts: 'wordOptions',
                },
                'phonetic': {
                    label: 'phonetic transcription SAMPA',
                    argOpts: 'wordOptions',
                },
                'text': {
                    label: 'Layer only for Basic Search',
                    argOpts: 'wordOptions',
                },
                '_.text_language': {
                    label: 'language',
                    argOpts: 'wordOptions',
                },
            },
            or: 'or',
            repeatMenu: {
                repeat: 'repeat',
                times: 'times',
                to: 'to'
            },
            sentenceEnd: 'Sentence end',
            sentenceStart: 'Sentence start',
            setOptions: [
                {value: "is", label: "is"},
                {value: "is_not", label: "is not"},
            ],
            wordOptions: [
                {value: 'is', label: 'is'},
                {value: 'is_not', label: 'is not'},
                {value: 'contains', label: 'contains'},
                {value: 'starts_with', label: 'starts with'},
                {value: 'ends_with', label: 'ends with'},
                {value: 'regex', label: 'regex'},
                {value: 'not_regex', label: 'not regex'},
            ]
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
                longP2: ' characters allowed)'
            },
            password: 'Your password',
            passworderror: {
                shortP1: 'Password is too short (Minimum ',
                shortP2: ' characters needed.)',
                longP1: 'Password is too long (Maximum ',
                longP2: ' characters needed.)',
                nomatch: 'Password do not match.'
            },
            passwordvalidation: 'Your password confirmation'
        },
        resultfunctions: {
            causedBy: 'Caused by:',
            display: {
                adv: 'Display as AdvancedDataView (ADV)',
                kwic: 'Display as Key Word In Context'
            },
            download: {
                csv: 'As CSV file',
                json: 'As JSON file',
                xml: 'As XML file'
            },
            exception: 'Exception:'
        },
        results: {
            collectionsFound: 'matching collections found',
            progressMessageP1: 'matching collections found in',
            progressMessageP2: 'searched collections',
        },
        user: {
            edit: {
                accountstate: 'Useraccount state',
                email: 'e-mail',
                name: 'Name',
                username: 'Username',
                success: 'User is updated successfully'
            },
            headers: [
/*                 { key: 'id', label: 'User ID'}, */
                { key: 'name', label: 'Name'},
                { key: 'username', label: 'Username'},
                { key: 'email', label: 'e-mail'},
                { key: 'enabled', label: 'Useraccount state'}
            ],
            manage: {
                edit: 'Edit user data',
                enabled: {
                    true: 'Active',
                    false: 'Disabled'
                }
            }
        },
        zoomedresult: {
            moreResults: 'More Results',
            noMoreResults: 'No other results available for this query',
            pleaseWait: 'Retrieving results, please wait...'
        }
    }
}
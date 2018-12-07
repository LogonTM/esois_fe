export default {
    ee: {
        common: {
            actions: 'Tegevused',
            add: 'Lisa',
            anyLanguage: 'igas keeles',
            closeButton: 'Sulge',
            corpusId: 'Korpuse ID',
            corpusName: 'Korpuse nimi',
            delete: 'Kustuta',
            edit: 'Muuda',
            enterCorpusName: 'Sisesta korpuse nimi',
            enterCorpusLink: 'Sisesta korpuse URL',
            homepage: '– Koduleht',
            in: ' ',
            password: 'Salasõna',
            save: 'Salvesta',
            search: 'Otsing',
            toggleNavigation: 'Ava navigatsiooni menüü',
            update: 'Uuenda',
            username: 'Kasutajanimi',
        },
        addcenter: {
            enterCorpusId: 'Sisesta korpuse ID',
            newCorpusAddedSuccess: 'Uus korpus on edukalt lisatud',
            pleaseCheckData: 'Palun kontrolli sisestatud andmete õigsust',
            thisIdExists: 'Sellise ID-ga korpus on juba olemas'
        },
        aggregatorpage: {
            andShowUpTo: 'ja näita kuni',
            collections: 'Korpused',
            erf: 'RABA loomist on toetanud Euroopa Liidu Euroopa Regionaalarengu Fond',
            hitsPerEndpoint: 'vastet allika kohta',
            searchFor: 'Otsi',
            selectLanguage: 'Vali keel',
        },
        corpusview: {
            allCollectionsSelected: 'kõigist korpustest',
            collapse: 'Peida',
            deselectAll: 'Kõik mitte valituks',
            expand: 'Laienda',
            howManyCollectionsAreShownP1: 'Näitan',
            howManyCollectionsAreShownP2: 'korpust',
            howManyCollectionsAreShownP3: '(alam)korpusest',
            searchCorpusBox: 'Otsi korpust',
            selectAll: 'Kõik valituks',
            someCollectionsSelected: 'valitud korpusest',
            subcollections: 'alamkorpust',
            oneCollectionSelected: 'ühest valitud korpusest'
        },
        cql: {
            name: 'tekstikihi kontekstuaalses päringukeeles (CQL)',
            placeholder: 'koer',
            searchLabel: 'Tekstikihi CQL päring'
        },
        editcenter: {
            corpusIsUpdated: 'Korpuse andmed on edukalt uuendatud'
        },
        edituser: {
            accountstate: 'Kasutajakonto olek',
            email: 'e-mail',
            enterName: 'Sisesta nimi',
            enterUsername: 'Sisesta kasutajanimi',
            enterEmail: 'Sisesta e-maili aadress',
            name: 'Nimi',
            userIsUpdated: 'Kasutaja andmed on edukalt uuendatud',
            username: 'Kasutajanimi'
        },
        errors: {
            cannotFindRequiredCollection: 'Ei leia soovitud korpust, otsin selle asemel kõigist korpustest',
            incorrectLoginData: 'Sisestasid vale Kasutajanime või Parooli. Palun proovi uuesti!',
            noNetwork: 'Viga võrgu ühenduses, palun kontrolli oma interneti ühendust',
            selectCollection: 'Palun vali korpus, millest otsingut teostada'
        },
        fcs: {
            name: 'mitmekihilise ühendatud sisuotsingu päringukeeles (FCS-QL)',
            placeholder: '[word = "märkus"][word = "keskendunud"]',
            searchLabel: 'Mitmekihiline FCS päring'
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
            loginButton: 'Sisene',
            loginMessageP1: 'Tere',
            loginMessageP2: 'olete sisse logitud',
            loginerrorincorrect: 'RABA: Teie kasutajanimi või parool on vale. Palun proovige uuesti!',
            loginerrorservercatch: 'RABA: Vabandame! Midagi läks valesti. Palun proovige uuesti!',
            logoutButton: 'Välju',
            registerButton: 'Registreeri'
        },
        managecenter: {
            addNewCorpus: 'Lisa uus korpus',
            confirmDelete: 'Kas oled kindel, et soovid korpuse kustutada?',
            corpusIsDeleted: 'Korpus on edukalt kustutatud',
            editCenterData: 'Korpuse andmete muutmine',
            headers: [
                { key: 'id', label: 'Korpuse ID'},
                { key: 'centerName', label: 'Korpuse nimi'},
                { key: 'link', label: 'URL'}
            ]
        },
        manageuser: {
            editUserData: 'Kasutaja andmete muutmine',
            enabled: {
                true: 'aktiivne',
                false: 'suletud'
            },
            headers: [
/*                 { key: 'id', label: 'Kasutaja ID'}, */
                { key: 'name', label: 'Nimi'},
                { key: 'username', label: 'Kasutajanimi'},
                { key: 'email', label: 'e-mail'},
                { key: 'enabled', label: 'Kasutajakonto olek'}
            ]
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
            nameerrortooshortP1: 'Nimi on liiga lühike (Vähemalt ',
            nameerrortooshortP2: ' tähemärki on nõutud.)',
            nameerrortoolongP1: 'Nimi on liiga pikk (Maksimaalselt ',
            nameerrortoolongP2: ' tähemärki on lubatud.)',
            username: 'Teie kasutajanimi',
            usernameavailableerror: 'See kasutajanimi on juba kasutusel',
            usernameerrortooshortP1: 'Kasutajanimi on liiga lühike (Minimaalselt ',
            usernameerrortooshortP2: ' tähemärki on nõutud.)',
            usernameerrortoolongP1: 'Kasutajanimi on liiga pikk (Maksimaalselt ',
            usernameerrortoolongP2: ' tähemärki on lubatud.)',
            email: 'Teie e-mail',
            emailavailableerror: 'See e-mail on juba kasutuses',
            emailerrornotvalid: 'E-mail pole õige',
            emailerrortoolongP1: 'Sisestatud e-mail on liiga pikk (Maksimaalselt ',
            emailerrortoolongP2: ' tähemärki lubatud)',
            password: 'Teie parool',
            passworderrortooshortP1: 'Salasõna on liiga lühike (Vähemalt ',
            passworderrortooshortP2: ' tähemärki on nõutud.)',
            passworderrortoolongP1: 'Salasõna on liiga pikk (Maksimaalselt ',
            passworderrortoolongP2: ' tähemärki on lubatud)',
            passworderrornomatch: 'Password do not match.',            
            passwordvalidation: 'Teie parooli kinnitus'
        },
        resultfunctions: {
            causedBy: 'Põhjustaja:',
            displayAdv: 'Näita laiendatud andmete vaadet (ADV)',
            displayKwic: 'Näita KWIC',
            download: 'Allalaadimine',
            downloadCsv: 'CSV formaadis fail',
            downloadJson: 'JSON formaadis fail',
            downloadXml: 'XML formaadis fail',
            exception: 'Erand:'
        },
        results: {
            howManyMatchingCollectionsFound: 'vastavat korpust leitud',
            renderProgressMessageP1: 'vastavat korpust leitud',
            renderProgressMessageP2: 'otsitud korpusest',
            viewButton: 'Vaata'
        },
        zoomedresult: {
            moreResults: 'Rohkem tulemusi',
            noMoreResults: 'Sellele päringule pole rohkem tulemusi',
            pleaseWait: 'Võtan tulemusi vastu, palun oota...'
        }
    },
    en: {
        common: {
            actions: 'Actions',
            add: 'Add',
            anyLanguage: 'Any Language',
            closeButton: 'Close',
            corpusId: "Corpus' ID",
            corpusName: "Corpus' name",
            delete: 'Delete',
            edit: 'Edit',
            enterCorpusName: "Enter corpus' name",
            enterCorpusLink: "Enter corpus' URL",
            homepage: '– Homepage',
            in: 'in',
            password: 'Password',
            save: 'Save',
            search: 'Search',
            toggleNavigation: 'Toggle navigation',
            update: 'Update',
            username: 'Username',
        },
        addcenter: {
            enterCorpusId: "Enter corpus' ID",
            newCorpusAddedSuccess: 'New corpus has been added successfully',
            pleaseCheckData: 'Please check that the data you inserted is correct',
            thisIdExists: 'A corpus with this ID already exists in the database'
        },
        aggregatorpage: {
            andShowUpTo: 'and show up to',
            collections: 'Collections',
            erf: 'The creation of RABA has been supported by the European Union European Regional Development Fund',
            hitsPerEndpoint: 'hits per endpoint',
            searchFor: 'Search for',
            selectLanguage: 'Select Language',
        },
        corpusview: {
            allCollectionsSelected: 'All available collections',
            collapse: 'Collapse',
            deselectAll: 'Deselect all',
            expand: 'Expand',
            howManyCollectionsAreShownP1: 'Showing',
            howManyCollectionsAreShownP2: 'out of',
            howManyCollectionsAreShownP3: '(sub)collections',
            searchCorpusBox: 'Search for collection',
            selectAll: 'Select all',
            someCollectionsSelected: 'selected collections',
            subcollections: 'subcollections',
            oneCollectionSelected: '1 selected collection'
        },
        cql: {
            name: 'Text layer Contextual Query Language (CQL)',
            placeholder: 'Elephant',
            searchLabel: 'Text layer CQL query'
        },
        editcenter: {
            corpusIsUpdated: 'Corpus is updated successfully'
        },
        edituser: {
            accountstate: 'Useraccount state',
            email: 'e-mail',
            enterName: 'Enter name',
            enterUsername: 'Enter username',
            enterEmail: 'Enter e-mail address',
            name: 'Name',
            userIsUpdated: 'User is updated successfully',
            username: 'Username' 
        },
        errors: {
            cannotFindRequiredCollection: 'Cannot find the required collection, will search all collections instead',
            incorrectLoginData: 'Your Username or Password is incorrect. Please try again!',
            noNetwork: 'Network error, please check your internet connection',
            selectCollection: 'Please select a collection to search into'
        },
        fcs: {
            name: 'Multi-layer Federated Content Search Query Language (FCS-QL)',
            placeholder: '[word = "annotation"][word = "focused"]',
            searchLabel: 'Multi-layer FCS query'
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
            loginButton: 'Login',
            loginMessageP1: 'Hello',
            loginMessageP2: 'you have logged in',
            loginerrorincorrect: 'RABA: Your Username or Password is incorrect. Please try again!',
            loginerrorservercatch: 'RABA: Sorry! Something went wrong. Please try again!',
            logoutButton: 'Log out',
            registerButton: 'Register'
        },
        managecenter: {
            addNewCorpus: 'Add new corpus',
            confirmDelete: 'Are you sure you want to delete this corpus?',
            corpusIsDeleted: 'Corpus has been deleted successfully',
            editCenterData: 'Edit corpus data',
            headers: [
                { key: 'id', label: "Corpus' ID"},
                { key: 'centerName', label: "Corpus' name"},
                { key: 'link', label: 'URL' }
            ]
        },
        manageuser: {
            editUserData: 'Edit user data',
            enabled: {
                true: 'Active',
                false: 'Disabled'
            },
            headers: [
/*                 { key: 'id', label: 'User ID'}, */
                { key: 'name', label: 'Name'},
                { key: 'username', label: 'Username'},
                { key: 'email', label: 'e-mail'},
                { key: 'enabled', label: 'Useraccount state'}
            ]
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
            nameerrortooshortP1: 'Name is too short (Minimum ',
            nameerrortooshortP2: ' characters needed.)',
            nameerrortoolongP1: 'Name is too long (Maximum ',
            nameerrortoolongP2: ' characters allowed.)',
            username: 'Your username',
            usernameavailableerror: 'This username is already taken',
            usernameerrortooshortP1: 'Username is too short (Minimum ',
            usernameerrortooshortP2: ' characters needed.)',
            usernameerrortoolongP1: 'Username is too long (Maximum ',
            usernameerrortoolongP2: ' characters allowed.)',
            email: 'Your e-mail',
            emailavailableerror: 'This Email is already registered',
            emailerrornotvalid: 'Email not valid',
            emailerrortoolongP1: 'Email is too long (Maximum ',
            emailerrortoolongP2: ' characters allowed)',
            password: 'Your password',
            passworderrortooshortP1: 'Password is too short (Minimum ',
            passworderrortooshortP2: ' characters needed.)',
            passworderrortoolongP1: 'Password is too long (Maximum ',
            passworderrortoolongP2: ' characters needed.)',
            passworderrornomatch: 'Password do not match.',
            passwordvalidation: 'Your password confirmation'
        },
        resultfunctions: {
            causedBy: 'Caused by:',
            displayAdv: 'Display as AdvancedDataView (ADV)',
            displayKwic: 'Display as Key Word In Context',
            download: 'Download',
            downloadCsv: 'As CSV file',
            downloadJson: 'As JSON file',
            downloadXml: 'As XML file',
            exception: 'Exception:'
        },
        results: {
            howManyMatchingCollectionsFound: 'matching collections found',
            renderProgressMessageP1: 'matching collections found in',
            renderProgressMessageP2: 'searched collections',
            viewButton: 'View'
        },
        zoomedresult: {
            moreResults: 'More Results',
            noMoreResults: 'No other results available for this query',
            pleaseWait: 'Retrieving results, please wait...'
        }
    }
}
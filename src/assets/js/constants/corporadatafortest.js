export const corporaForTest = {
   "corpora": [
      {
         "id": 1,
         "institution": {
            "id": null,
            "name": "EKRK KORP",
            "link": "https://korp.keeleressursid.ee",
            "endpoints": []
         },
         "endpoint": {
            "id": 2,
            "url": "http://193.40.33.81",
            "protocol": "VERSION_2",
            "layers": []
         },
         "handle": "root",
         "numberOfRecords": 100000,
         "landingPage": "https://korp.keeleressursid.ee",
         "title": "EKRK KORP",
         "description": "Eesti Keeleressursside Keskuse korpused",
         "languages": [
            "vro",
            "est",
            "vot"
         ],
         "adapterType": "TU_KORP",
         "preAuthorizeUse": false,
         "subCorpora": [
            {
               "id": 3,
               "institution": {
                  "id": null,
                  "name": "EKRK KORP",
                  "link": "https://korp.keeleressursid.ee",
                  "endpoints": []
               },
               "endpoint": {
                  "id": 4,
                  "url": "http://localhost:8080/adapter",
                  "protocol": "VERSION_2",
                  "layers": [
                     {
                        "id": 14,
                        "name": "baseform",
                        "synonym": "baseform",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": []
                     },
                     {
                        "id": 50,
                        "name": "word",
                        "synonym": "word",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": []
                     },
                     {
                        "id": 57,
                        "name": "nominal",
                        "synonym": "nominal",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": [
                           {
                              "id": 58,
                              "name": "Ger",
                              "synonym": "Ger"
                           },
                           {
                              "id": 59,
                              "name": "Inf",
                              "synonym": "Inf"
                           },
                           {
                              "id": 60,
                              "name": "Prc",
                              "synonym": "Prc"
                           },
                           {
                              "id": 61,
                              "name": "Sup",
                              "synonym": "Sup"
                           }
                        ]
                     },
                     {
                        "id": 66,
                        "name": "negation",
                        "synonym": "negation",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": [
                           {
                              "id": 67,
                              "name": "Aff",
                              "synonym": "Aff"
                           },
                           {
                              "id": 68,
                              "name": "Neg",
                              "synonym": "Neg"
                           }
                        ]
                     },
                     {
                        "id": 15,
                        "name": "pos",
                        "synonym": "pos",
                        "layerOperators": [
                              "IS",
                              "IS_NOT"
                        ],
                        "valueOptions": [
                           {
                              "id": 17,
                              "name": "_S_",
                              "synonym": "NOUN"
                           },
                           {
                              "id": 16,
                              "name": "_K_",
                              "synonym": "ADP"
                           },
                           {
                              "id": 18,
                              "name": "_Q_",
                              "synonym": "_Q_"
                           },
                           {
                              "id": 20,
                              "name": "_H_",
                              "synonym": "PROPN"
                           },
                           {
                              "id": 19,
                              "name": "_C_",
                              "synonym": "ADJ"
                           },
                           {
                              "id": 21,
                              "name": "_B_",
                              "synonym": "_B_"
                           },
                           {
                              "id": 23,
                              "name": "_J_",
                              "synonym": "CONJ"
                           },
                           {
                              "id": 22,
                              "name": "_G_",
                              "synonym": "_G_"
                           },
                           {
                              "id": 25,
                              "name": "_P_",
                              "synonym": "PRON"
                           },
                           {
                              "id": 24,
                              "name": "_D_",
                              "synonym": "ADV"
                           },
                           {
                              "id": 26,
                              "name": "_U_",
                              "synonym": "ADJ"
                           },
                           {
                              "id": 27,
                              "name": "_V_",
                              "synonym": "VERB"
                           },
                           {
                              "id": 28,
                              "name": "_Y_",
                              "synonym": "_Y_"
                           },
                           {
                              "id": 30,
                              "name": "_Z_",
                              "synonym": "PUNCT"
                           },
                           {
                              "id": 29,
                              "name": "_A_",
                              "synonym": "ADJ"
                           },
                           {
                              "id": 31,
                              "name": "_O_",
                              "synonym": "_O_"
                           },
                           {
                              "id": 32,
                              "name": "_X_",
                              "synonym": "_X_"
                           },
                           {
                              "id": 33,
                              "name": "_I_",
                              "synonym": "INTJ"
                           },
                           {
                              "id": 34,
                              "name": "_N_",
                              "synonym": "_N_"
                           }
                        ]
                     },
                     {
                        "id": 51,
                        "name": "number",
                        "synonym": "number",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": [
                           {
                              "id": 52,
                              "name": "Sg",
                              "synonym": "Sg"
                           },
                           {
                              "id": 53,
                              "name": "Pl",
                              "synonym": "Pl"
                           }
                        ]
                     },
                     {
                        "id": 54,
                        "name": "voice",
                        "synonym": "voice",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": [
                           {
                              "id": 55,
                              "name": "Pers",
                              "synonym": "Pers"
                           },
                           {
                              "id": 56,
                              "name": "Impers",
                              "synonym": "Impers"
                           }
                        ]
                     },
                     {
                        "id": 62,
                        "name": "person",
                        "synonym": "person",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": [
                           {
                              "id": 63,
                              "name": "2",
                              "synonym": "2"
                           },
                           {
                              "id": 64,
                              "name": "3",
                              "synonym": "3"
                           },
                           {
                              "id": 65,
                              "name": "1",
                              "synonym": "1"
                           }
                        ]
                     },
                     {
                        "id": 5,
                        "name": "analysis",
                        "synonym": "analysis",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": []
                     },
                     {
                        "id": 6,
                        "name": "tense",
                        "synonym": "tense",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": [
                           {
                              "id": 7,
                              "name": "Prs",
                              "synonym": "Prs"
                           },
                           {
                              "id": 8,
                              "name": "Prt",
                              "synonym": "Prt"
                           }
                        ]
                     },
                     {
                        "id": 35,
                        "name": "cases",
                        "synonym": "cases",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": [
                           {
                              "id": 36,
                              "name": "Nom",
                              "synonym": "Nom"
                           },
                           {
                              "id": 37,
                              "name": "Ade",
                              "synonym": "Ade"
                           },
                           {
                              "id": 38,
                              "name": "Ill",
                              "synonym": "Ill"
                           },
                           {
                              "id": 39,
                              "name": "Trm",
                              "synonym": "Trm"
                           },
                           {
                              "id": 40,
                              "name": "Ess",
                              "synonym": "Ess"
                           },
                           {
                              "id": 41,
                              "name": "Com",
                              "synonym": "Com"
                           },
                           {
                              "id": 42,
                              "name": "Ela",
                              "synonym": "Ela"
                           },
                           {
                              "id": 43,
                              "name": "Tra",
                              "synonym": "Tra"
                           },
                           {
                              "id": 44,
                              "name": "Ine",
                              "synonym": "Ine"
                           },
                           {
                              "id": 46,
                              "name": "All",
                              "synonym": "All"
                           },
                           {
                              "id": 45,
                              "name": "Abe",
                              "synonym": "Abe"
                           },
                           {
                              "id": 47,
                              "name": "Par",
                              "synonym": "Par"
                           },
                           {
                              "id": 48,
                              "name": "Gen",
                              "synonym": "Gen"
                           },
                           {
                              "id": 49,
                              "name": "Abl",
                              "synonym": "Abl"
                           }
                        ]
                     },
                     {
                        "id": 9,
                        "name": "mood",
                        "synonym": "mood",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": [
                           {
                              "id": 10,
                              "name": "Ind",
                              "synonym": "Ind"
                           },
                           {
                              "id": 11,
                              "name": "Cond",
                              "synonym": "Cond"
                           },
                           {
                              "id": 12,
                              "name": "Quot",
                              "synonym": "Quot"
                           },
                           {
                              "id": 13,
                              "name": "Imprt",
                              "synonym": "Imprt"
                           }
                        ]
                     }
                  ]
               },
               "handle": "SEMPERBARBARUS",
               "numberOfRecords": 310890,
               "landingPage": "http://193.40.33.81/info?corpus=SEMPERBARBARUS",
               "title": "SEMPERBARBARUS",
               "description": "Eesti Keeleressursside Keskuse korpused: SEMPERBARBARUS",
               "languages": [
                     "est"
               ],
               "adapterType": "TU_KORP",
               "preAuthorizeUse": false,
               "subCorpora": [],
               "parrentId": 1
            },
            {
               "id": 69,
               "institution": {
                  "id": null,
                  "name": "EKRK KORP",
                  "link": "https://korp.keeleressursid.ee",
                  "endpoints": []
               },
               "endpoint": {
                  "id": 70,
                  "url": "http://localhost:8080/adapter",
                  "protocol": "VERSION_2",
                  "layers": [
                     {
                        "id": 71,
                        "name": "word",
                        "synonym": "word",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": []
                     },
                     {
                        "id": 72,
                        "name": "pos",
                        "synonym": "pos",
                        "layerOperators": [
                           "IS",
                           "IS_NOT"
                        ],
                        "valueOptions": [
                           {
                              "id": 74,
                              "name": "_S_",
                              "synonym": "NOUN"
                           },
                           {
                              "id": 73,
                              "name": "_K_",
                              "synonym": "ADP"
                           },
                           {
                              "id": 75,
                              "name": "_Q_",
                              "synonym": "_Q_"
                           },
                           {
                              "id": 77,
                              "name": "_H_",
                              "synonym": "PROPN"
                           },
                           {
                              "id": 76,
                              "name": "_C_",
                              "synonym": "ADJ"
                           },
                           {
                              "id": 78,
                              "name": "_B_",
                              "synonym": "_B_"
                           },
                           {
                              "id": 80,
                              "name": "_J_",
                              "synonym": "CONJ"
                           },
                           {
                              "id": 79,
                              "name": "_G_",
                              "synonym": "_G_"
                           },
                           {
                              "id": 82,
                              "name": "_P_",
                              "synonym": "PRON"
                           },
                           {
                              "id": 81,
                              "name": "_D_",
                              "synonym": "ADV"
                           },
                           {
                              "id": 83,
                              "name": "_U_",
                              "synonym": "ADJ"
                           },
                           {
                              "id": 84,
                              "name": "_V_",
                              "synonym": "VERB"
                           },
                           {
                              "id": 85,
                              "name": "_Y_",
                              "synonym": "_Y_"
                           },
                           {
                              "id": 87,
                              "name": "_Z_",
                              "synonym": "PUNCT"
                           },
                           {
                              "id": 86,
                              "name": "_A_",
                              "synonym": "ADJ"
                           },
                           {
                              "id": 88,
                              "name": "_O_",
                              "synonym": "_O_"
                           },
                           {
                              "id": 89,
                              "name": "_X_",
                              "synonym": "_X_"
                           },
                           {
                              "id": 90,
                              "name": "_I_",
                              "synonym": "INTJ"
                           },
                           {
                              "id": 91,
                              "name": "_N_",
                              "synonym": "_N_"
                           }
                        ]
                     }
                  ]
               },
               "handle": "TESTCORPUS",
               "numberOfRecords": 136,
               "landingPage": "http://193.40.33.81/info?corpus=TESTCORPUS",
               "title": "TESTCORPUS",
               "description": "Eesti Keeleressursside Keskuse korpused: TESTCORPUS",
               "languages": [
                  "est"
               ],
               "adapterType": "TU_KORP",
               "preAuthorizeUse": false,
               "subCorpora": [],
               "parrentId": 1
            },
            {
               "id": 92,
               "institution": {
                  "id": null,
                  "name": "EKRK KORP",
                  "link": "https://korp.keeleressursid.ee",
                  "endpoints": []
               },
               "endpoint": {
                  "id": 93,
                  "url": "http://localhost:8080/adapter",
                  "protocol": "VERSION_2",
                  "layers": [
                     {
                        "id": 95,
                        "name": "pos",
                        "synonym": "pos",
                        "layerOperators": [
                           "IS",
                           "IS_NOT"
                        ],
                        "valueOptions": [
                           {
                              "id": 97,
                              "name": "_S_",
                              "synonym": "NOUN"
                           },
                           {
                              "id": 96,
                              "name": "_K_",
                              "synonym": "ADP"
                           },
                           {
                              "id": 98,
                              "name": "_Q_",
                              "synonym": "_Q_"
                           },
                           {
                              "id": 100,
                              "name": "_H_",
                              "synonym": "PROPN"
                           },
                           {
                              "id": 99,
                              "name": "_C_",
                              "synonym": "ADJ"
                           },
                           {
                              "id": 101,
                              "name": "_B_",
                              "synonym": "_B_"
                           },
                           {
                              "id": 103,
                              "name": "_J_",
                              "synonym": "CONJ"
                           },
                           {
                              "id": 102,
                              "name": "_G_",
                              "synonym": "_G_"
                           },
                           {
                              "id": 105,
                              "name": "_P_",
                              "synonym": "PRON"
                           },
                           {
                              "id": 104,
                              "name": "_D_",
                              "synonym": "ADV"
                           },
                           {
                              "id": 106,
                              "name": "_U_",
                              "synonym": "ADJ"
                           },
                           {
                              "id": 107,
                              "name": "_V_",
                              "synonym": "VERB"
                           },
                           {
                              "id": 108,
                              "name": "_Y_",
                              "synonym": "_Y_"
                           },
                           {
                              "id": 110,
                              "name": "_Z_",
                              "synonym": "PUNCT"
                           },
                           {
                              "id": 109,
                              "name": "_A_",
                              "synonym": "ADJ"
                           },
                           {
                              "id": 111,
                              "name": "_O_",
                              "synonym": "_O_"
                           },
                           {
                              "id": 112,
                              "name": "_X_",
                              "synonym": "_X_"
                           },
                           {
                              "id": 113,
                              "name": "_I_",
                              "synonym": "INTJ"
                           },
                           {
                              "id": 114,
                              "name": "_N_",
                              "synonym": "_N_"
                           }
                        ]
                     },
                     {
                        "id": 115,
                        "name": "word",
                        "synonym": "word",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": []
                     },
                     {
                        "id": 94,
                        "name": "msd",
                        "synonym": "msd",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": []
                     },
                     {
                        "id": 116,
                        "name": "ref",
                        "synonym": "ref",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": []
                     },
                     {
                        "id": 118,
                        "name": "deprel",
                        "synonym": "deprel",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": []
                     },
                     {
                        "id": 119,
                        "name": "lemma",
                        "synonym": "lemma",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": []
                     },
                     {
                        "id": 117,
                        "name": "dephead",
                        "synonym": "dephead",
                        "layerOperators": [
                           "IS",
                           "REGEX",
                           "IS_NOT",
                           "ENDS_WITH",
                           "NOT_REGEX",
                           "CONTAINS",
                           "STARTS_WITH"
                        ],
                        "valueOptions": []
                     }
                  ]
               },
               "handle": "UDDEV",
               "numberOfRecords": 37221,
               "landingPage": "http://193.40.33.81/info?corpus=UDDEV",
               "title": "UDDEV",
               "description": "Eesti Keeleressursside Keskuse korpused: UDDEV",
               "languages": [
                     "est"
               ],
               "adapterType": "TU_KORP",
               "preAuthorizeUse": true,
               "subCorpora": [],
               "parrentId": 1
            },
            {
            "id": 120,
            "institution": {
               "id": null,
               "name": "EKRK KORP",
               "link": "https://korp.keeleressursid.ee",
               "endpoints": []
            },
            "endpoint": {
               "id": 121,
               "url": "http://localhost:8080/adapter",
               "protocol": "VERSION_2",
               "layers": [
                  {
                     "id": 122,
                     "name": "word",
                     "synonym": "word",
                     "layerOperators": [
                        "IS",
                        "REGEX",
                        "IS_NOT",
                        "ENDS_WITH",
                        "NOT_REGEX",
                        "CONTAINS",
                        "STARTS_WITH"
                     ],
                     "valueOptions": []
                  }
               ]
            },
            "handle": "VADJASONASTIK",
            "numberOfRecords": 8279,
            "landingPage": "http://193.40.33.81/info?corpus=VADJASONASTIK",
            "title": "VADJASONASTIK",
            "description": "Eesti Keeleressursside Keskuse korpused: VADJASONASTIK",
            "languages": [
                  "est",
                  "vot"
            ],
            "adapterType": "TU_KORP",
            "preAuthorizeUse": false,
            "subCorpora": [],
            "parrentId": 1
         }
      ]
   },
   {
      "id": 129,
      "institution": {
         "id": null,
         "name": "TTÜ keeletehnoloogia labor",
         "link": "https://korpused.phon.ioc.ee",
         "endpoints": []
      },
      "endpoint": {
         "id": 130,
         "url": "https://korpused.phon.ioc.ee/api/v1/search/",
         "protocol": "VERSION_2",
         "layers": []
      },
      "handle": "root",
      "numberOfRecords": 100000,
      "landingPage": "https://korpused.phon.ioc.ee",
      "title": "TTÜ keeletehnoloogia labor",
      "description": "TTÜ keeletehnoloogia labori korpused",
      "languages": [
         "est"
      ],
      "adapterType": "TTU_SPEECH",
      "preAuthorizeUse": false,
      "subCorpora": [
         {
            "id": 131,
            "institution": {
               "id": null,
               "name": "TTÜ keeletehnoloogia labor",
               "link": "https://korpused.phon.ioc.ee",
               "endpoints": []
            },
            "endpoint": {
               "id": 132,
               "url": "http://localhost:8080/adapter",
               "protocol": "VERSION_2",
               "layers": [
                  {
                     "id": 135,
                     "name": "silp",
                     "synonym": "SYLLABLE",
                     "layerOperators": [
                        "IS",
                        "REGEX",
                        "CONTAINS"
                     ],
                     "valueOptions": []
                  },
                  {
                     "id": 136,
                     "name": "word",
                     "synonym": "WORD",
                     "layerOperators": [
                        "IS",
                        "REGEX",
                        "CONTAINS"
                     ],
                     "valueOptions": []
                  },
                  {
                     "id": 133,
                     "name": "cv",
                     "synonym": "CV",
                     "layerOperators": [
                        "IS",
                        "REGEX",
                        "CONTAINS"
                     ],
                     "valueOptions": []
                  },
                  {
                     "id": 134,
                     "name": "morf",
                     "synonym": "MORF",
                     "layerOperators": [
                        "IS",
                        "REGEX",
                        "CONTAINS"
                     ],
                     "valueOptions": []
                  },
                  {
                     "id": 137,
                     "name": "häälik",
                     "synonym": "PHONEME",
                     "layerOperators": [
                        "IS",
                        "REGEX",
                        "CONTAINS"
                     ],
                     "valueOptions": []
                  }
                  ]
            },
            "handle": "EL2K",
            "numberOfRecords": 10000,
            "landingPage": "https://korpused.phon.ioc.ee/api/v1/search/",
            "title": "Aktsendikorpus",
            "description": "TTÜ keeletehnoloogia labori korpused: Aktsendikorpus",
            "languages": [
               "est"
            ],
            "adapterType": "TTU_SPEECH",
            "preAuthorizeUse": false,
            "subCorpora": [],
            "parrentId": 129
         }
      ],
      "parrentId": 0
   },
   {
      "id": 152,
      "institution": {
         "id": null,
         "name": "EKI Sõnaveeb",
         "link": "https://ekitest.tripledev.ee/wordweb/",
         "endpoints": []
      },
      "endpoint": {
         "id": 153,
         "url": "https://korpused.phon.ioc.ee/api/v1/search/",
         "protocol": "VERSION_1",
         "layers": []
      },
      "handle": "root",
      "numberOfRecords": 100000,
      "landingPage": "https://ekitest.tripledev.ee/wordweb/",
      "title": "EKI Sõnaveeb",
      "description": "EKI Sõnaveeb",
      "languages": [
         "est"
      ],
      "adapterType": "EKI_LEX",
      "preAuthorizeUse": false,
      "subCorpora": [
         {
            "id": 154,
            "institution": {
               "id": null,
               "name": "EKI Sõnaveeb",
               "link": "https://ekitest.tripledev.ee/wordweb/",
               "endpoints": []
            },
            "endpoint": {
               "id": 155,
               "url": "http://localhost:8080/adapter",
               "protocol": "VERSION_1",
               "layers": [
                  {
                     "id": 156,
                     "name": "word",
                     "synonym": "WORD",
                     "layerOperators": [
                        "IS"
                     ],
                     "valueOptions": []
                  }
               ]
            },
               "handle": "ss1",
               "numberOfRecords": 10000,
               "landingPage": "https://korpused.phon.ioc.ee/api/v1/search/",
               "title": "Eesti keele sõnaraamat 2019",
               "description": "EKI Sõnaveeb: Eesti keele sõnaraamat 2019",
               "languages": [
                  "est"
               ],
               "adapterType": "EKI_LEX",
               "preAuthorizeUse": false,
               "subCorpora": [],
               "parrentId": 152
            },
            {
               "id": 157,
               "institution": {
                  "id": null,
                  "name": "EKI Sõnaveeb",
                  "link": "https://ekitest.tripledev.ee/wordweb/",
                  "endpoints": []
            },
            "endpoint": {
               "id": 158,
               "url": "http://localhost:8080/adapter",
               "protocol": "VERSION_1",
               "layers": [
                  {
                     "id": 159,
                     "name": "word",
                     "synonym": "WORD",
                     "layerOperators": [
                        "IS"
                     ],
                     "valueOptions": []
                  }
               ]
            },
            "handle": "psv",
            "numberOfRecords": 10000,
            "landingPage": "https://korpused.phon.ioc.ee/api/v1/search/",
            "title": "Eesti keele põhisõnavara sõnastik 2019",
            "description": "EKI Sõnaveeb: Eesti keele põhisõnavara sõnastik 2019",
            "languages": [
               "est"
            ],
               "adapterType": "EKI_LEX",
               "preAuthorizeUse": false,
               "subCorpora": [],
               "parrentId": 152
            }
         ],
         "parrentId": 0
      }
   ]
}

export const endpointForTest = {
   "id": 93,
   "url": "http://localhost:8080/adapter",
   "protocol": "VERSION_2",
   "layers": [
      {
         "id": 95,
         "name": "pos",
         "synonym": "pos",
         "layerOperators": [
            "IS",
            "IS_NOT"
         ],
         "valueOptions": [
            {
               "id": 97,
               "name": "_S_",
               "synonym": "NOUN"
            },
            {
               "id": 96,
               "name": "_K_",
               "synonym": "ADP"
            },
            {
               "id": 98,
               "name": "_Q_",
               "synonym": "_Q_"
            },
            {
               "id": 100,
               "name": "_H_",
               "synonym": "PROPN"
            },
            {
               "id": 99,
               "name": "_C_",
               "synonym": "ADJ"
            },
            {
               "id": 101,
               "name": "_B_",
               "synonym": "_B_"
            },
            {
               "id": 103,
               "name": "_J_",
               "synonym": "CONJ"
            },
            {
               "id": 102,
               "name": "_G_",
               "synonym": "_G_"
            },
            {
               "id": 105,
               "name": "_P_",
               "synonym": "PRON"
            },
            {
               "id": 104,
               "name": "_D_",
               "synonym": "ADV"
            },
            {
               "id": 106,
               "name": "_U_",
               "synonym": "ADJ"
            },
            {
               "id": 107,
               "name": "_V_",
               "synonym": "VERB"
            },
            {
               "id": 108,
               "name": "_Y_",
               "synonym": "_Y_"
            },
            {
               "id": 110,
               "name": "_Z_",
               "synonym": "PUNCT"
            },
            {
               "id": 109,
               "name": "_A_",
               "synonym": "ADJ"
            },
            {
               "id": 111,
               "name": "_O_",
               "synonym": "_O_"
            },
            {
               "id": 112,
               "name": "_X_",
               "synonym": "_X_"
            },
            {
               "id": 113,
               "name": "_I_",
               "synonym": "INTJ"
            },
            {
               "id": 114,
               "name": "_N_",
               "synonym": "_N_"
            }
         ]
      },
      {
         "id": 115,
         "name": "word",
         "synonym": "word",
         "layerOperators": [
            "IS",
            "REGEX",
            "IS_NOT",
            "ENDS_WITH",
            "NOT_REGEX",
            "CONTAINS",
            "STARTS_WITH"
         ],
         "valueOptions": []
      },
      {
         "id": 94,
         "name": "msd",
         "synonym": "msd",
         "layerOperators": [
            "IS",
            "REGEX",
            "IS_NOT",
            "ENDS_WITH",
            "NOT_REGEX",
            "CONTAINS",
            "STARTS_WITH"
         ],
         "valueOptions": []
      },
      {
         "id": 116,
         "name": "ref",
         "synonym": "ref",
         "layerOperators": [
            "IS",
            "REGEX",
            "IS_NOT",
            "ENDS_WITH",
            "NOT_REGEX",
            "CONTAINS",
            "STARTS_WITH"
         ],
         "valueOptions": []
      },
      {
         "id": 118,
         "name": "deprel",
         "synonym": "deprel",
         "layerOperators": [
            "IS",
            "REGEX",
            "IS_NOT",
            "ENDS_WITH",
            "NOT_REGEX",
            "CONTAINS",
            "STARTS_WITH"
         ],
         "valueOptions": []
      },
      {
         "id": 119,
         "name": "lemma",
         "synonym": "lemma",
         "layerOperators": [
            "IS",
            "REGEX",
            "IS_NOT",
            "ENDS_WITH",
            "NOT_REGEX",
            "CONTAINS",
            "STARTS_WITH"
         ],
         "valueOptions": []
      },
      {
         "id": 117,
         "name": "dephead",
         "synonym": "dephead",
         "layerOperators": [
            "IS",
            "REGEX",
            "IS_NOT",
            "ENDS_WITH",
            "NOT_REGEX",
            "CONTAINS",
            "STARTS_WITH"
         ],
         "valueOptions": []
      }
   ]
}

export const layersForTest = {
   "baseform": {
      "layerOperators": [
         "IS",
         "REGEX",
         "IS_NOT",
         "ENDS_WITH",
         "NOT_REGEX",
         "CONTAINS",
         "STARTS_WITH"
      ],
      "valueOptions": []
   },
   "word": {
      "layerOperators": [
         "IS",
         "REGEX",
         "IS_NOT",
         "ENDS_WITH",
         "NOT_REGEX",
         "CONTAINS",
         "STARTS_WITH"
      ],
      "valueOptions": []
   },
   "nominal": {
      "layerOperators": [
         "IS",
         "REGEX",
         "IS_NOT",
         "ENDS_WITH",
         "NOT_REGEX",
         "CONTAINS",
         "STARTS_WITH"
      ],
      "valueOptions": [
         "Ger",
         "Inf",
         "Prc",
         "Sup"
      ]
   },
   "negation": {
      "layerOperators": [
         "IS",
         "REGEX",
         "IS_NOT",
         "ENDS_WITH",
         "NOT_REGEX",
         "CONTAINS",
         "STARTS_WITH"
      ],
      "valueOptions": [
         "Aff",
         "Neg"
      ]
   },
   "pos": {
      "layerOperators": [
         "IS",
         "IS_NOT"
      ],
      "valueOptions": [
         "_S_",
         "_K_",
         "_Q_",
         "_H_",
         "_C_",
         "_B_",
         "_J_",
         "_G_",
         "_P_",
         "_D_",
         "_U_",
         "_V_",
         "_Y_",
         "_Z_",
         "_A_",
         "_O_",
         "_X_",
         "_I_",
         "_N_"
      ]
   },
   "number": {
      "layerOperators": [
         "IS",
         "REGEX",
         "IS_NOT",
         "ENDS_WITH",
         "NOT_REGEX",
         "CONTAINS",
         "STARTS_WITH"
      ],
      "valueOptions": [
         "Sg",
         "Pl"
      ]
   },
   "person": {
      "layerOperators": [
         "IS",
         "REGEX",
         "IS_NOT",
         "ENDS_WITH",
         "NOT_REGEX",
         "CONTAINS",
         "STARTS_WITH"
      ],
      "valueOptions": [
         "2",
         "3",
         "1"
      ]
   },
   "silp": {
      "layerOperators": [
         "IS",
         "REGEX",
         "CONTAINS"
      ],
      "valueOptions": []
   },
   "cv": {
      "layerOperators": [
         "IS",
         "REGEX",
         "CONTAINS"
      ],
      "valueOptions": []
   },
   "morf": {
      "layerOperators": [
         "IS",
         "REGEX",
         "CONTAINS"
      ],
      "valueOptions": []
   }
}
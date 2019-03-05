import React from 'react';
import ZoomedResult from './zoomedresult';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

const testHit = 
   {
      advancedLayers: [
         {
            language: null,
            pid: "word",
            reference: "word",
            spans: [
               { text: "Kõik", hit: false },
               { text: "teised", hit: false },
               { text: "asjad", hit: true },
               { text: "võivad", hit: false },
               { text: "jälle", hit: false }
            ]
         },
         {
            language: null,
            pid: "word",
            reference: "word",
            spans: [
               { text: "hiljem", hit: false },
               { text: ",", hit: false },
               { text: "kui", hit: false },
               { text: "kõik", hit: false },
               { text: "asjad", hit: true },
               { text: "õiendatud", hit: false },
               { text: ".", hit: false }
            ]
         }
      ],
      corpus: {
         adapterType: "TU_KORP",
         description: "Eesti Keeleressursside Keskuse korpused: SEMPERBARBARUS",
         handle: "SEMPERBARBARUS",
         id: 3,
         institution: {
            endpoints: [],
            id: null,
            link: "https://korp.keeleressursid.ee",
            name: "EKRK KORP"
         },
         landingPage: "http://193.40.33.81/info?corpus=SEMPERBARBARUS",
         languages: ["est"],
         numberOfRecords: 310890,
         preAuthorizeUse: false,
         subCorpora: [],
         title: "SEMPERBARBARUS"
      },
      diagnostics: [],
      exception: null,
      inProgress: false,
      kwics: [
         {
            fragments: [
               { text: "Kõik teised ", hit: false, html: false },
               { text: "asjad ", hit: true, html: false },
               { text: "võivad jälle", hit: false, html: false }
            ],
            keyword: "asjad ",
            language: "est",
            left: "Kõik teised ",
            pid: "318",
            reference: "word",
            right: "võivad jälle"
         },
         {
            fragments: [
               { text: "hiljem , kui kõik ", hit: false, html: false },
               { text: "asjad ", hit: true, html: false },
               { text: "õiendatud . ", hit: false, html: false }
            ],
            keyword: "asjad ",
            language: "est",
            left: "hiljem , kui kõik ",
            pid: "792",
            reference: "word",
            right: "õiendatud . "
         }
      ]
   }

const testSearchLanguage = ["mul", "igas keeles"]
const languageMap = {est: "Estonian", vro: "Võro"}

test('display fcs zoomed result as hits, Kwic and ADV', () => {
   const nextResults = jest.fn();
   const getDownloadLink = jest.fn();
   const { getByTestId, queryByTestId } = render(
      <ZoomedResult
         corpusHit={testHit}
         nextResults={nextResults}
         getDownloadLink={getDownloadLink}
         searchedLanguage={testSearchLanguage}
         languageMap={languageMap}
         queryTypeId='fcs'
         languageFromMain='ee'
      />);
   expect(getByTestId('zoomed-result')).toBeInTheDocument();
   expect(getByTestId('z-rows-hits')).toBeInTheDocument();
   fireEvent.click(getByTestId('z-display-kwic'));
   expect(queryByTestId('z-rows-hits')).not.toBeInTheDocument();
   expect(getByTestId('z-rows-kwic')).toBeInTheDocument();
   fireEvent.click(getByTestId('z-display-kwic'));
   fireEvent.click(getByTestId('z-display-adv'));
   expect(queryByTestId('z-rows-hits')).not.toBeInTheDocument();
   expect(queryByTestId('z-rows-kwic')).not.toBeInTheDocument();
   expect(getByTestId('z-rows-adv')).toBeInTheDocument();
   fireEvent.click(getByTestId('z-download'));
})

test('display cql zoomed result as hits and Kwic', () => {
   const nextResults = jest.fn();
   const getDownloadLink = jest.fn();
   const { getByTestId, queryByTestId } = render(
      <ZoomedResult
         corpusHit={testHit}
         nextResults={nextResults}
         getDownloadLink={getDownloadLink}
         searchedLanguage={testSearchLanguage}
         languageMap={languageMap}
         queryTypeId='cql'
         languageFromMain='ee'
      />);
   expect(getByTestId('zoomed-result')).toBeInTheDocument();
   expect(getByTestId('z-rows-hits')).toBeInTheDocument();
   fireEvent.click(getByTestId('z-display-kwic'));
   expect(queryByTestId('z-rows-hits')).not.toBeInTheDocument();
   expect(getByTestId('z-rows-kwic')).toBeInTheDocument();
   fireEvent.click(getByTestId('z-display-kwic'));
   expect(queryByTestId('z-display-adv')).not.toBeInTheDocument();
})
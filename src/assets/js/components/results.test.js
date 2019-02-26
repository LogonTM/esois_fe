import React from 'react';
import Results from './results';
import { render, cleanup, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';

afterEach(cleanup);

const testResults = {
   hits: 1,
   inProgress: 0,
   results: [
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
   ]
}
const testInProgressResults = {
   hits: 0,
   inProgress: 10,
   results: []
}
const testSearchLanguage = ["mul", "igas keeles"]

test('display fcs results as hits, Kwic and ADV', () => {
   const toggleResultModal = jest.fn();
   const getDownloadLink = jest.fn();
   const { getByTestId, queryByTestId } = render(
      <Results
         searchInitiated={false}
         collhits={testResults}
         toggleResultModal={toggleResultModal}
         getDownloadLink={getDownloadLink}
         searchedLanguage={testSearchLanguage}
         queryTypeId='fcs'
         languageFromMain='ee'
      />);
   expect(getByTestId('result-panel')).toBeInTheDocument();
   expect(getByTestId('rows-hits')).toBeInTheDocument();
   fireEvent.click(getByTestId('display-kwic'));
   expect(queryByTestId('rows-hits')).not.toBeInTheDocument();
   expect(getByTestId('rows-kwic')).toBeInTheDocument();
   fireEvent.click(getByTestId('display-kwic'));
   fireEvent.click(getByTestId('display-adv'));
   expect(queryByTestId('rows-hits')).not.toBeInTheDocument();
   expect(queryByTestId('rows-kwic')).not.toBeInTheDocument();
   expect(getByTestId('rows-adv')).toBeInTheDocument();
   // expect(getByTestId('download')).toEqual(<button aria-expanded="false" class="btn btn-flat" data-testid="download" data-toggle="dropdown"><span aria-hidden="true" class="fa fa-download" />Allalaadimine<span class="caret" /></button>);
   fireEvent.click(getByTestId('download'));
   // expect(getByTestId('download')).toEqual(<button aria-expanded="true" class="btn btn-flat" data-testid="download" data-toggle="dropdown"><span aria-hidden="true" class="fa fa-download" />Allalaadimine<span class="caret" /></button>);
})

test('display cql results as hits and Kwic', () => {
   const toggleResultModal = jest.fn();
   const getDownloadLink = jest.fn();
   const { getByTestId, queryByTestId } = render(
      <Results
         searchInitiated={false}
         collhits={testResults}
         toggleResultModal={toggleResultModal}
         getDownloadLink={getDownloadLink}
         searchedLanguage={testSearchLanguage}
         queryTypeId='cql'
         languageFromMain='ee'
      />);
   expect(getByTestId('result-panel')).toBeInTheDocument();
   expect(getByTestId('rows-hits')).toBeInTheDocument();
   fireEvent.click(getByTestId('display-kwic'));
   expect(queryByTestId('rows-hits')).not.toBeInTheDocument();
   expect(getByTestId('rows-kwic')).toBeInTheDocument();
   fireEvent.click(getByTestId('display-kwic'));
   expect(queryByTestId('display-adv')).not.toBeInTheDocument();
   fireEvent.click(getByTestId('download'));
})

test('search in progress', () => {
   const toggleResultModal = jest.fn();
   const getDownloadLink = jest.fn();
   const { getByTestId, queryByTestId } = render(
      <Results
         searchInitiated={true}
         collhits={testInProgressResults}
         toggleResultModal={toggleResultModal}
         getDownloadLink={getDownloadLink}
         searchedLanguage={testSearchLanguage}
         queryTypeId='fcs'
         languageFromMain='ee'
      />);
   expect(queryByTestId('result-panel')).not.toBeInTheDocument();
   expect(getByTestId('loading-results')).toBeInTheDocument();
})
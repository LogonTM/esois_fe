import { pairs } from './functions'

test('that pairs makes array of pair arrays out of an object', () => {
   const languages = {est: 'eesti', vot: 'vadja', vro: 'võru'};
   expect(pairs(languages)).toEqual(expect.arrayContaining([["est", "eesti"], ["vot", "vadja"], ["vro", "võru"]]))
})
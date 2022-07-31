import { Pokedexes } from 'pokenode-ts';

export const gameOptions = [
  { name: 'National', pokedexID: 1, pokedexName: Pokedexes.KANTO },
  { name: 'Red / Blue / Yellow', pokedexID: 2, pokedexName: Pokedexes.KANTO },
  {
    name: 'Gold / Silver / Crystal',
    pokedexID: 3,
    pokedexName: Pokedexes.ORIGINAL_JOHTO,
  },
  {
    name: 'Ruby / Sapphire / Emerald',
    pokedexID: 4,
    pokedexName: Pokedexes.HOENN,
  },
  { name: 'FireRed / LeafGreen', pokedexID: 2, pokedexName: Pokedexes.KANTO },
  {
    name: 'Diamond / Pearl / Platinum',
    pokedexID: 5,
    pokedexName: Pokedexes.ORIGINAL_SINNOH,
  },
  {
    name: 'HeartGold / SoulSilver',
    pokedexID: 7,
    pokedexName: Pokedexes.UPDATED_JOHTO,
  },
  {
    name: 'Black / White',
    pokedexID: 8,
    pokedexName: Pokedexes.ORIGINAL_UNOVA,
  },
  {
    name: 'Black 2 / White 2',
    pokedexID: 9,
    pokedexName: Pokedexes.UPDATED_UNOVA,
  },
  {
    name: 'X / Y',
    pokedexID: [12, 13, 14],
    pokedexName: [
      Pokedexes.KALOS_CENTRAL,
      Pokedexes.KALOS_COASTAL,
      Pokedexes.KALOS_MONTAIN,
    ],
  },
  {
    name: 'Omega Ruby / Alpha Sapphire',
    pokedexID: 15,
    pokedexName: Pokedexes.UPDATED_HOENN,
  },
  {
    name: 'Sun / Moon',
    pokedexID: [16, 17, 18, 19, 20],
    pokedexName: [
      Pokedexes.ORIGINAL_ALOLA,
      Pokedexes.ORIGINAL_MELEMELE,
      Pokedexes.ORIGINAL_AKALA,
      Pokedexes.ORIGINAL_ULAULA,
      Pokedexes.ORIGINAL_PONI,
    ],
  },
  {
    name: 'Ultra Sun / Ultra Moon',
    pokedexID: [21, 22, 23, 24, 25],
    pokedexName: [
      Pokedexes.UPDATED_ALOLA,
      Pokedexes.UPDATED_MELEMELE,
      Pokedexes.UPDATED_AKALA,
      Pokedexes.UPDATED_ULAULA,
      Pokedexes.UPDATED_PONI,
    ],
  },
  {
    name: "Let's Go Pickachu / Let's Go Eevee",
    pokedexID: 26,
    pokedexName: 'LETS_GO_KANTO',
  },
  {
    name: 'Sword / Shield',
    pokedexID: [27, 28, 29],
    pokedexName: [
      Pokedexes.GALAR,
      Pokedexes.ISLE_OF_ARMOR,
      Pokedexes.CROWN_TUNDRA,
    ],
  },
];

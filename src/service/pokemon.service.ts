import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

export const getAllSets = async () => {
  let allSets = await PokemonTCG.getAllSets();

  return allSets;
};
export const getSetById = async (setId: string) => {
  let set = await PokemonTCG.findSetByID(setId);

  return set;
};

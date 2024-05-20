import { QueryKeys } from "@/models/enums";
import {
  getCustomSetNameById,
  postCustomSetNameById,
} from "@/service/astha.service";
import { getAllSets, getSetById } from "@/service/pokemon.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";

export const useSet = (setId: string) => {
  return useQuery<Set>({
    queryKey: [QueryKeys.set, setId],
    queryFn: async () => {
      const set = await getSetById(setId);
      const customSetName = await getCustomSetNameById(setId);
      console.log(customSetName);
      set.name = customSetName.name;
      //throw new Error("asd");
      return set;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: true,
    retry: 1,
    retryDelay: 3000,
  });
};
export const useSets = () => {
  return useQuery<Set[]>({
    queryKey: [QueryKeys.sets],
    queryFn: async () => {
      const sets = await getAllSets();
      //throw new Error("asd");
      return sets;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: true,
    retry: 1,
    retryDelay: 3000,
  });
};
export const useUpdateSetName = (customSetNameExists: boolean) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ setId, setName }: { setId: string; setName: string }) => {
      if (customSetNameExists) {
        return postCustomSetNameById(setId, setName);
      } else {
        return postCustomSetNameById(setId, setName);
      }
    },
    onSuccess: (data, variables) => {
      console.log("successfully updated");
      queryClient.invalidateQueries({
        queryKey: [QueryKeys.set, variables.setId],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

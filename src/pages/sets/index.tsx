import { getAllSets } from "@/service/pokemon.service";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticProps,
} from "next";
import { useSets } from "@/hooks/react-query-hooks";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { QueryKeys } from "@/models/enums";
//SSR = getServerSideProps
//SSG / ISR= getStaticProps

export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState;
}> = async () => {
  console.log("I AM SERVER");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.sets],
    queryFn: async () => {
      const sets = await getAllSets();
      return sets;
    },
  });
  console.log("I AM SERVER");
  return { props: { dehydratedState: dehydrate(queryClient) }, revalidate: 30 };

  //const tempSets = null as unknown as Set[];
  // let returnVal = null as unknown as Set[];
  // try {
  //   const tempSets = await getAllSets();
  //   //throw new Error("custom error");
  //   returnVal = tempSets;
  // } catch (e) {
  //   console.log(e);
  //   return { notFound: true, revalidate: 1200 };
  // }
  // return { props: { serverSets: returnVal }, revalidate: 30 };
};

const SetList = (props: any) => {
  console.log(props);
  // const [sets, setSets] = useState<Set[]>(props.serverSets);
  // const setInit = async () => {
  //   try {
  //     const tempSets = await getAllSets();
  //     setSets(tempSets);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  // useEffect(() => {
  //   if (!sets) {
  //     setInit();
  //   }
  // }, []);
  const { data: sets, isLoading, isError } = useSets();

  return (
    <div className="px-3 flex flex-wrap">
      {isLoading && "Loading..."}
      {sets?.map((set) => {
        return (
          <div key={set.id} className="flex px-3 flex-col">
            <div className="relative w-[100px] h-[100px]">
              <Image src={set?.images.logo || ""} fill alt="set logo"></Image>
            </div>
            <div className="">{set?.name || "loading..."}</div>
          </div>
        );
      })}
      {isError && "Error"}
    </div>
  );
};
export default SetList;

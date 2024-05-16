import { useSet, useSets } from "@/hooks/react-query-hooks";
import { QueryKeys } from "@/models/enums";
import { getCustomSetNameById } from "@/service/astha.service";
import { getAllSets, getSetById } from "@/service/pokemon.service";
import { DehydratedState, QueryClient, dehydrate } from "@tanstack/react-query";
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { Set } from "pokemon-tcg-sdk-typescript/dist/sdk";
import { FC, useEffect, useState } from "react";

//SSR = getServerSideProps
//SSG / ISR = getStaticProps + getStaticPaths
//getStaticPaths fallback = false | true | blocking

export const getStaticPaths: GetStaticPaths = async (context) => {
  let allSets = await getAllSets();
  let listOfSetIdObjects = allSets.map((x) => {
    return { params: { setId: x.id } };
  });

  return { paths: listOfSetIdObjects.splice(0, 10), fallback: "blocking" };
};

export const getStaticProps: GetStaticProps<{
  dehydratedState: DehydratedState;
}> = async (context) => {
  console.log("I AM SERVER");

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: [QueryKeys.set, context.params?.setId],
    queryFn: async () => {
      const set = await getSetById(context.params?.setId as string);
      const customSetName = await getCustomSetNameById(
        context.params?.setId as string
      );
      console.log(customSetName);
      set.name = customSetName;
      return set;
    },
  });
  //  await queryClient.prefetchQuery({
  //    queryKey: [QueryKeys.set, context.params?.setId,'customSetName'],
  //    queryFn: async () => {
   
  //      const customSetName = await getCustomSetNameById(
  //        context.params?.setId as string
  //      );
  //      console.log(customSetName);
  //      set.name = customSetName;
  //      return set;
  //    },
  //  });
  console.log("I AM SERVER");
  return {
    props: { dehydratedState: dehydrate(queryClient), customSetName: ''},
    revalidate: 120,
  };
};
const SetPage: FC = () => {
  const router = useRouter();
  const { data: singleSet } = useSet(router.query.setId as string);
  console.log("im in set page");

  return (
    <div className="flex h-full">
      {router.isFallback ? (
        <>Fallback Loading</>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow">
          <div className="relative w-[100px] h-[100px]">
            <Image
              src={singleSet?.images?.logo || ""}
              fill
              alt="set logo"
            ></Image>
          </div>
          <div className="">{singleSet?.name || "loading..."}</div>
        </div>
      )}
    </div>
  );
};

export default SetPage;

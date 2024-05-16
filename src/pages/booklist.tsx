import { getAllSets } from "@/service/pokemon.service";
import { useEffect } from "react";

const BookList = () => {
  useEffect(() => {
    getAllSets().then((allSets) => {
      console.log(allSets);
    });
  }, []);
  return <></>;
};
export default BookList;

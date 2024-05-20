import axios from "axios";

const axiosInstance = axios.create({});
export const getCustomSetNameById = async (setId: string) => {
  let set = await axiosInstance.get(
    (process.env.NEXT_PUBLIC_ASTHA_API_URL || "") +
      process.env.NEXT_PUBLIC_SET_PATH +
      setId,
    { headers: { "x-api-key": `${process.env.NEXT_PUBLIC_ASTHA_API_KEY}` } }
  );

  return set.data;
};
export const postCustomSetNameById = async (
  setId: string,
  customSetName: string
) => {
  let set = await axiosInstance.post(
    (process.env.NEXT_PUBLIC_ASTHA_API_URL || "") +
      process.env.NEXT_PUBLIC_SET_PATH +
      setId,
    { name: customSetName },
    { headers: { "x-api-key": `${process.env.NEXT_PUBLIC_ASTHA_API_KEY}` } }
  );

  return set.data;
};

import { USER_URL } from "../../constants";
import axiosInstance from "./axiosInstance";

export const getAddresses = async () => {
  try {
    const { data } = await axiosInstance(USER_URL + "/address");
    return data.data;
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

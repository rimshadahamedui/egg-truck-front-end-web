import { USER_URL } from "../../constants";
import axiosInstance from "./axiosInstance";

export const removeItemFromCart = async (_id) => {
  return axiosInstance.delete(USER_URL + `/cart/${_id}`);
};

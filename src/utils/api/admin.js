import { ADMIN_URL } from "../../constants";
import axiosInstance from "./axiosInstance";

export const blockUser = (_id, reason) => {
  return axiosInstance.patch(`/admin/e-com/user/${_id}`, {
    reason,
  });
};

export const getOffers = async () => {
  const { data } = await axiosInstance(ADMIN_URL + "/offers");
  return data;
};

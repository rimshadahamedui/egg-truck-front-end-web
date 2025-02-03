import axiosInstance, { axiosPublicInstance } from "./axiosInstance";
import { USER_URL } from "../../constants";

export const getProduct = async (productId) => {
  const response = await axiosPublicInstance.get(
    USER_URL + `/product/${productId}`
  );
  return response.data;
};

export const addItemToWishlist = (productId) =>
  axiosInstance.post(USER_URL + `/wishlist`, { productId });

export const removeItemFromWishlist = (productId) =>
  axiosInstance.delete(USER_URL + `/wishlist/${productId}`);

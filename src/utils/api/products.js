import axiosInstance, { axiosPublicInstance } from "./axiosInstance";
import { USER_URL } from "../../constants";

export const getProducts = async (options) => {
  const response = await axiosPublicInstance(USER_URL + "/products", {
    params: options,
  });
  return response?.data;
};

// this function adds a new field to the product list, to check a product is in wishlist or not.
export const getProductsWithWishlistStatus = async (products) => {
  const { data } = await axiosInstance(USER_URL + "/wishlist");
  const wishlist = data?.data;
  const wishlistIds = new Set(wishlist.map((item) => item._id));
  const updatedProducts = products.map((item) => ({
    ...item,
    isProductInWishlist: wishlistIds.has(item._id || item.id),
  }));
  return updatedProducts;
};

export const getCategories = async () => {
  const { data } = await axiosPublicInstance(USER_URL + "/categories");
  return data;
};

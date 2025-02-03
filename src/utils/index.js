import { removeItem } from "./localStorageUtil";
import _ from "lodash";
import { clearUser } from "../redux/slices/UserSlice";
import { store } from "../redux/Store";
import { allowedImageFileTypes } from "../constants";

// This function used for updating a object in array list
export default function updateArrayObjects(array, key, value, newData) {
  return array.map((item) => {
    if (item[key] === value) {
      return { ...item, ...newData };
    }
    return item;
  });
}

export const logout = () => {
  removeItem("accessToken");
  removeItem("refreshToken");
  store.dispatch(clearUser());
};

export const capitalizeInitial = (str) => (str ? str[0].toUpperCase() : null);

export const capitalize = (str) =>
  str ? capitalizeInitial(str) + str.slice(1) : null;

export const getLastOrderStatus = (statusObj) => {
  const statusList = Object.keys(statusObj)
    .filter((key) => statusObj[key]?.status === true)
    .map((key) => ({ name: key, time: statusObj[key].time }));

  if (statusList.length > 0) {
    return statusList.at(-1);
  }
  return { name: "Pending", time: null };
};

export const getStatusColor = (statusName) => {
  switch (statusName) {
    case "initiated":
      return "blue";
    case "shipped":
      return "orange";
    case "outForDelivery":
      return "purple";
    case "delivered":
      return "green";
    case "cancelled":
      return "red";
    case "pending":
      return "gray";
    default:
      return "black";
  }
};

export const getRatingColor = (rating) => {
  switch (rating) {
    case "one":
      return "red";
    case "two":
      return "orange";
    case "three":
      return "green";
    case "four":
      return "green";
    case "five":
      return "green";
    default:
      return "#fde047";
  }
};

export const calculateAverageRating = (rating) => {
  const totalRatings =
    rating.one + rating.two + rating.three + rating.four + rating.five;
  const weightedSum =
    1 * rating.one +
    2 * rating.two +
    3 * rating.three +
    4 * rating.four +
    5 * rating.five;

  return totalRatings > 0 ? (weightedSum / totalRatings).toFixed(1) : 0;
};

export const getTruncated = (str, length = 8) =>
  str ? str.slice(0, length) + "..." : str;

export const getAllowedImageFormats = () =>
  allowedImageFileTypes.map((type) => type.slice(6).toUpperCase()).join(", ");

export const isObjectsEqual = (obj1, obj2) => _.isEqual(obj1, obj2);

export const isValidFileType = (files) => {
  let isValid = true;

  files.forEach((file) => {
    if (!allowedImageFileTypes.includes(file.type)) {
      isValid = false;
    }
  });
  return isValid;
};

/* this function only returns items  that are 
Active and if b2b is enabled it checks a product is listed as B2B */
export const transformItems = (items) => {
  const { isB2B } = store.getState().user.user;
  return isB2B
    ? items.filter((item) => item.isActive && item.isB2B)
    : items.filter((item) => item.isActive);
};

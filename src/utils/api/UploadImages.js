import { toast } from "react-toastify";
import env from "../config/env";
import axios from "axios";

export default async function uploadImages(images) {
  try {
    const promises = images.map(async (image) => {
      const formData = new FormData();
      const blob = await fetchBlobFromUrl(image);
      formData.append("file", blob);
      formData.append("upload_preset", env.CLOUDINARY_UPLOAD_PRESET);

      return axios.post(
        `https://api.cloudinary.com/v1_1/${env.CLOUDNAME}/image/upload`,
        formData
      );
    });
    return (await Promise.all(promises)).map((res) => res.data.secure_url);
  } catch (error) {
    toast.error(error.message);
  }
}

const fetchBlobFromUrl = async (blobUrl) => {
  const response = await fetch(blobUrl);
  const blob = await response.blob();
  return blob;
};

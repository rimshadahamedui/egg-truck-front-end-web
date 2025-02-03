import { useRef, useState } from "react";
import useOutsideAlerter from "../../../../Hooks/OutsideClickAlerter";
import { useFormik } from "formik";
import { categoryValidation } from "../../../../utils/validations";
import axiosInstance from "../../../../utils/api/axiosInstance";
import { LoaderCircle, Upload, X } from "lucide-react";
import showToast from "../../../../utils/showToast";
import { Text } from "../../../UserComponents";
import {
  getAllowedImageFormats,
  isObjectsEqual,
  isValidFileType,
} from "../../../../utils";
import CropperModal from "../../cropper/CropperModal";
import uploadImages from "../../../../utils/api/UploadImages";

const AddorEditcategory = ({
  isEditing = false,
  categoryData,
  handleNewCategory,
  handleUpdateCategory,
  handlevisibilty,
}) => {
  const [imageCroppingModal, setImageCroppingModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const ref = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: categoryData?.name || "",
      image: categoryData?.image || "",
    },
    validationSchema: categoryValidation,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      if (isEditing) {
        // if the category info is same no api call will be made.
        if (
          isObjectsEqual(
            { name: categoryData?.name, image: categoryData?.image },
            values
          )
        ) {
          handlevisibilty();
          return;
        }
        axiosInstance
          .patch("/admin/e-com/category", {
            ...values,
            categoryId: categoryData?._id,
          })
          .then(() => {
            handleUpdateCategory(values);
            showToast("Category updated successfully");
            handlevisibilty();
          })
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      } else {
        axiosInstance
          .post("/admin/e-com/category", values)
          .then(({ data }) => {
            handleNewCategory(data.category);
            showToast("Category added successfully");
            handlevisibilty();
          })
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      }
    },
  });
  useOutsideAlerter(ref, handlevisibilty);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const isAllowedTypes = isValidFileType(files);
    if (!isAllowedTypes) {
      formik.setFieldError("image", "Invalid file type");
      return;
    }
    formik.setFieldError("image", undefined);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    if (imageURLs.length) {
      setSelectedImages(imageURLs);
      setImageCroppingModal(true);
    }
  };

  const handleUploadImageToCloudinary = async () => {
    setIsUploading(true);
    const [url] = await uploadImages(croppedImages);
    formik.setFieldValue("image", url);
    setCroppedImages([]);
    setIsUploading(false);
    showToast("Image uploaded successfully");
  };

  return (
    <div className="flex bg-gray-500 bg-opacity-50 overflow-x-hidden fixed top-3 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full" ref={ref}>
        <div className="relative bg-white-A700 rounded-lg shadow  dark:bg-dark ">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white-A700">
              {isEditing ? "Edit" : "Add"} Category
            </h3>
            <button
              type="button"
              onClick={handlevisibilty}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <X />
            </button>
          </div>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="space-y-1">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-A700"
                >
                  Category Name
                </label>
                <div className="bg-gray-50 dark:bg-gray-600  border dark:border-gray-500 px-1 rounded-md">
                  <input
                    type="text"
                    className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl h-10 block w-full p-2.5  dark:bg-gray-600  dark:placeholder-gray-400 dark:text-white-A700 "
                    placeholder="Example"
                    {...formik.getFieldProps("name")}
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <Text className="text-red-500 " size="s">
                    {formik.errors.name}
                  </Text>
                )}
              </div>

              <div className="col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-A700"
                  htmlFor="Image"
                >
                  Upload an image
                </label>
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <input
                      className="flex h-9 w-full rounded-xl px-3 py-1 focus:file:outline-none text-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                      {getAllowedImageFormats()}
                    </p>
                    {formik.errors.image && (
                      <Text className="text-red-500 " size="s">
                        {formik.errors.image}
                      </Text>
                    )}
                  </div>
                  {croppedImages.length ? (
                    <button
                      type="button"
                      onClick={handleUploadImageToCloudinary}
                      className="inline-flex items-center gap-1 font-medium px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 text-white-A700"
                    >
                      Upload{" "}
                      {isUploading ? (
                        <LoaderCircle className="size-4 animate-spin" />
                      ) : (
                        <Upload className="size-4" />
                      )}
                    </button>
                  ) : null}
                </div>
              </div>
              {formik.values.image && (
                <div className="size-20 rounded-md ">
                  <img
                    src={formik.values.image}
                    alt={"Uploaded Image "}
                    className="w-full   rounded-md  object-contain"
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full  text-white-A700 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isEditing ? "Save" : "Add"}
              </button>
            </form>
          </div>
        </div>
        {imageCroppingModal && (
          <CropperModal
            images={selectedImages}
            onClose={(croppedImages) => {
              setImageCroppingModal(false);
              setCroppedImages(croppedImages);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AddorEditcategory;

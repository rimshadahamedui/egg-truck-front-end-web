import React, { useEffect, useRef, useState } from "react";
import { FormikInput } from "../../../UserComponents/Input/FormikInput";
import { useFormik } from "formik";
import showToast from "../../../../utils/showToast";
import { ADMIN_URL } from "../../../../constants";
import useDynamicTextArea from "../../../../Hooks/useDynamicTextArea";
import useOutsideAlerter from "../../../../Hooks/OutsideClickAlerter";
import useDisableBodyScroll from "../../../../Hooks/useDisableBodyScroll";
import { LoaderCircle, Upload, X } from "lucide-react";
import axiosInstance from "../../../../utils/api/axiosInstance";
import { Text } from "../../../UserComponents";
import { RadioGroup } from "../../../UserComponents/RadioGroup";
import { Radio } from "../../../UserComponents/Radio";
import {
  getAllowedImageFormats,
  getTruncated,
  isValidFileType,
} from "../../../../utils";
import CropperModal from "../../cropper/CropperModal";
import uploadImages from "../../../../utils/api/UploadImages";
import useFetchApi from "../../../../Hooks/useFetchApi";
import { Checkbox } from "@chakra-ui/react";
import { bannerValidationSchema } from "../../../../utils/validations";

const AddorEditBanner = ({
  isEditing = false,
  bannerData,
  handleNewBanner,
  handleUpdatedBanner,
  handlevisibilty,
}) => {
  const [imageCroppingModal, setImageCroppingModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { data: productData } = useFetchApi({ url: ADMIN_URL + "/products" });
  const { data: categoryData } = useFetchApi({
    url: ADMIN_URL + "/categories",
  });
  const [selectOptions, setSelectOptions] = useState([]);

  const ref = useRef(null);
  useDisableBodyScroll(true);
  useOutsideAlerter(ref, handlevisibilty);

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      name: bannerData?.name || "",
      description: bannerData?.description || "",
      url: bannerData?.url || "",
      image: bannerData?.image || "",
      isB2B: bannerData?.isB2B || false,
      type: bannerData?.type || "primary",
      //   startDate: bannerData?.startDate || "",
      //   endDate: bannerData?.endDate || "",
    },
    validationSchema: bannerValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      if (isEditing) {
        axiosInstance
          .patch(ADMIN_URL + `/banner/${bannerData._id}`, values)
          .then(({ data }) => {
            console.log(data, "updated");
            handleUpdatedBanner(data.data);
            handlevisibilty();
            showToast("Banner updated successfully");
          })
          .catch((e) => showToast(e.message, "error"))
          .finally(() => setIsSubmitting(false));
      } else {
        axiosInstance
          .post(ADMIN_URL + "/banner", values)
          .then(({ data }) => {
            handleNewBanner(data.data);
            handlevisibilty();
            showToast("Banner added successfully");
          })
          .catch((err) => showToast(err.message, "error"))
          .finally(() => setIsSubmitting(false));
      }
    },
  });
  const { textareaRef } = useDynamicTextArea(formik.values.description);

  useEffect(() => {
    if (formik.values.type === "primary") {
      const options = productData.length
        ? productData.map((p) => ({ _id: p._id, name: p.name }))
        : [];
      setSelectOptions(options);
    } else {
      const options = categoryData.length
        ? categoryData.map((c) => ({ _id: c._id, name: c.name }))
        : [];
      setSelectOptions(options);
    }
  }, [formik.values.type, productData, categoryData]);

  const handleRadioChange = (value) => {
    if (value === "secondary") formik.setFieldValue("isB2B", false);

    formik.setFieldValue("type", value);
    formik.setFieldValue("url", "");
  };

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

  const handleCrop = (croppedImages) => {
    setImageCroppingModal(false);
    setCroppedImages(croppedImages);
  };

  const handleUploadImageToCloudinary = async () => {
    setIsUploading(true);
    const [url] = await uploadImages(croppedImages);
    formik.setFieldValue("image", url);
    setCroppedImages([]);
    setIsUploading(false);
    showToast("Image uploaded successfully");
  };

  const handleSelectChange = (e) => {
    const { value } = e.target;
    const { type } = formik.values;
    type === "primary"
      ? formik.setFieldValue("url", `/product/${value}`)
      : formik.setFieldValue("url", `/shop?q=&category[0]=${value}`);
  };

  return (
    <div className="flex h-full bg-gray-500 bg-opacity-50 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full">
      <div className="relative p-4 w-full max-w-md my-auto">
        <div
          className="relative bg-white-A700 rounded-lg shadow  dark:bg-dark max-h-[580px] px-2  overflow-y-auto scrollbar-hide"
          ref={ref}
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white-A700">
              {isEditing ? "Edit" : "Add"} Banner
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
            <form className=" space-y-4" onSubmit={formik.handleSubmit}>
              <div className="flex gap-2 w-full">
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-900 dark:text-white-A700"
                >
                  Banner Type
                </label>
                <RadioGroup
                  className="flex gap-2 w-full"
                  selectedValue={formik.values.type}
                  onChange={handleRadioChange}
                >
                  <Radio
                    value="primary"
                    label="Promote Product"
                    className=" flex-1 gap-3 p-px text-sm text-blue_gray-700"
                  />
                  <Radio
                    value="secondary"
                    label="Promote Category"
                    className=" flex-1 gap-3 p-px text-sm text-blue_gray-700"
                  />
                </RadioGroup>
              </div>
              <div className="space-y-1 w-full">
                <FormikInput
                  label="Title"
                  type="text"
                  placeholder="Example"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.name}
                  </Text>
                )}
              </div>

              <div className="space-y-1">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-A700"
                >
                  Description
                </label>
                <div className="bg-gray-50 w-full  dark:bg-gray-600  border dark:border-gray-500 px-1 rounded-md">
                  <textarea
                    ref={textareaRef}
                    value={formik.values.description}
                    placeholder="Description"
                    className={` text-gray-900 text-sm rounded-lg block h-10 w-full p-2.5 dark:placeholder-gray-400 dark:text-white-A700`}
                    onChange={(e) =>
                      formik.setFieldValue("description", e.target.value)
                    }
                  />
                </div>
                {formik.touched.description && formik.errors.description && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.description}
                  </Text>
                )}
              </div>
              <div className={`space-y-1`}>
                <label
                  htmlFor="Url"
                  className="block text-sm font-medium text-gray-900 dark:text-white-A700"
                >
                  Select an item for redirecting
                </label>
                <select
                  onChange={handleSelectChange}
                  className="bg-gray-50 border appearance-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white-A700 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option value="" defaultValue="">
                    Select{" "}
                    {formik.values.type === "primary" ? "Product" : "Category"}
                  </option>
                  {selectOptions.length
                    ? selectOptions.map((item) => (
                        <option value={item._id} key={item._id}>
                          {item?.name.length > 30
                            ? getTruncated(item?.name, 30)
                            : item?.name}
                        </option>
                      ))
                    : null}
                </select>

                {formik.errors.url && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.url}
                  </Text>
                )}
              </div>
              <div className="col-span-2">
                <label
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-A700"
                  htmlFor="file_input"
                >
                  Upload file
                </label>
                <div className="flex justify-between items-center gap-2">
                  <div>
                    <input
                      className="flex h-9 w-full rounded-xl px-3 py-1 focus:file:outline-none text-sm transition-colors file:border-0 file:bg-transparent file:text-foreground file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                      type="file"
                      onChange={handleImageChange}
                    />
                    <Text className="text-red-500" size="s">
                      {formik.errors.image}
                    </Text>
                  </div>
                  {croppedImages.length ? (
                    <button
                      type="button"
                      onClick={handleUploadImageToCloudinary}
                      className="inline-flex items-center gap-1 font-medium px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white-A700"
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

                <p className="inline-flex flex-col gap-1  text-sm text-gray-500 dark:text-gray-300">
                  {getAllowedImageFormats()}
                  <span className="text-[12px] ">
                    WEBP is recomended for faster image load
                  </span>
                </p>

                <div className="flex gap-2 items-center mt-2 flex-wrap">
                  {croppedImages.length ? (
                    <>
                      {croppedImages.map((url, i) => (
                        <div className="size-28" key={i}>
                          <img
                            src={url}
                            alt="cropped"
                            className="w-full rounded-md object-contain"
                          />
                        </div>
                      ))}
                    </>
                  ) : null}
                  {formik.values.image && (
                    <div className="relative size-24 rounded-md mt-5 mb-1">
                      <img
                        src={formik.values.image}
                        alt={"Uploaded banner "}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                  )}
                </div>
              </div>
              {formik.values.type === "primary" && (
                <div className="col-span-1 flex items-center gap-2 mt-5">
                  <Checkbox
                    isChecked={formik.values.isB2B}
                    {...formik.getFieldProps("isB2B")}
                  />
                  <p className="text-sm font-medium text-gray-900 dark:text-white-A700">
                    Add to B2B List
                  </p>
                </div>
              )}
              {/* <div className="flex sm:flex-col gap-2">
                <div className="space-y-1 w-full">
                  <FormikInput
                    label="Start Date"
                    type="date"
                    {...formik.getFieldProps("startDate")}
                  />
                  {formik.touched.startDate && formik.errors.startDate && (
                    <Text className="text-red-500" size="s">
                      {formik.errors.startDate}
                    </Text>
                  )}
                </div>
                <div className="space-y-1 w-full">
                  <FormikInput
                    label="End Date"
                    type="date"
                    {...formik.getFieldProps("endDate")}
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <Text className="text-red-500 text-sm">
                      {formik.errors.endDate}
                    </Text>
                  )}
                </div>
              </div> */}

              <button
                type="submit"
                className="w-full text-white-A700 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={isSubmitting}
              >
                {isEditing ? "Save" : "Add"}
              </button>
            </form>
          </div>
          {imageCroppingModal && (
            <CropperModal
              images={selectedImages}
              onClose={handleCrop}
              aspectRatio={16 / 9}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddorEditBanner;

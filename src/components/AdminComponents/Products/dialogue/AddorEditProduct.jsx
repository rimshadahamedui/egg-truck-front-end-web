import React, { useEffect, useRef, useState } from "react";
import { LoaderCircle, Plus, Upload, X } from "lucide-react";
import useOutsideClickAlerter from "../../../../Hooks/OutsideClickAlerter";
import { useFormik } from "formik";
import { productValidation } from "../../../../utils/validations";
import CropperModal from "../../cropper/CropperModal";
import uploadImages from "../../../../utils/api/UploadImages";
import { Text } from "../../../UserComponents/Text";
import axiosInstance from "../../../../utils/api/axiosInstance";
import { ADMIN_URL, MIN_TEXT_AREA_HEIGHT } from "../../../../constants";
import showToast from "../../../../utils/showToast";
import useDynamicTextArea from "../../../../Hooks/useDynamicTextArea";
import { getAllowedImageFormats } from "../../../../utils";
import { FormikInput } from "../../../UserComponents/Input/FormikInput";
import { Checkbox } from "@chakra-ui/react";

const AddorEditProduct = ({
  isEditing = false,
  productData,
  handleNewProduct,
  handleVisibility,
}) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [imageCroppingModal, setImageCroppingModal] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [croppedImages, setCroppedImages] = useState([]);
  const [isUploading, setIsuploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  useOutsideClickAlerter(ref, handleVisibility);

  const formik = useFormik({
    validateOnBlur: false,
    validateOnChange: false,
    initialValues: {
      name: productData?.name || "",
      description: productData?.description || "",
      stock: productData?.stock ?? 30,
      price: productData?.price || 299,
      thumbnail: productData?.thumbnail || "",
      images: productData?.images || [],
      categoryId: productData?.categoryId || "",
      subCategoryId: productData?.subcategoryId || "",
      returnPolicy: productData?.returnPolicy || "",
      isB2B: productData?.isB2B || false,
      email: productData?.email || "",
      whatsApp: productData?.whatsApp || "",
      phone: productData?.phone || "",
    },
    validationSchema: productValidation,
    onSubmit: (values) => {
      setIsSubmitting(true);

      if (isEditing) {
        axiosInstance
          .patch(ADMIN_URL + "/product", {
            productId: productData._id,
            offer: productData.offer,
            actualPrice: productData.actualPrice,
            ...values,
          })
          .then(() => showToast("Product updated successfully"))
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      } else {
        axiosInstance
          .post(ADMIN_URL + "/product", values)
          .then(({ data }) => {
            showToast("Product added successfully");
            handleNewProduct(data?.data);
            handleVisibility();
          })
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      }
    },
  });
  const { textareaRef } = useDynamicTextArea(formik.values.description);

  useEffect(() => {
    axiosInstance
      .get(ADMIN_URL + "/categories")
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((e) => showToast(e.message, "error"));
  }, []);

  useEffect(() => {
    if (isEditing) {
      const { categoryId, subcategoryId, images } = productData;
      const matchedCat = categories.find((cat) => cat._id === categoryId);
      setSubcategories(matchedCat ? matchedCat.subcategories : []);
      formik.setFieldValue("subCategoryId", subcategoryId);
      formik.setFieldValue("images", images);
    }
  }, [productData, categories]);

  function handleCategoryChange(e) {
    const selectedCategoryId = e.target.value;
    formik.setFieldValue("categoryId", selectedCategoryId);

    const matchedCat = categories.find((cat) => cat._id === selectedCategoryId);
    setSubcategories(matchedCat ? matchedCat.subcategories : []);
  }
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    if (imageURLs.length > 5) {
      formik.setFieldError("images", "Maximum 5 images  allowed");
      return;
    }
    formik.setFieldError("images", undefined);
    if (imageURLs.length) {
      setSelectedImages(imageURLs);
      setImageCroppingModal(true);
    }
  };

  const handleCrop = (croppedImages) => {
    setImageCroppingModal(false);
    setCroppedImages(croppedImages);
  };

  const handleMakeThumbnail = (url) => formik.setFieldValue("thumbnail", url);

  const handleUploadImageToCloudinary = async () => {
    setIsuploading(true);
    const urls = await uploadImages(croppedImages);
    const reversedImages = urls.reverse();
    formik.setFieldValue("images", reversedImages);
    handleMakeThumbnail(urls[0]);
    setCroppedImages([]);
    formik.setFieldValue("images", urls);
    setIsuploading(false);
    showToast("Image uploaded successfully");
  };

  const handleCheckbox = (e) => {
    const checkedStatus = e.target.checked;
    if (!checkedStatus) {
      formik.setValues({
        ...formik.values,
        email: "",
        whatsApp: "",
        phone: "",
      });
    }
    formik.setFieldValue("isB2B", checkedStatus);
  };
  return (
    <div
      className="flex bg-gray-500 bg-opacity-50 overflow-y-auto overflow-x-hidden
     fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  h-screen "
    >
      <div className="relative p-4 w-full max-w-xl my-auto">
        <div
          ref={ref}
          className="relative bg-white-A700 rounded-lg shadow dark:text-white-A700
           dark:bg-dark max-h-[600px] px-2 overflow-y-auto"
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white-A700">
              {isEditing ? "Edit" : "Create New"} Product
            </h3>
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={handleVisibility}
            >
              <X />
            </button>
          </div>

          <form className="p-4 md:p-5" onSubmit={formik.handleSubmit}>
            <div className="grid gap-4 mb-4 grid-cols-2">
              <div className="col-span-1 space-y-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-A700"
                >
                  Product Name
                </label>
                <div className="bg-gray-50 dark:bg-gray-600  border dark:border-gray-500 p-2 rounded-md">
                  <input
                    type="text"
                    className=" text-gray-900 text-sm rounded-lg  block w-full p-2.5   dark:placeholder-gray-400 dark:text-white-A700 "
                    placeholder="Type product name"
                    {...formik.getFieldProps("name")}
                  />
                </div>
                {formik.errors.name && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.name}
                  </Text>
                )}
              </div>

              <div className="col-span-1 space-y-2 ">
                <label
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-A700"
                >
                  Price
                </label>
                <div className="bg-gray-50 dark:bg-gray-600  border dark:border-gray-500 p-2 rounded-md">
                  <input
                    type="number"
                    className="bg-gray-50  text-gray-900 text-sm rounded-lg block w-full p-2.5  dark:placeholder-gray-400 dark:text-white-A700 "
                    placeholder="$2999"
                    {...formik.getFieldProps("price")}
                  />
                </div>
                {formik.errors.price && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.price}
                  </Text>
                )}
              </div>
              <div className="col-span-2 space-y-2">
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-A700"
                >
                  Product Description
                </label>
                <textarea
                  ref={textareaRef}
                  style={{
                    minHeight: MIN_TEXT_AREA_HEIGHT,
                    resize: "none",
                  }}
                  className="block p-2.5 w-full text-sm text-gray-900 scrollbar-hide bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white-A700 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write product description here"
                  {...formik.getFieldProps("description")}
                />

                {formik.errors.description && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.description}
                  </Text>
                )}
              </div>
              <div
                className={`space-y-2 ${
                  subcategories.length ? "col-span-1" : "col-span-2"
                }`}
              >
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-A700"
                >
                  Category
                </label>
                <select
                  onChange={handleCategoryChange}
                  value={formik.values.categoryId}
                  className="bg-gray-50 border appearance-none border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white-A700 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                >
                  <option selected defaultValue="">
                    Select category
                  </option>
                  {categories.map((cat) => (
                    <option value={cat._id} key={cat._id}>
                      {cat?.name}
                    </option>
                  ))}
                </select>

                {formik.errors.categoryId && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.categoryId}
                  </Text>
                )}
              </div>
              {subcategories.length ? (
                <div className="col-span-1 space-y-2">
                  <label
                    htmlFor="subcategory"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-A700"
                  >
                    Subcategory
                  </label>
                  <select
                    onChange={(e) =>
                      formik.setFieldValue("subCategoryId", e.target.value)
                    }
                    value={formik.values.subCategoryId}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white-A700 dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  >
                    <option defaultValue="" value="">
                      Select Subcategory
                    </option>
                    {subcategories.map((cat) => (
                      <option value={cat._id} key={cat._id}>
                        {cat?.name}
                      </option>
                    ))}
                  </select>

                  {formik.errors.subCategoryId && (
                    <Text className="text-red-500 " size="s">
                      {formik.errors.subCategoryId}
                    </Text>
                  )}
                </div>
              ) : null}
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
                      multiple
                      onChange={handleImageChange}
                    />
                    <Text className="text-red-500" size="s">
                      {formik.errors.images}
                    </Text>
                  </div>
                  {croppedImages.length ? (
                    <button
                      type="button"
                      onClick={handleUploadImageToCloudinary}
                      className="inline-flex items-center gap-1 font-medium px-4 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white-A700"
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
                  {getAllowedImageFormats()} (MAX. 5){" "}
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
                            className="w-full rounded-md object-contain"
                          />
                        </div>
                      ))}
                    </>
                  ) : null}
                  {formik.values.images.length ? (
                    <>
                      {formik.values.images.map((url, i) => (
                        <div
                          className="relative size-24 rounded-md mt-5 mb-1"
                          key={i}
                        >
                          <img
                            src={url}
                            alt={"Uploaded Image " + i}
                            className="w-full h-full object-cover rounded-md"
                          />

                          <button
                            className={`absolute text-[8px] p-1.5 text-white-A700 rounded-md -top-7 left-0 shadow-md transition ease-in-out ${
                              formik.values.thumbnail === url
                                ? "bg-green-500"
                                : "bg-gray-800 hover:bg-gray-600"
                            }`}
                            onClick={() => handleMakeThumbnail(url)}
                            disabled={formik.values.thumbnail === url}
                          >
                            {formik.values.thumbnail === url
                              ? "Thumbnail Set"
                              : "Make Thumbnail"}
                          </button>
                        </div>
                      ))}
                    </>
                  ) : null}
                </div>
              </div>
              <div className="col-span-1 space-y-2">
                <label
                  htmlFor="stock"
                  className="block  text-sm font-medium text-gray-900 dark:text-white-A700"
                >
                  Stock
                </label>
                <div className="bg-gray-50 dark:bg-gray-600  border dark:border-gray-500 p-2 rounded-md">
                  <input
                    type="number"
                    placeholder="30"
                    className="bg-gray-50  text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600  dark:placeholder-gray-400 dark:text-white-A700 "
                    {...formik.getFieldProps("stock")}
                  />
                </div>
                {formik.errors.stock && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.stock}
                  </Text>
                )}
              </div>
              <div className="col-span-1 flex items-center gap-2 mt-5">
                <Checkbox
                  onChange={handleCheckbox}
                  isChecked={formik.values.isB2B}
                />
                <p className="text-sm font-medium text-gray-900 dark:text-white-A700">
                  Add to B2B List
                </p>
              </div>
              {formik.values.isB2B && (
                <>
                  <div className="col-span-1 sm:col-span-2 space-y-2">
                    <FormikInput
                      label="Contact Mail"
                      type="text"
                      placeholder="john@abccompany.com"
                      {...formik.getFieldProps("email")}
                    />
                    {formik.errors.email && (
                      <Text className="text-red-500" size="s">
                        {formik.errors.email}
                      </Text>
                    )}
                  </div>
                  <div className="col-span-1 sm:col-span-2 space-y-2">
                    <FormikInput
                      label="WhatsApp Number"
                      type="number"
                      placeholder="99999999999"
                      {...formik.getFieldProps("whatsApp")}
                    />
                    {formik.errors.whatsApp && (
                      <Text className="text-red-500" size="s">
                        {formik.errors.whatsApp}
                      </Text>
                    )}
                  </div>
                  <div className="col-span-1 sm:col-span-2 space-y-2">
                    <FormikInput
                      label="Phone Number"
                      type="number"
                      placeholder="99999999999"
                      {...formik.getFieldProps("phone")}
                    />
                    {formik.errors.phone && (
                      <Text className="text-red-500" size="s">
                        {formik.errors.phone}
                      </Text>
                    )}
                  </div>
                </>
              )}
              <div className=" w-full  space-y-2">
                <FormikInput
                  label="Return Policy"
                  placeholder="e.g., 7"
                  // className="outline-none focus:outline-none ring-0 "
                  {...formik.getFieldProps("returnPolicy")}
                />
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Enter the number of days for returns. If no returns are
                  allowed, enter 0.
                </p>
                {formik.errors.returnPolicy && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.returnPolicy}
                  </Text>
                )}
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center text-white-A700 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {!isEditing && <Plus className="size-6 pr-1" />}
              {isEditing ? "Save" : "Add new product"}
            </button>
          </form>
          {imageCroppingModal && (
            <CropperModal images={selectedImages} onClose={handleCrop} />
          )}
        </div>
      </div>
    </div>
  );
};

export default AddorEditProduct;

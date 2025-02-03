import { useRef, useState } from "react";
import useOutsideAlerter from "../../../../Hooks/OutsideClickAlerter";
import { useFormik } from "formik";
import { validateOffer } from "../../../../utils/validations";
import axiosInstance from "../../../../utils/api/axiosInstance";
import { X } from "lucide-react";
import useDisableBodyScroll from "../../../../Hooks/useDisableBodyScroll";
import { Text } from "../../../UserComponents";
import { FormikInput } from "../../../UserComponents/Input/FormikInput";
import useDynamicTextArea from "../../../../Hooks/useDynamicTextArea";
import { ADMIN_URL } from "../../../../constants";
import showToast from "../../../../utils/showToast";
import { isObjectsEqual } from "../../../../utils";

const AddorEditOffer = ({
  isEditing = false,
  offerData,
  handleNewOffer,
  handleUpdatedOffer,
  handlevisibilty,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const formik = useFormik({
    initialValues: {
      offerName: offerData?.offerName || "",
      offerCode: offerData?.offerCode || "",
      description: offerData?.description || "",
      startDate: offerData?.startDate || "",
      endDate: offerData?.endDate || "",
      discountValue: offerData?.discountValue || "",
      discountType: "percentage",
      minOrderValue: offerData?.minOrderValue || "",
    },
    validationSchema: validateOffer,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      if (isEditing) {
        axiosInstance
          .patch(ADMIN_URL + `/offer/${offerData._id}`, values)
          .then(({ data }) => {
            handleUpdatedOffer(data.data);
            handlevisibilty();
            showToast("Offer updated successfully");
          })
          .catch((err) => console.log(err));
      } else {
        axiosInstance
          .post(ADMIN_URL + "/offer", values)
          .then(({ data }) => {
            handleNewOffer(data.data);
            handlevisibilty();
            showToast("Offer added successfully");
          })
          .catch((err) => console.log(err))
          .finally(() => setIsSubmitting(false));
      }
    },
  });
  const { textareaRef } = useDynamicTextArea(formik.values.description);
  useDisableBodyScroll(true);
  useOutsideAlerter(ref, handlevisibilty);
  return (
    <div className="flex h-full bg-gray-500 bg-opacity-50 overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  max-h-full">
      <div className="relative p-4 w-full max-w-md my-auto">
        <div
          className="relative bg-white-A700 rounded-lg shadow  dark:bg-dark max-h-[580px] px-2  overflow-y-auto scrollbar-hide"
          ref={ref}
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white-A700">
              {isEditing ? "Edit" : "Add"} Offer
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
              <div className=" flex sm:flex-col gap-2">
                <div className="space-y-1 w-full">
                  <FormikInput
                    label="Offer Name"
                    type="text"
                    placeholder="Example"
                    {...formik.getFieldProps("offerName")}
                  />
                  {formik.touched.offerName && formik.errors.offerName && (
                    <Text className="text-red-500" size="s">
                      {formik.errors.offerName}
                    </Text>
                  )}
                </div>

                <div className="space-y-1  w-full">
                  <FormikInput
                    label="Offer Code"
                    type="text"
                    placeholder="Example"
                    name="offerCode"
                    value={formik.values.offerCode}
                    onChange={(e) => {
                      const { value } = e.target;
                      formik.setFieldValue("offerCode", value.toUpperCase());
                    }}
                  />
                  {formik.touched.offerCode && formik.errors.offerCode && (
                    <Text className="text-red-500" size="s">
                      {formik.errors.offerCode}
                    </Text>
                  )}
                </div>
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
              <div className=" flex sm:flex-col gap-2">
                <div className="space-y-1  w-full">
                  <FormikInput
                    label="Discount Percentage"
                    type="number"
                    placeholder="eg: 10"
                    {...formik.getFieldProps("discountValue")}
                  />
                  {formik.touched.discountValue &&
                    formik.errors.discountValue && (
                      <Text className="text-red-500" size="s">
                        {formik.errors.discountValue}
                      </Text>
                    )}
                </div>
                <div className="space-y-1 w-full">
                  <FormikInput
                    label="Eligible for Offer Above"
                    type="number"
                    placeholder="eg: $1000"
                    {...formik.getFieldProps("minOrderValue")}
                  />
                  {formik.touched.minOrderValue &&
                    formik.errors.minOrderValue && (
                      <Text className="text-red-500" size="s">
                        {formik.errors.minOrderValue}
                      </Text>
                    )}
                </div>
              </div>
              <div className="flex sm:flex-col gap-2">
                <div className="space-y-1 w-full">
                  <FormikInput
                    label="Start Date"
                    type="date"
                    {...formik.getFieldProps("startDate")}
                    onChange={(e) =>
                      formik.setFieldValue("startDate", e.target.value)
                    }
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
                    onChange={(e) =>
                      formik.setFieldValue("endDate", e.target.value)
                    }
                  />
                  {formik.touched.endDate && formik.errors.endDate && (
                    <Text className="text-red-500 text-sm">
                      {formik.errors.endDate}
                    </Text>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full text-white-A700 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center disabled:opacity-50 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                disabled={isSubmitting}
              >
                {isEditing ? "Save" : "Add"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddorEditOffer;

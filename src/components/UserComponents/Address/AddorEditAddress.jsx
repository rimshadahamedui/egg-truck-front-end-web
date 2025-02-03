import { useFormik } from "formik";
import { USER_URL } from "../../../constants";
import { useRef, useState } from "react";
import axiosInstance from "../../../utils/api/axiosInstance";
import { Plus, X } from "lucide-react";
import showToast from "../../../utils/showToast";
import useOutsideAlerter from "../../../Hooks/OutsideClickAlerter";
import { Text } from "../Text";
import { validateAddress } from "../../../utils/validations";

const AddorEditAddress = ({
  isEditing = false,
  addressData,
  handleAddAddress,
  handleUpdatedAddress,
  handleVisibility,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedValue, setSelectedValue] = useState(addressData?.name || "");
  const ref = useRef(null);

  const formik = useFormik({
    initialValues: {
      name: addressData?.name || "",
      address: addressData?.address || "",
      phone: addressData?.phone || "",
      pin: addressData?.pin || "",
    },
    validationSchema: validateAddress,
    onSubmit: (values) => {
      setIsSubmitting(true);
      if (isEditing) {
        axiosInstance
          .patch(USER_URL + `/address/${addressData?._id}`, values)
          .then(() => {
            showToast("Address updated successfully");
            handleUpdatedAddress({ ...addressData, ...values });
            handleVisibility();
          })
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      } else {
        axiosInstance
          .post(USER_URL + "/address", values)
          .then(({ data }) => {
            showToast("Address added successfully");
            handleAddAddress(data);
            handleVisibility();
          })
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      }
    },
  });
  const handleRadioChange = (value) => {
    setSelectedValue(value);
    if (value === "custom") {
      formik.setFieldValue("name", "");
      return;
    }
    formik.setFieldValue("name", value);
  };
  useOutsideAlerter(ref, handleVisibility);

  return (
    <div className="flex bg-gray-500 bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0  h-screen">
      <div className="relative p-4 w-full max-w-xl max-h-xl ">
        <div
          ref={ref}
          className="relative bg-white-A700 rounded-xl shadow  dark:bg-gray-700 max-h-[600px] px-2 overflow-y-auto"
        >
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {isEditing ? "Edit" : "Add New"} Address
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
              <div className="col-span-2 sm:col-span-2 space-y-2">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Name
                </label>
                {/* <RadioGroup
                  className="flex"
                  selectedValue={selectedValue}
                  onChange={handleRadioChange}
                >
                  <Radio
                    value="home"
                    label="Home"
                    className=" flex-1 gap-3 p-px text-sm text-blue_gray-700"
                  />
                  <Radio
                    value="work"
                    label="Work"
                    className=" flex-1 gap-3 p-px text-sm text-blue_gray-700"
                  />
                  <Radio
                    value="custom"
                    label="Custom"
                    className=" flex-1 gap-3 p-px text-sm text-blue_gray-700"
                  />
                </RadioGroup>
                {selectedValue === "custom" && ( */}
                <div className=" border border-gray-300 p-1.5 rounded-md ">
                  <input
                    type="text"
                    className=" text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Your name"
                    {...formik.getFieldProps("name")}
                  />
                </div>
                {/* )} */}
                {formik.touched.name && formik.errors.name && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.name}
                  </Text>
                )}
              </div>

              <div className="col-span-2 space-y-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <textarea
                  rows="2"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Write your address here"
                  {...formik.getFieldProps("address")}
                ></textarea>

                {formik.touched.address && formik.errors.address && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.address}
                  </Text>
                )}
              </div>

              <div className="col-span-1 space-y-2">
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phone
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="9999999999"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.phone}
                  </Text>
                )}
              </div>
              <div className="col-span-1 space-y-2">
                <label
                  htmlFor="pin"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Pincode
                </label>
                <input
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                  placeholder="999999"
                  {...formik.getFieldProps("pin")}
                />
                {formik.touched.pin && formik.errors.pin && (
                  <Text className="text-red-500" size="s">
                    {formik.errors.pin}
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
              {isEditing ? "Save" : "Add new address"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddorEditAddress;

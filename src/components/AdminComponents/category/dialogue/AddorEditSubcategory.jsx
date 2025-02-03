import { useRef, useState } from "react";
import useOutsideAlerter from "../../../../Hooks/OutsideClickAlerter";
import { useFormik } from "formik";
import { subCategoryValidation } from "../../../../utils/validations";
import axiosInstance from "../../../../utils/api/axiosInstance";
import { X } from "lucide-react";
import { ADMIN_URL } from "../../../../constants";
import showToast from "../../../../utils/showToast";
import { Text } from "../../../UserComponents/Text";
const AddorEditSubcategory = ({
  isEditing = false,
  parentCategoryData,
  subCategoryData,
  handlevisibilty,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const ref = useRef(null);
  const formik = useFormik({
    initialValues: {
      name: subCategoryData?.name || "",
      categoryId: subCategoryData?.categoryId || "",
    },
    validationSchema: subCategoryValidation,
    onSubmit: async ({ name, categoryId }) => {
      setIsSubmitting(true);
      if (isEditing) {
        // if the subcategory data is same no api call will be made.
        if (
          name === subCategoryData?.name &&
          categoryId === subCategoryData?.categoryId
        ) {
          handlevisibilty();
          return;
        }
        axiosInstance
          .patch(ADMIN_URL + "/subcategory", {
            name,
            subCategoryId: subCategoryData?._id,
          })
          .then(() => {
            showToast("Subcategory updated successfully");
            handlevisibilty();
          })
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      } else {
        axiosInstance
          .post(ADMIN_URL + "/subcategory", { name, categoryId })
          .then(() => {
            showToast("Subcategory added successfully");
            handlevisibilty();
          })
          .catch(({ response }) => showToast(response.data.message, "error"))
          .finally(() => setIsSubmitting(false));
      }
    },
  });

  useOutsideAlerter(ref, handlevisibilty);

  return (
    <div className="flex bg-gray-500 bg-opacity-50 overflow-x-hidden fixed top-3 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full" ref={ref}>
        <div className="relative bg-white-A700 rounded-lg shadow  dark:bg-dark">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white-A700">
              {isEditing ? "Edit" : "Add"} SubCategory
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
                  Name
                </label>
                <div className="bg-gray-50 dark:bg-gray-600  border dark:border-gray-500 px-1 rounded-md">
                  <input
                    type="text"
                    className="bg-gray-50  text-gray-900 text-sm rounded-xl h-10 block w-full p-2.5 dark:bg-gray-600  dark:placeholder-gray-400 dark:text-white-A700 "
                    placeholder="Example"
                    {...formik.getFieldProps("name")}
                  />
                </div>
                {formik.touched.name && formik.errors.name && (
                  <Text className="text-red-500">{formik.errors.name}</Text>
                )}
              </div>
              {!isEditing && (
                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white-A700"
                  >
                    Category name
                  </label>
                  <select
                    onChange={(e) =>
                      formik.setFieldValue("categoryId", e.target.value)
                    }
                    value={formik.values.categoryId}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block h-10 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white-A700 "
                  >
                    <option value="" selected>
                      Choose a category
                    </option>
                    {parentCategoryData.map(({ _id, name }) => (
                      <option value={_id} key={_id}>
                        {name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.categoryId && formik.errors.categoryId && (
                    <p className="text-red-500 ">{formik.errors.categoryId}</p>
                  )}
                </div>
              )}
              <button
                type="submit"
                className="w-full text-white-A700 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default AddorEditSubcategory;

import { useRef, useState } from "react";
import useOutsideAlerter from "../../../Hooks/OutsideClickAlerter";
import { useFormik } from "formik";
import { blockUser } from "../../../utils/api/admin";
import { X } from "lucide-react";
import showToast from "../../../utils/showToast";
import * as Yup from "yup";
import { Text } from "../../UserComponents/Text";
const BlockModal = ({ user, handlevisibilty }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formik = useFormik({
    initialValues: {
      reason: "",
    },
    validationSchema: Yup.object({
      reason: Yup.string()
        .min(10, "Atleast 10 characters is required")
        .required("Reason is required"),
    }),
    onSubmit: async ({ reason }) => {
      setIsSubmitting(true);

      blockUser(user?._id, reason)
        .then(() => handlevisibilty())
        .catch((e) => showToast(e.message, "error"))
        .finally(() => setIsSubmitting(false));
    },
  });
  const ref = useRef(null);
  useOutsideAlerter(ref, handlevisibilty);

  return (
    <div className="flex bg-gray-500 bg-opacity-50 overflow-x-hidden fixed top-3 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full" ref={ref}>
        <div className="relative bg-white-A700 rounded-lg shadow  dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Block User
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
          <h3 className="text-[15px] leading-4 text-red-300 font-poppins mt-2 pl-2">
            You are about to block {user.name}
          </h3>
          <div className="p-4 md:p-5">
            <form className="space-y-4" onSubmit={formik.handleSubmit}>
              <div className="space-y-1">
                <label
                  htmlFor="reason"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Leave a reason
                </label>
                <div className="border p-1 rounded-md">
                  <input
                    type="text"
                    className="bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-xl h-10 block w-full p-2.5  dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white "
                    placeholder="Example"
                    {...formik.getFieldProps("reason")}
                  />
                </div>
                {formik.touched.reason && formik.errors.reason && (
                  <Text className="text-red-500 text-sm">
                    {formik.errors.reason}
                  </Text>
                )}
              </div>

              <button
                type="submit"
                className="w-full  text-white-A700 bg-red-400 hover:bg-red-500 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlockModal;

import { Pencil, X } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import useOutsideAlerter from "../../../Hooks/OutsideClickAlerter";
import axiosInstance from "../../../utils/api/axiosInstance";
import showToast from "../../../utils/showToast";
import { ADMIN_URL } from "../../../constants";

const SubCategoryList = ({
  parentCategory,
  handleSubCategoryEdit,
  handlevisibilty,
}) => {
  const [subCategories, setSubCategories] = useState([]);
  const ref = useRef(null);
  useEffect(() => {
    axiosInstance
      .get(ADMIN_URL + "/categories")
      .then(({ data }) => {
        const matchedCategory = data.data.find(
          (category) => category?._id === parentCategory?._id
        );
        setSubCategories(matchedCategory.subcategories);
      })
      .catch(({ response }) => showToast(response.data.message, "error"));
  }, []);
  useOutsideAlerter(ref, handlevisibilty);
  return (
    <div className="flex overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="relative p-4 w-full max-w-md max-h-full" ref={ref}>
        <div className="relative bg-white-A700 rounded-lg shadow  dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {parentCategory?.name} - SubCategories
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
          <div className="p-4 md:p-5 h-72 overflow-y-auto">
            {subCategories.length ? (
              <>
                {subCategories.map(({ _id, name }, i) => (
                  <div
                    className="flex items-start justify-between space-y-2"
                    key={_id}
                  >
                    <p className="text-sm font-normal">{i + 1}.</p>
                    <p className="text-sm font-medium">{name}</p>

                    <button
                      type="button"
                      onClick={() =>
                        handleSubCategoryEdit(_id, name, parentCategory?._id)
                      }
                      className="inline-flex items-center py-2 px-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md shadow hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                    >
                      <Pencil className="size-5 pr-1" /> Edit
                    </button>
                  </div>
                ))}
              </>
            ) : (
              <h1>No subcategories.</h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubCategoryList;

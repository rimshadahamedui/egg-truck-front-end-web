import React, { useEffect, useRef, useState } from "react";
import useDisableBodyScroll from "../../../Hooks/useDisableBodyScroll";
import useOutsideAlerter from "../../../Hooks/OutsideClickAlerter";
import { ChevronRight } from "lucide-react";
import { getCategories } from "../../../utils/api/products";
import { Link, useNavigate } from "react-router-dom";
const CategoryMenu = ({ handleVisibility }) => {
  const [categories, setCategories] = useState([]);
  const [activeParentCategory, setActiveParentCategory] = useState(null);
  const [activeCategorySubcategories, setActiveCategorySubcategories] =
    useState([]);
  const navigate = useNavigate();
  const ref = useRef(null);
  useEffect(() => {
    getCategories()
      .then(({ data }) => setCategories(data))
      .catch((e) => console.log(e));
  }, []);
  useDisableBodyScroll(true);
  useOutsideAlerter(ref, handleVisibility);

  const handleSelectCategory = (category) => {
    setActiveParentCategory(category.name);
    setActiveCategorySubcategories(category?.subcategories);
  };
  const handleCategoryClick = (e, isParentCategory = true) => {
    if (e.target.tagName !== "LI") return;
    const { innerText } = e.target;
    if (isParentCategory) {
      navigate(`/shop?q=&category[0]=${innerText}`, { replace: true });
      handleVisibility();
      return;
    }

    navigate(
      `/shop?q=&category[0]=${activeParentCategory}&subcategory[0]=${innerText}`,
      { replace: true }
    );
    handleVisibility();
  };
  return (
    <div
      className="absolute sm:hidden mt-4 z-50 top-10 left-0  md:-left-44"
      ref={ref}
    >
      <div
        className={`relative flex bg-white-A700 shadow-lg rounded-lg ring-1 ring-black ring-opacity-5
        ${activeCategorySubcategories.length ? "w-[450px]" : "w-[225px]"} h-80`}
      >
        {/* Main Category List */}
        <div
          className={`${
            activeCategorySubcategories.length ? "w-1/2" : "w-full"
          }`}
        >
          <h3 className="text-md font-semibold px-4 py-2 text-gray-800 border-b border-gray-200 mt-2">
            Shop by Category
          </h3>
          <ul
            className={`py-4 border-r border-gray-200
           h-full overflow-y-auto scrollbar-width-small`}
            onClick={(e) => handleCategoryClick(e)}
          >
            {categories.length ? (
              categories.map((cat) => (
                <li
                  key={cat._id}
                  className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onMouseEnter={() => handleSelectCategory(cat)}
                >
                  {cat.name}
                  <ChevronRight className="text-gray-500 size-5" />
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-sm text-gray-500">No categories</li>
            )}
          </ul>
        </div>

        {/* Subcategory Container */}
        <div
          className={`${
            activeCategorySubcategories.length ? "block" : "hidden"
          }  py-2 mt-1 bg-white-A700 rounded-lg  w-1/2`}
        >
          <h3 className="text-sm  font-semibold px-4 py-2 text-gray-800 border-b border-gray-200 ">
            Subcategories
          </h3>
          <ul className="p-0" onClick={(e) => handleCategoryClick(e, false)}>
            {activeCategorySubcategories.map((subcat) => (
              <li
                className=" w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                key={subcat._id}
              >
                {subcat.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;

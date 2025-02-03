import React, { useEffect, useRef, useState } from "react";
import useOutsideAlerter from "../../../Hooks/OutsideClickAlerter";
import { getCategories } from "../../../utils/api/products";
import { Link, useNavigate } from "react-router-dom";
import BrandList from "../brandList";
import BrandListBoxed from "../brandListBoxed";
const CategoryStrip = ({ handleVisibility }) => {
  const [categories, setCategories] = useState([]);

  const [visibility, setVisibility] = useState(false);
  const [visibilityAll, setVisibilityAll] = useState(false);
  const [openMenu , setOpenMenu] = useState(false);


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

  useOutsideAlerter(ref, handleVisibility);



  const handleSelectCategory = (category) => {
    setActiveParentCategory(category?.name);
    setActiveCategorySubcategories(category?.subcategories);
    setOpenMenu(true);
    setVisibility(true);
    setVisibilityAll(false);
  };

  const handleSelectCategoryFromAll = (category) => {
    setActiveParentCategory(category?.name);
    setActiveCategorySubcategories(category?.subcategories);
    setVisibility(true);
  };

  const hideAll = () =>{
    setOpenMenu(false);
  }
  const openAllCat= () => {
    setOpenMenu(true);
    setVisibilityAll(true);
    setVisibility(true);
  }

  const handleCategoryClick = (e, isParentCategory = true) => {
    if (e.target.tagName !== "LI") return;
    const { innerText } = e.target;
    if (isParentCategory) {
      navigate(`/shop?q=&category[0]=${innerText}`, { replace: true });
      return;
    }

    hideAll()

    navigate(
      `/shop?q=&category[0]=${activeParentCategory}&subcategory[0]=${innerText}`,
      { replace: true }
    );
  };
  return (
    
    <div className="category-strip border-b-2" onMouseLeave={() => hideAll()}>
      <div className="container mx-auto">
        <div className="flex md:w-full md-overflow-auto overflow-auto scrollbar-hide">
        <div className="flex items-center justify-between text-nowrap font-bold text-lg md:text-xs py-2 w-64 text-gray-700 px-5 hover:bg-gray-100 cursor-pointer"
         onMouseEnter={() => openAllCat()} key={111}>
          All Categories
         </div>
         <div className="h-[44px] md:h-[30px] w-px bg-gray-200"  />
            {categories.length ? (
              categories.slice(5,15).map((cat) => (
                <div
                  key={cat._id}
                  className="flex items-center text-nowrap justify-between px-4 font-bold text-lg py-2 md:text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                  onMouseEnter={() => handleSelectCategory(cat)} onClick={(e) => handleCategoryClick(e , true)} 
                >
                  {cat.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm md:text-xs text-gray-500">No categories</div>
            )}
            </div>
      </div>



      <div className={`${ openMenu ? "block" : "hidden"}  py-2 mt- bg-white-A700 rounded-lg  w-full position-over shadow-lg` } onMouseLeave={() => hideAll()}>
        <div className="container flex mx-auto">
        
          <ul className={`${ visibilityAll ? "block" : "hidden"} p-0  w-64`} >
            {categories.length ? (
              categories.map((cat) => (
                <li className=" px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" key={cat._id} 
                onMouseEnter={() => handleSelectCategoryFromAll(cat)}
                onClick={(e) => handleCategoryClick(e , true)}>{cat.name}</li>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No categories</div>
            )}
          </ul>

          <ul className={`${ visibility ? "block" : "hidden"} p-0 w-64`} onClick={(e) => handleCategoryClick(e, false)} >
            {activeCategorySubcategories.map((subcat) => (
              <li className="  px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                key={subcat._id}
              >
                {subcat.name}
              </li>
            ))}
          </ul>

          <BrandListBoxed/>
          </div>
        </div>





      </div>
  );
};

export default CategoryStrip;

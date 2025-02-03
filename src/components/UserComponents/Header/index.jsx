import React, { useRef, useState } from "react";
import { Text, Img } from "./..";
import { useNavigate } from "react-router-dom";
import ToggleSwitch from "../ToggleSwitch";
import useOutsideAlerter from "../../../Hooks/OutsideClickAlerter";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../utils";
import CategoryMenu from "./CategoryMenu";
import showToast from "../../../utils/showToast";
import "instantsearch.css/themes/satellite.css";
import SearchBox from "./SearchBox";
import { toggleUserType } from "../../../redux/slices/UserSlice";
import { useSearchBox } from "react-instantsearch";
import CategoryStrip from "./CategoryStrip";
import { AlignJustify, Heart, LogOut, ShoppingCart, User, X } from "lucide-react";

export default function Header({ ...props }) {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);
  const { refine } = useSearchBox();
  useOutsideAlerter(dropdownRef, () => setIsDropdownVisible(false));

  const toggleMode = () => {
    const B2BStatus = !user?.isB2B;
    dispatch(toggleUserType(B2BStatus));
    if (B2BStatus) {
      document.body.style.opacity = 0.5;
      setTimeout(() => {
        document.body.style.opacity = 1;
      }, 1000);
    }
    refine("");
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const handleLogout = () => {
    logout();
    navigate("/");
    showToast("Logged out successfully");
  };

  return (
      <header {...props}>
        <div className="bg-thdark text-slate-100 w-full fixed top-0 z-50">
          <div className="lg:mx-10 mx-2">
            <div className="lg:flex lg:py-5 py-2 ">
              <div className="">
                <h1 className="lg:text-2xl text-sm font-bold self-center">Let us build the perfect e-commerce solution for your brand. Reach out today!</h1>
                <p className="lg:text-lg text-xs font-light">Looking to integrate this page for better engagement? We can set it up in no time.</p>
              </div>
              <p className="self-center ms-auto lg:text-lg text-xs lg:my-3 mt-3">Email Us : ecom@elitedigitals.com </p>
            </div>
          </div>



        </div>
        <div  className={`${props.className} flex  justify-center items-center border-gray-200 border-b border-solid bg-white-A700 mt-[96px] md:mt-[115px]` }>
          <div className="w-full md:flex-wrap flex items-center justify-between gap-3 md:py-2 md:px-4 px-10">
            <div className="flex gap-2 items-center order-1">
              <Img src="/images/logo-elite.png" alt="elite-digital" className="h-[100px] w-[250px] object-contain cursor-pointer md:hidden" onClick={() => navigate("/", { replace: true })} />
              <Img src="/images/elite-ico-mobile.svg" alt="elite-digital" className="h-[70px] w-[70px] object-contain cursor-pointer md:block hidden p-3" onClick={() => navigate("/", { replace: true })} />
            </div>

            <SearchBox   />
            {/* <div div className="flex items-center">
          <span className="mr-2">{isB2B ? "B2B" : "B2C"}</span>
          <ToggleSwitch isOn={isB2B} handleToggle={toggleMode} />
        </div> */}
            <div className="flex order-3 md:order-3 md:w-full">
              <a href="/ai" className="md:font-sm md:text-center bg-gradient-to-r md:w-[50%] from-thdark to-thlight text-slate-50 border-[2px] border-thlight px-6 py-2 font-medium rounded-2xl text-nowrap cursor-pointer">Ai Features</a>

              <a href="/ourecosystem" className="md:font-sm md:text-center ms-2 md:w-[50%] bg-slate-50 border-thdark border-[2px] hover:text-thlight hover:border-thlight text-thdark px-6 py-2 font-medium rounded-2xl text-nowrap cursor-pointer">Our Ecosystem</a>
            </div>


            <div className="order-4 md:order-2 flex items-center justify-end gap-[22px]">
              {user?.isAuthenticated ? (
                  <>
                    <div className="relative">

                      <User  className="h-[24px] w-[24px] self-center cursor-pointer" onClick={toggleDropdown} />


                      {isDropdownVisible && (
                          <div
                              ref={dropdownRef}
                              className="absolute top-10 right-0  mt-2 w-48 bg-white-A700 border border-gray-200 rounded-md shadow-lg z-50"
                          >
                            <ul className="py-1">
                              <li className="block px-4 py-2 text-gray-800 hover:bg-gray-100 break-words border-b">
                                Hey, {user?.name || "User"}
                              </li>
                              <li>
                                <Link
                                    to="/profile"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                  Account
                                </Link>
                              </li>
                              <li>
                                <Link
                                    to="/wishlist"
                                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                >
                                  Wishlist
                                </Link>
                              </li>

                              <li>
                                <button
                                    to="/addresses"
                                    className="inline-flex w-full items-center gap-2 px-4 py-2 text-gray-800 hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                  Logout <LogOut className="size-4 text-red-500" />
                                </button>
                              </li>
                            </ul>
                          </div>
                      )}
                    </div>

                    <a onClick={(e) => { e.preventDefault(); navigate("/wishlist");}} className="relative">
                      <Heart className="m-auto h-[24px] w-[24px] cursor-pointer" />
                    </a>


                    <a onClick={(e) => { e.preventDefault(); navigate("/cart");}} className="relative">
                      <ShoppingCart src="/images/cart.svg" className="m-auto h-[24px] w-[24px] cursor-pointer"/>
                      <Text size="xs" as="p" className="absolute -top-2 -right-2  m-auto flex h-[20px] w-[20px] items-center justify-center rounded-[10px] bg-light_blue-600 text-center !text-white-A700">
                        {cart?.length}
                      </Text>
                    </a>



                  </>
              ) : (
                  <button
                      onClick={() => navigate("/login")}
                      className="bg-thdark hover:bg-thlight text-white-A700 px-6 py-2 font-medium rounded-2xl "
                  >
                    Login
                  </button>
              )}
            </div>
          </div>

        </div>
        <CategoryStrip/>
      </header>
  );
}

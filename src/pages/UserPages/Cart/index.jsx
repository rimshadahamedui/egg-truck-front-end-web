import React, { useEffect, useMemo } from "react";
import Header from "../../../components/UserComponents/Header";
import Footer from "../../../components/UserComponents/Footer";
import { Heading, Text } from "../../../components/UserComponents";
import CheckoutProduct from "../../../components/UserComponents/CheckoutProduct";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import showToast from "../../../utils/showToast";
import {loadCartFromServer, removeFromCart,} from "../../../redux/slices/CartSlice";

import { removeItemFromCart } from "../../../utils/api/cart";
import {ChevronLeft, ShoppingCart} from "lucide-react";
import {Input} from "../../../components/UserComponents/Input";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);

  const orderTotal = useMemo(() => {
    return cart.reduce((acc, curr) => {
      const subTotal = curr.price * curr.quantity;
      return acc + subTotal;
    }, 0);
  }, [cart]);

  const isEveryProductStockAvailable = useMemo(
    () => cart.every((item) => item.quantity < item.stock),
    [cart]
  );
  const handleRemoveFromCart = (_id) => {
    removeItemFromCart(_id)
      .then(() => {
        showToast("Product removed from cart successfully");
        dispatch(removeFromCart({ _id }));
      })
      .catch((e) => showToast(e.message, "error"));
  };

  const handleCheckout = () => {
    if (!isEveryProductStockAvailable) {
      showToast(
        "Please remove the out of stock item before checkout to proceed",
        "dark"
      );
      return;
    }
    navigate("/checkout");
  };
  return (
    <>
      <Header />

      {/* order summary section */}
      <div className="container mx-auto mb-40">


        <nav className="flex items-center text-sm my-6">
          <a href="/" className="text-gray-500 hover:text-gray-700">
            Home
          </a>
          <ChevronLeft className="mx-2 h-4 w-4 text-gray-400" />
          <span className="text-gray-900 font-medium">Cart</span>
        </nav>


        <Heading size="lg" as="h4" className="my-10">
          Your Cart
        </Heading>



        {cart.length === 0 && (
            <div className="text-center py-12">
              <ShoppingCart className="mx-auto h-16 w-16 text-gray-300 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Your shopping cart looks empty
              </h2>
              <p className="text-gray-500 mb-4">
                Looks like you haven't added anything yet! Browse our unique collection now.
              </p>
              <button
                  className=" bg-thdark text-white-A700 px-6 mt-4 rounded-[26px] h-[52px]  py-2 font-medium sm:px-5 cursor-pointer"
                  onClick={() => navigate("/shop")}
              >
                Continue shopping
              </button>
            </div>
        )}




        {cart.length > 0 && (
            <div className="grid grid-cols-3 md:grid-cols-1 gap-5">
              <div className="col-span-2">
                <div className="border border-solid rounded-[16px] border-gray-200">
                  {cart.length ? (
                      <>
                        {cart.map((item) => (
                            <CheckoutProduct {...item} className="flex-1" key={item._id} handleRemoveFromCart={handleRemoveFromCart} />
                        ))}
                      </>
                  ) : null}
                </div>
              </div>


              <div className="">

                <div className="border border-solid rounded-[16px] border-gray-200 p-8 mb-4">
                  <h4 className="thdark text-xl font-bold mb-10">Order Summary</h4>

                  <label for="search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                  <div className="relative">
                    <Input type="search" id="search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Coupon Code" />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2 bg-thlight  text-white-A700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">Apply</button>
                  </div>

                  <div className="grid grid-cols-2 gap-5 mt-6">
                    <h6 className="text-sm">Subtotal ({cart.length} item)</h6>
                    <h6 className="text-md font-bold text-right">${orderTotal.toFixed(2)}</h6>

                    <h6 className="text-sm">Estimated shipping</h6>
                    <h6 className="text-md font-bold text-right">${(5).toFixed(2)}</h6>

                    <div className="flex col-span-2 gap-3">
                      <div className="flex items-center grow ps-4 border border-gray-200  dark:border-gray-700">
                        <input checked id="bordered-radio-2" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="bordered-radio-2" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Standard</label>
                      </div>
                      <div className="flex items-center grow ps-4 border border-gray-200  dark:border-gray-700">
                        <input id="bordered-radio-1" type="radio" value="" name="bordered-radio" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="bordered-radio-1" className="w-full py-4 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Express</label>
                      </div>
                    </div>

                    <h5 className="text-2xl font-bold">Total</h5>
                    <h5 className="text-2xl font-bold text-right">${(orderTotal + 5).toFixed(2) }</h5>
                  </div>
                  <button class=" bg-thdark h-[52px] text-white-A700 px-8 rounded-[26px] py-2 w-full  mt-6 font-medium sm:px-5 cursor-pointer" onClick={handleCheckout}>Checkout</button>
                </div>


                <div className="border border-solid rounded-[16px] border-gray-200 p-8 mt-8">
                  <h4 className="thdark text-xl font-bold">Estimate Shipping And Tax</h4>
                  <p className="mt-3 text-sm">Enter your destination to get a shipping estimate.</p>

                  <div>
                    <label for="countries" class="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white">* Country</label>
                    <select id="countries" class="h-[52px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>United Arab Emirates</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                      <option value="FR">France</option>
                      <option value="DE">Germany</option>
                    </select>
                  </div>


                  <div>
                    <label for="region" class="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white">* Region / State</label>
                    <select id="region" class="h-[52px] bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                      <option selected>Dubai</option>
                      <option value="US">Abu dhabi</option>
                      <option value="CA">Sharja</option>
                      <option value="FR">Fujaira</option>
                    </select>
                  </div>


                  <div>
                    <label for="zip" class="block mb-2 mt-6 text-sm font-medium text-gray-900 dark:text-white">* Zip/Postal Code</label>
                    <Input type="text" id="zip" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" / >
                  </div>
                  <button class=" bg-thlight h-[52px] w-full text-white-A700 px-8 rounded-[26px] py-2  mt-6 font-medium sm:px-5 cursor-pointer">Get A Quote</button>
                </div>
              </div>





            </div>

        )}



      </div>
      <Footer />
    </>
  );
}

export default Cart;

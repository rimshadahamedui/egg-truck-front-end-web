import React, { useEffect, useMemo, useRef, useState } from "react";
import { Helmet } from "react-helmet";
import { Button, Heading, Text } from "../../../components/UserComponents";
import CheckoutProduct from "../../../components/UserComponents/CheckoutProduct";
import Footer from "../../../components/UserComponents/Footer";
import Header from "../../../components/UserComponents/Header";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  GST_IN_PERCENTAGE,
  SHIPPING_CHARGE,
  USER_URL,
} from "../../../constants";
import { ChevronDown, ChevronLeft, Truck ,MapPin } from "lucide-react";
import { getAddresses } from "../../../utils/api/address";
import { RadioGroup } from "../../../components/UserComponents/RadioGroup";
import { Radio } from "../../../components/UserComponents/Radio";
import axiosInstance from "../../../utils/api/axiosInstance";
import showToast from "../../../utils/showToast";
import { PayPalButtons } from "@paypal/react-paypal-js";

export default function CheckoutPage() {
  const [address, setAddress] = useState([]);
  const [visibleAddresses, setVisibleAddresses] = useState([]);
  const [showMoreOption, setShowMoreOption] = useState(false);
  const [orderPayload, setOrderPayload] = useState({
    addressId: null,
    paymentMethod: null,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const orderRef = useRef(null);

  // const [{ isPending }] = usePayPalScriptReducer();
  const { cart } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [subTotal, orderTotal] = useMemo(() => {
    const total = cart.reduce(
        (acc, curr) => acc + curr.price * curr.quantity,
        0
    );
    let amountToPay = total + Math.ceil((total * GST_IN_PERCENTAGE) / 100);
    amountToPay += SHIPPING_CHARGE;
    return [total, amountToPay];
  }, [cart]);

  useEffect(() => {
    if (!cart.length) navigate("/cart");
  }, [cart]);

  useEffect(() => {
    async function fetchAddress() {
      const addresses = await getAddresses();
      setAddress(addresses);
      setVisibleAddresses(addresses.slice(0, 2));
      setShowMoreOption(addresses.length > 2);
    }
    fetchAddress();
  }, []);

  const isEveryProductStockAvailable = useMemo(
      () => cart.every((item) => item.quantity < item.stock),
      [cart]
  );

  const handleShowMoreAddress = () => {
    setVisibleAddresses(address);
    setShowMoreOption(false);
  };
  const handleAddressSelection = (addressId) =>
      setOrderPayload((prev) => ({ ...prev, addressId }));

  const handlePaymentMethod = (paymentMethod) =>
      setOrderPayload((prev) => ({ ...prev, paymentMethod }));

  const handlePlaceOrder = async (isOnlinePayment = false, paymentMethod) => {
    try {
      if (!isEveryProductStockAvailable) {
        showToast("Please remove the out of stock item to proceed", "dark");
        return;
      }
      setIsSubmitting(true);
      const { data } = await axiosInstance.post(
          USER_URL + "/order",
          isOnlinePayment ? { ...orderPayload, paymentMethod } : orderPayload
      );

      const { payment, orderData } = data.data;
      console.log(payment, orderData);
      if (orderData.isCOD) {
        navigate(
            "/order-confirmation" + `/${orderData?._id}?isCod=true&success=true`
        );
        return;
      }
      if (orderData?.paymentMethod === "stripe") {
        window.location.assign(payment.url);
        return;
      }
      if (orderData?.paymentMethod === "paypal") {
        orderRef.current = orderData;
        return payment.sessionId;
      }
    } catch ({ response }) {
      showToast(response.data.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  function onApprove() {
    const order = orderRef.current;
    navigate(`/order-confirmation/${order._id}?success=true`);
  }

  return (
      <>
        <Helmet>
          <title>
            Secure Checkout - Complete Your Purchase with Elite Digitals
          </title>
          <meta
              name="description"
              content="Ready to finalize your order? Proceed through our secure checkout process to confirm your purchase. Enjoy a seamless shopping experience with Elite Digitals, from cart to confirmation."
          />
        </Helmet>
        <div className="w-full bg-white-A700">
          {/* header section */}
          <Header />
          <div className="flex justify-center pb-[72px] md:pb-5">
            {/* breadcrumb section */}
            <div className="container flex flex-col gap-[25px] md:p-2 sm:gap-[26px]">

              <nav className="flex items-center text-sm my-6">
                <a href="/" className="text-gray-500 hover:text-gray-700">Home</a>
                <ChevronLeft className="mx-2 h-4 w-4 text-gray-400" />
                <a href="/cart" className="text-gray-500 hover:text-gray-700"> Cart</a>
                <ChevronLeft className="mx-2 h-4 w-4 text-gray-400" />
                <span className="text-gray-900 font-medium">Checkout</span>
              </nav>

              <div className="grid grid-cols-5 md:grid-cols-1 gap-5">
                <div className="col-span-3">

                  <div className="border border-solid rounded-[16px] border-gray-200 p-8 md:p-4">
                    <div className="flex mb-8">
                      <Heading size="md" as="h4" className="text-thdark"> Shipping Address </Heading>
                      <Button color="gray_900" shape="round"  className="px-5 font-medium bg-thdark text-white-A700 ms-auto" onClick={() => navigate("/address?from=checkout")}>
                        Add Address
                      </Button>
                    </div>
                    {visibleAddresses?.length ? (
                        <>
                          {visibleAddresses.map((address) => (<AddressCard {...address} key={address._id} handleAddressSelection={handleAddressSelection} />))}
                        </>
                    ) : (
                        <p className="text-sm text-gray-600 text-center mx-auto my-10"> Add new address by clicking the add address button</p>
                    )}
                  </div>

                  <div className="border border-solid rounded-[16px] border-gray-200 p-8 md:p-4 mt-5">
                    <div className="flex mb-10">
                      <Heading size="md" as="h4" className="text-thdark"> Your Order </Heading>
                    </div>

                    <div className="flex flex-col gap-px">
                      {cart.map((item) => (
                          <CheckoutProduct {...item} key={item._id} isDisabled={true} />
                      ))}
                    </div>

                  </div>




                </div>

                <div className="col-span-2">
                  <div className="border border-solid border-gray-200 p-8 md:p-4  rounded-[16px]">
                    <Heading size="md" as="h4" className="col-span-2 mb-5 text-thdark"> Order Summary </Heading>

                    <div className="grid grid-cols-2 gap-3">
                      <Text as="p">Subtotal</Text>
                      <Text as="p" className="text-right">${subTotal}</Text>

                      <Text as="p">Shipping estimate</Text>
                      <Text as="p" className="text-right">${SHIPPING_CHARGE}</Text>

                      <Text as="p">Tax estimate</Text>
                      <Text as="p" className="text-right">{GST_IN_PERCENTAGE}%</Text>


                      <h6 className="text-3xl font-bold">Total</h6>
                      <h6 className="text-right text-3xl font-bold">${orderTotal}</h6>






                    </div>






                  </div>

                  <div className="border border-solid border-gray-200 p-8 md:p-4  rounded-[16px] mt-5">
                    <Heading size="md" as="h4" className="col-span-2 mb-5 text-thdark"> Payment </Heading>

                    <RadioGroup onChange={handlePaymentMethod} className="flex flex-col gap-2 col-span-2 mb-8">
                      <Radio label="Cash on Delivery" value="cod" />
                      <Radio label="Pay Online" value="Pay online" />
                    </RadioGroup>


                    {orderPayload.paymentMethod &&
                    orderPayload.paymentMethod !== "cod" && (
                        <>
                          {!orderPayload.addressId ? (
                              <p className="text-sm text-red-500 col-span-2">
                                Please select an address
                              </p>
                          ) : (
                              <div className="flex sm:flex-col  items-center gap-4 w-full col-span-2">
                                <PayPalButtons
                                    createOrder={() =>
                                        handlePlaceOrder(true, "paypal")
                                    }
                                    onApprove={onApprove}
                                    style={{
                                      layout: "horizontal",
                                      color: "white",
                                      shape: "rect",
                                      tagline: false,
                                    }}
                                    className="w-full max-w-xs h-10 disabled:opacity-50"
                                    disabled={isSubmitting}
                                />
                                <button
                                    disabled={isSubmitting}
                                    onClick={() => handlePlaceOrder(true, "stripe")}
                                    className="flex items-center justify-center bg-[#635BFF] text-white-A700 font-medium rounded-md px-4 py-2 hover:bg-[#4b44d7] transition-all duration-300 w-full max-w-xs mx-auto shadow-lg disabled:opacity-50"
                                >
                                  <img
                                      src="https://freelogopng.com/images/all_img/1685814539stripe-icon-png.png"
                                      alt="Stripe Logo"
                                      className="h-5 mr-2"
                                  />
                                  Pay with Stripe
                                </button>
                              </div>
                          )}
                        </>
                    )}

                    {orderPayload && orderPayload.paymentMethod === "cod" && (
                        <Button color="gray_900" className="w-full py-5 rounded-[26px] mt-5 bg-thdark  font-medium sm:px-5 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!orderPayload.addressId || isSubmitting} onClick={() => handlePlaceOrder()} >
                          Confirm order
                        </Button>
                    )}
                  </div>


                </div>







              </div>



            </div>
          </div>

          <Footer />
        </div>

        {/* <OrderPlacedMessage show={confirm} /> */}
      </>
  );
}

const AddressCard = ({
                       name,
                       address,
                       pin,
                       phone,
                       _id,
                       handleAddressSelection,
                     }) => {
  return (
      <div className="relative flex items-start pt-2 gap-2 ">
        <div className="ml-3 flex items-center h-5">
          <input
              id={_id}
              name={"address_radio_selection"}
              type="radio"
              onChange={() => handleAddressSelection(_id)}
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
          />
        </div>
        <div className={`bg-white-A700  rounded-lg shadow-sm p-4 border  border-gray-200 space-y-2 sm:order-2 w-full`} >
          <div className="flex items-start justify-between ">
            <p className="font-medium text-sm text-black p-1 px-2 bg-gray-200 rounded-md">
              {name}
            </p>
          </div>
          <p className="text-sm text-gray-600 ">{address}</p>
          <div className="flex flex-col gap-px">
            <p className="text-sm text-gray-600 inline-flex items-center gap-1 md:px-1">
              <span className="font-medium text-black">Pin:</span>
              {pin}
            </p>
            <p className="text-sm text-gray-600 inline-flex items-center gap-1 md:px-1">
              <span className="font-medium text-black">Phone:</span>
              {phone}
            </p>
          </div>
        </div>
      </div>
  );
};

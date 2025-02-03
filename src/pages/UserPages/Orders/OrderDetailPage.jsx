import React, { useEffect, useState } from "react";
import Header from "../../../components/UserComponents/Header";
import {
  Link,
  Navigate,
  useLocation,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axiosInstance from "../../../utils/api/axiosInstance";
import { USER_URL } from "../../../constants";
import convertTodateString from "../../../utils/convertTodateString";
import OrderTrackingTimeline from "../../../components/UserComponents/orders/OrderTrackingTimeline";
import { CircleCheck, CircleX } from "lucide-react";
import { capitalize } from "../../../utils";
import Rating from "../../../components/UserComponents/orders/Rating";
import Loader from "../../../components/UserComponents/Loader";

const OrderDetailPage = () => {
  const [order, setOrder] = useState(null);
  const [product, setProduct] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { hash } = useLocation();
  const { orderId } = useParams();
  const [params] = useSearchParams();

  useEffect(() => {
    setIsLoading(true);
    const element = document.getElementById(hash.replace("#", ""));
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    axiosInstance(USER_URL + `/order/${orderId}`)
        .then(({ data }) => {
          const productId = params.get("productId");
          const order = data?.data;
          setOrder(order);
          setProduct(
              ...order?.products.filter(
                  (product) => product?.productId === productId
              )
          );
        })
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
  }, []);

  if (error || !params.get("productId")) {
    return <Navigate to={"/orders"} />;
  }

  return isLoading ? (
      <Loader />
  ) : (
      <>
        <Header />
        <section className="bg-white-A700 py-8 antialiased dark:bg-gray-900 md:py-10">


          <div className="container mx-auto">
            <nav className="flex items-center text-sm mb-4 px-2">
              <Link to="/" className="text-gray-500">
                Home
              </Link>
              <span className="px-1 text-gray-300">&gt;</span>
              <Link to="/orders">
                <span className="text-gray-900 font-medium">Orders</span>
              </Link>
              <span className="px-1 text-gray-300">&gt;</span>
              <span className="text-sm text-gray-500">{orderId}</span>
            </nav>


            <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
              {/* <h2 className="text-xl font-semibold text-gray-900 dark:text-white-A700 sm:text-2xl">
            Track the delivery of order #957684673
          </h2> */}
              <div className="sm:mt-8 lg:flex lg:gap-8">
                <div className="w-full divide-y divide-gray-200 overflow-hidden rounded-lg border border-gray-200 dark:divide-gray-700 dark:border-gray-700 lg:max-w-xl xl:max-w-2xl">
                  <div className="space-y-4 p-6">
                    <div className="flex sm:flex-col items-center gap-6">
                      <Link
                          to={`/product/${product?.productId}`}
                          className="size-20 sm:w-full sm:h-full shrink-0 rounded-md"
                      >
                        <img
                            className="object-contain rounded-md"
                            src={product?.thumbnail}
                            alt={product?.productName}
                        />
                      </Link>
                      <Link
                          to={`/product/${product?.productId}`}
                          className="min-w-0 flex-1 font-medium text-gray-900 hover:underline dark:text-white"
                      >
                        {product?.productName}
                      </Link>
                    </div>
                    <div className="flex sm:flex-col items-center justify-between gap-4">
                      <p className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-900 dark:text-white pr-1">
                      Product ID:
                    </span>
                        {(product?.productId || "").toUpperCase()}
                      </p>
                      <div className="flex items-center justify-end gap-4">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          ${product?.price}
                        </p>
                        <p className="text-base font-normal text-gray-900 dark:text-white">
                          x{product?.quantity}
                        </p>
                        <p className="text-xl font-bold leading-tight text-gray-900 dark:text-white">
                          ${product?.totalPrice}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white-A700 rounded-lg p-6">
                    <h1 className="text-xl font-semibold mb-4">Order Details</h1>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Order Number:</span>{" "}
                        {order?.orderId || ""}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Order Date:</span>{" "}
                        {convertTodateString(order?.status?.initiated?.time)}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium ">Total Amount:</span> $
                        {product?.totalPrice}
                      </p>
                      <p className="text-gray-600 inline-flex gap-1 items-center">
                        <span className="  font-medium">Payment Status:</span>{" "}
                        {capitalize(order?.checkoutId?.status || "") || "Pending"}
                        {order?.checkoutId?.status === "completed" ? (
                            <CircleCheck className="size-5 text-green-500" />
                        ) : (
                            <CircleX className="size-5 text-red-500" />
                        )}
                      </p>
                      <p className="text-gray-600 ">
                        <span className="font-medium">Payment Method:</span>{" "}
                        {(order?.paymentMethod || "").toUpperCase()}
                      </p>
                    </div>
                    {/* Divider */}
                    <hr className="my-4" />
                    {/* Billing Address Section */}
                    <h1 className="text-xl font-semibold mb-4">Billing Address</h1>
                    <div className="flex flex-col gap-2">
                      <p className="text-gray-600">
                        <span className="font-medium">Name:</span>{" "}
                        {order?.address?.name}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Address:</span>{" "}
                        {order?.address?.address}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Pin:</span>{" "}
                        {order?.address?.pin}
                      </p>
                      <p className="text-gray-600">
                        <span className="font-medium">Phone:</span>{" "}
                        {order?.address?.phone}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 lg:mt-0 w-full">
                  <OrderTrackingTimeline status={product?.status} />
                  {/* Rating option */}
                  {product?.status?.delivered?.status && (
                      <Rating productId={product?.productId} />
                  )}
                </div>
              </div>
            </div>
          </div>

        </section>
      </>
  );
};

export default OrderDetailPage;

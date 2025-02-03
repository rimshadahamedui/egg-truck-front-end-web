import React, { useRef, useState } from "react";
import useOutsideAlerter from "../../../../Hooks/OutsideClickAlerter";
import { ADMIN_URL } from "../../../../constants";
import { X } from "lucide-react";
import useFetchApi from "../../../../Hooks/useFetchApi";
import { getDay_month_yearFormated } from "../../../../utils/convertTodateString";
import Loader from "../../../UserComponents/Loader";
import axiosInstance from "../../../../utils/api/axiosInstance";
import showToast from "../../../../utils/showToast";

const AvailableOffers = ({ offerData, handlevisibilty, offerStatus }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data, isLoading } = useFetchApi({ url: ADMIN_URL + "/offers" });
  const ref = useRef(null);
  useOutsideAlerter(ref, handlevisibilty);

  const handleApplyOffer = (id) => {
    setIsSubmitting(true);
    axiosInstance
      .post(ADMIN_URL + `/apply-offer/${id}`, offerData)
      .then(({ data }) => {
        showToast("Offer applied successfully");
        handlevisibilty(data.data);
      })
      .catch(({ response }) =>
        showToast(response.data.message || "error", "error")
      )
      .finally(() => setIsSubmitting(false));
  };

  const handleRemoveOffer = (id) => {
    setIsSubmitting(true);
    axiosInstance
      .post(ADMIN_URL + `/remove-offer/${id}`, offerData)
      .then(() => {
        showToast("Offer removed successfully");
        handlevisibilty({ isOfferActive: false });
      })
      .catch(({ response }) =>
        showToast(response.data.message || "error", "error")
      )
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div className="flex h-screen overflow-x-hidden bg-gray-500 bg-opacity-50 fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 max-h-full">
      <div className="relative p-4 w-full max-w-xl max-h-full" ref={ref}>
        <div className="relative bg-white-A700 rounded-lg shadow  dark:bg-dark">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white-A700">
              Active offers
            </h3>
            <button
              type="button"
              onClick={() => handlevisibilty()}
              className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="authentication-modal"
            >
              <X />
            </button>
          </div>
          {isLoading ? (
            <Loader className="h-72" />
          ) : data.length ? (
            <div className="p-4 md:p-5 h-72 overflow-y-auto">
              {data.map((offer, i) => (
                <div
                  className="flex items-center justify-between gap-5 sm:gap-2 space-y-2"
                  key={offer._id}
                >
                  <p className="text-sm font-normal ">{i + 1}.</p>
                  <p className="text-sm font-medium break-words w-24 ">
                    {offer.offerName}
                  </p>
                  <p className="text-sm font-medium">{offer.discountValue}</p>
                  <p className="text-sm font-medium">
                    Expires on - {getDay_month_yearFormated(offer.endDate)}
                  </p>
                  {offerStatus.hasOffer && offerStatus.offerId === offer._id ? (
                    <button
                      type="button"
                      onClick={() => handleRemoveOffer(offer._id)}
                      disabled={isSubmitting}
                      className="inline-flex items-center py-2 px-2 text-sm font-medium text-red-600 bg-red-100 rounded-md shadow hover:bg-red-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleApplyOffer(offer._id)}
                      disabled={isSubmitting}
                      className="inline-flex items-center py-2 px-2 text-sm font-medium text-blue-600 bg-blue-100 rounded-md shadow hover:bg-blue-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50"
                    >
                      Select
                    </button>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <h3>No offers found add one from offers section</h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default AvailableOffers;

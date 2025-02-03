import React, { useState } from "react";
import { ADMIN_URL, offerTableHeaders } from "../../../constants";
import OfferListRow from "./OfferListRow";
import AddorEditOffer from "./dialogue/AddorEditOffer";
import useFetchApi from "../../../Hooks/useFetchApi";
import Loader from "../../UserComponents/Loader";
import { Text } from "../../UserComponents";
import updateArrayObjects from "../../../utils";

const OfferList = () => {
  const [offerModal, setOfferModal] = useState({
    show: false,
    isEditing: false,
    offerData: {},
  });
  const { data, isLoading, setData } = useFetchApi({
    url: ADMIN_URL + "/offers",
  });

  const handleNewOffer = (offerData) => setData((prev) => [...prev, offerData]);

  const handleUpdatedOffer = (updatedOffer) => {
    setData(
      updateArrayObjects(data, "_id", offerModal.offerData._id, updatedOffer)
    );
  };

  return (
    <div className="p-8 w-full  h-screen">
      <div className="flex justify-end">
        <button
          onClick={() =>
            setOfferModal((prev) => ({
              ...prev,
              show: true,
            }))
          }
          className="text-white-A700 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Add Offer
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : data.length ? (
        <div className="overflow-x-auto border bg-white-A700 dark:bg-dark rounded-2xl">
          <table className="min-w-full">
            <thead>
              <tr>
                {offerTableHeaders.map((header, i) => (
                  <th className="py-2 px-4 border" key={i}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((offer, i) => (
                <OfferListRow
                  handleEdit={() =>
                    setOfferModal({
                      show: true,
                      isEditing: true,
                      offerData: offer,
                    })
                  }
                  {...offer}
                  Sno={i + 1}
                  key={offer._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Text className="font-medium text-center " size="md">
          No Offers Found
        </Text>
      )}
      {/* Create offer modal */}
      {offerModal.show && !offerModal.isEditing && (
        <AddorEditOffer
          isOpen={offerModal.show}
          handlevisibilty={() =>
            setOfferModal((prev) => ({ ...prev, show: false }))
          }
          handleNewOffer={handleNewOffer}
        />
      )}

      {/* Edit offer modal */}
      {offerModal.show && offerModal.isEditing && (
        <AddorEditOffer
          isEditing={true}
          offerData={offerModal.offerData}
          handleUpdatedOffer={handleUpdatedOffer}
          handlevisibilty={() =>
            setOfferModal((prev) => ({
              ...prev,
              show: false,
              isEditing: false,
              offerData: {},
            }))
          }
        />
      )}
    </div>
  );
};

export default OfferList;

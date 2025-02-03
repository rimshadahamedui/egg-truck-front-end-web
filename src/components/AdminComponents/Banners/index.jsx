import React, { useState } from "react";
import useFetchApi from "../../../Hooks/useFetchApi";
import { ADMIN_URL, bannerTableHeaders } from "../../../constants";
import BannerListRow from "./BannerListRow";
import updateArrayObjects from "../../../utils";
import { Text } from "../../UserComponents";
import Loader from "../../UserComponents/Loader";
import AddorEditBanner from "./dialogue/AddorEditBanner";

const BannerList = () => {
  const [bannerModal, setBannerModal] = useState({
    show: false,
    isEditing: false,
    bannerData: {},
  });
  const { data, isLoading, setData } = useFetchApi({
    url: ADMIN_URL + "/banners",
  });

  const handleNewBanner = (bannerData) =>
    setData((prev) => [...prev, bannerData]);

  const handleUpdateBanner = (updatedBanner) => {
    setData(
      updateArrayObjects(data, "_id", bannerModal.bannerData._id, updatedBanner)
    );
  };

  return (
    <div className="p-8 w-full  h-screen">
      <div className="flex justify-end">
        <button
          onClick={() =>
            setBannerModal((prev) => ({
              ...prev,
              show: true,
            }))
          }
          className="text-white-A700 bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Add Banner
        </button>
      </div>
      {isLoading ? (
        <Loader />
      ) : data.length ? (
        <div className="overflow-x-auto border bg-white-A700 dark:bg-dark rounded-2xl">
          <table className="min-w-full">
            <thead>
              <tr>
                {bannerTableHeaders.map((header, i) => (
                  <th className="py-2 px-4 border" key={i}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((banner, i) => (
                <BannerListRow
                  handleEdit={() =>
                    setBannerModal({
                      show: true,
                      isEditing: true,
                      bannerData: banner,
                    })
                  }
                  {...banner}
                  Sno={i + 1}
                  key={banner._id}
                />
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <Text className="font-medium text-center " size="md">
          No Banners Found
        </Text>
      )}

      {/* Create Banner modal */}
      {bannerModal.show && !bannerModal.isEditing && (
        <AddorEditBanner
          handlevisibilty={() =>
            setBannerModal((prev) => ({ ...prev, show: false }))
          }
          handleNewBanner={handleNewBanner}
        />
      )}

      {/* Edit Banner modal */}
      {bannerModal.show && bannerModal.isEditing && (
        <AddorEditBanner
          isEditing={true}
          bannerData={bannerModal.bannerData}
          handleUpdatedBanner={handleUpdateBanner}
          handlevisibilty={() =>
            setBannerModal({
              show: false,
              isEditing: false,
              bannerData: {},
            })
          }
        />
      )}
    </div>
  );
};

export default BannerList;

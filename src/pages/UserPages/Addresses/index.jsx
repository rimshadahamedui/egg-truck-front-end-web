import React, { useEffect, useState } from "react";
import Header from "../../../components/UserComponents/Header";
import { ChevronLeft, Trash2 } from "lucide-react";
import AddorEditAddress from "../../../components/UserComponents/Address/AddorEditAddress";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import axiosInstance from "../../../utils/api/axiosInstance";
import { USER_URL } from "../../../constants";
import showToast from "../../../utils/showToast";
import AddressList from "../../../components/UserComponents/Address/AddressList";
import ConfirmationModal from "../../../components/UserComponents/dialogue/ConfirmationModal";
import { getAddresses } from "../../../utils/api/address";

const AddressPage = () => {
  const [addresses, setAddresses] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editAddressData, setEditAddressData] = useState(null);
  const [confirmation, setConfirmation] = useState({ show: false, _id: null });
  const [params] = useSearchParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (params.get("from") === "checkout") {
      setShowAddressModal(true);
      return;
    }
    async function fetchAddress() {
      const data = await getAddresses();
      setAddresses(data || []);
    }
    fetchAddress();
  }, []);

  const handleAddAddress = () => {
    if (params.get("from")) {
      navigate("/checkout");
      return;
    }
  };

  const handleUpdatedAddress = (updatedAdd) => {
    const updatedData = addresses.map((address) =>
        address._id === updatedAdd._id ? updatedAdd : address
    );
    setAddresses(updatedData);
    setEditAddressData(null);
  };

  const handleDeleteAddress = () => {
    axiosInstance
        .delete(USER_URL + `/address/${confirmation._id}`)
        .then(() => {
          setAddresses(
              addresses.filter((address) => address._id !== confirmation._id)
          );
          setConfirmation({ show: false, _id: null });
          showToast("Address deleted successfully");
        })
        .catch((e) => showToast(e.message, "error"));
  };

  return (
      <>
        <Header />
        <div className="max-w-4xl mx-auto p-4">
          <nav className="flex items-center text-sm mb-12">
            <Link to="/" className="text-gray-500">
              Home
            </Link>
            <span className="mx-2 text-gray-300">&gt;</span>
            <Link to="/profile" className="text-gray-500">
              My account
            </Link>
            <span className="mx-2 text-gray-300">&gt;</span>
            <span className="text-gray-900">Manage Address</span>
          </nav>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold flex items-center">
              <ChevronLeft
                  className="mr-2 h-6 w-6"
                  onClick={() => navigate(-1)}
              />
              Manage Address
            </h1>
            <button
                type="button"
                onClick={() => setShowAddressModal(true)}
                className="bg-thdark text-white-A700 font-medium px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Add Address
            </button>
          </div>
          {addresses.length ? (
              <div className="mb-2">
                {addresses.map((address) => (
                    <AddressList
                        {...address}
                        handleEditAddress={() => {
                          setIsEditing(true);
                          setShowAddressModal(true);
                          setEditAddressData(address);
                        }}
                        handleDeleteAddress={() =>
                            setConfirmation({ show: true, _id: address._id })
                        }
                        key={address._id}
                    />
                ))}
              </div>
          ) : (
              <p className="text-center font-medium text-gray-500 pt-10 sm:pt-0">
                No Address found add one by clicking the add address button{" "}
              </p>
          )}
          {showAddressModal && !isEditing && (
              <AddorEditAddress
                  handleVisibility={() => setShowAddressModal(false)}
                  isEditing={isEditing}
                  handleAddAddress={handleAddAddress}
              />
          )}
          {/* Edit address Modal, Reusing the same modal for edit address also  */}
          {showAddressModal && isEditing && (
              <AddorEditAddress
                  addressData={editAddressData}
                  handleVisibility={() => {
                    setShowAddressModal(false);
                    setIsEditing(false);
                  }}
                  handleUpdatedAddress={handleUpdatedAddress}
                  isEditing={isEditing}
              />
          )}

          {/* Delete confirmation modal */}
          {confirmation.show && (
              <ConfirmationModal
                  handleDeleteTrue={handleDeleteAddress}
                  handleDeleteFalse={() =>
                      setConfirmation({ show: false, _id: null })
                  }
              />
          )}
        </div>
      </>
  );
};

export default AddressPage;

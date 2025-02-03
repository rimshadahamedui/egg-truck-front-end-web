import React from "react";
import Header from "../../../components/UserComponents/Header";
import { Link, useNavigate } from "react-router-dom";
import { capitalizeInitial, logout } from "../../../utils";
import { ChevronLeft, MapPin, Package } from "lucide-react";
import {
  Bell,
  Headphones,
  FileText,
  Mail,
  ChevronRight,
  LogOut,
} from "lucide-react";
import { useSelector } from "react-redux";
import useFetchApi from "../../../Hooks/useFetchApi";
import { USER_URL } from "../../../constants";

const ProfilePage = () => {
  // const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [address] = useFetchApi({ url: USER_URL + "/address" }).data;

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  // const handleManageAddress = () => {
  //   navigate("/addresses");
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setUserInfo({
  //     ...userInfo,
  //     [name]: value,
  //   });
  // };

  // const handleEditClick = () => {
  //   setIsEditing(true);
  // };

  // const handleSaveClick = () => {
  //   setIsEditing(false);
  // You can also add code here to save the updated information to a server or database
  // };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-4">
        <nav className="flex items-center text-sm mb-4">
          <Link to="/" className="text-gray-500">
            Home
          </Link>
          <span className="mx-2 text-gray-300">&gt;</span>
          <span className="text-gray-900">My Account</span>
        </nav>

        <h1 className="text-2xl font-bold mb-6 flex items-center">
          <ChevronLeft
            className="mr-2 h-6 w-6 hover:cursor-pointer"
            onClick={() => navigate(-1)}
          />
          My Account
        </h1>

        <div className="bg-white rounded-xl shadow-sm p-6 mb-4 outline outline-1 outline-slate-300">
          <div className="flex items-center mb-4">
            <div className="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center text-gray-600 font-semibold text-xl mr-4">
              {capitalizeInitial(user?.name)}
            </div>
            <div>
              <h2 className="font-bold">{user?.name}</h2>
              {/* <p className="text-sm text-gray-600">{profileData.userEmail}</p> */}
              <p className="text-sm text-gray-600">
                {address && address.phone}
              </p>
            </div>
          </div>
          <div className="border-t pt-4">
            <h3 className="text-sm font-semibold text-gray-500 mb-2">
              Address
            </h3>
            <p className="text-sm text-gray-700">
              {address && address.address}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 outline outline-1 outline-slate-300 rounded-xl">
          <Link
            to="/address"
            className="flex flex-col items-center justify-center bg-white rounded-xl shadow-sm p-6 hover:bg-gray-50"
          >
            <MapPin className="h-6 w-6 mb-2 text-gray-600" />
            <span className="text-sm font-medium">Manage Address</span>
          </Link>
          <Link
            to="/orders"
            className="flex flex-col items-center justify-center bg-white rounded-lg shadow-sm p-6 hover:bg-gray-50"
          >
            <Package className="h-6 w-6 mb-2 text-gray-600" />
            <span className="text-sm font-medium">My Orders</span>
          </Link>
        </div>
      </div>
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-white rounded-xl shadow-sm mb-4 outline outline-1 outline-slate-300">
          <h2 className="text-xl font-semibold p-4 border-b">More</h2>
          <ul>
            <li className="border-b">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <Bell className="h-5 w-5 mr-3 text-gray-500" />
                  <span className="text-gray-700">Notifications</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </li>
            <li className="border-b">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <Headphones className="h-5 w-5 mr-3 text-gray-500" />
                  <span className="text-gray-700">Support</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </li>

            <li className="border-b">
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <FileText className="h-5 w-5 mr-3 text-gray-500" />
                  <span className="text-gray-700">
                    Conditions & Return policy
                  </span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </li>
            <li>
              <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 mr-3 text-gray-500" />
                  <span className="text-gray-700">Get in touch</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            </li>
          </ul>
        </div>

        <div className="bg-white rounded-xl outline outline-1 outline-red-100  shadow-2xl">
          <button
            className="w-full flex items-center justify-center p-4 text-red-500  hover:bg-gray-50"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5 mr-2" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;

import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/AdminComponents/Sidebar";
import Header from "../../../components/AdminComponents/Header";
import { ADMIN_URL, userTableHeaders } from "../../../constants";
import axiosInstance from "../../../utils/api/axiosInstance";
import showToast from "../../../utils/showToast";
import Loader from "../../../components/UserComponents/Loader";
import UserList from "../../../components/AdminComponents/Users/UserList";
import BlockModal from "../../../components/AdminComponents/Users/BlockModal";
import useFetchApi from "../../../Hooks/useFetchApi";

const Users = () => {
  // const [users, setUsers] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const [blockModal, setBlockModal] = useState({
    show: false,
    user: null,
  });
  const { data: users, isLoading } = useFetchApi({ url: ADMIN_URL + "/users" });
  // useEffect(() => {
  //   setIsLoading(true);
  //   axiosInstance()
  //     .then(({ data }) => setUsers(data.data))
  //     .catch((e) => showToast(e.message, "error"))
  //     .finally(() => setIsLoading(false));
  // }, []);

  const handleBlockUser = (user) => {
    setBlockModal({
      show: true,
      user,
    });
  };
  return (
    <>
      <div className="flex h-full">
        <div className="p-4 h-full w-full">
          {isLoading ? (
            <Loader />
          ) : (
            <div className="overflow-x-auto border bg-white-A700 dark:bg-dark rounded-2xl">
              <table className="min-w-full">
                <thead>
                  <tr>
                    {userTableHeaders.map((header, i) => (
                      <th className="py-2 px-4 border" key={i}>
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {users.length ? (
                    users.map((user, i) => (
                      <UserList
                        Sno={i + 1}
                        {...user}
                        key={user._id}
                        handleBlockUser={handleBlockUser}
                      />
                    ))
                  ) : (
                    <tr>
                      <td>No users found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
        {blockModal.show && (
          <BlockModal
            user={blockModal.user}
            handlevisibilty={() => setBlockModal({ show: false, user: null })}
          />
        )}
      </div>
    </>
  );
};

export default Users;

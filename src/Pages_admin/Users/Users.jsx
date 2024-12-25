import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import searchIcon from "../../assets_admin/search.png";
import add from "../../assets_admin/add.png";
import show from "../../assets_admin/show.png";
import edit from "../../assets_admin/edit.png";
import ViewUser from "../../Components_admin/ViewUser/ViewUser";
import Pagination from "../../Components_admin/Pagination/Pagination";
import { getAllUsers } from "../../Components_admin/Api/User"; // Fetch function
import UserInfoModal from "./UserInfoPopup";
import Loader from "../../Components_admin/Loader/Loader";
import deleteimg from "../../assets_admin/deleteimg.png";
import locationimg from "../../assets_admin/locationimg.png";
import DeleteModal from "../../Components_admin/DeleteModal";
import { deleteUser } from "../../Components_web/Api/Webapi";
import EditUserModal from "./EditUserModal";
import EditUser from "../EditUser/EditUser";

const Users = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const closeDeleteModal = () => setShowDeleteModal(false);

  const navigate = useNavigate();
  // Fetch users from API
  const fetchUsers = async () => {
    const response = await getAllUsers(currentPage, usersPerPage);
    if (response.status) {
      setUsers(response.data); // Set user data from API
      setTotalPages(Math.ceil(response.total / usersPerPage)); // Ensure you handle total pages
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage]);

  // Filter users based on search query
  const filteredUsers = users.filter((user) => {
    const query = searchQuery.toLowerCase();
    return (
      user.username?.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
    );
  });

  const handleShowInfo = (user) => {
    setSelectedUser(user);
    setIsInfoModalOpen(true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1); // Reset pagination to the first page when search changes
  };

  const handleDeleteClick = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };
  const handleShowLoginHistory = (user) => {
    // Assuming the route for merchant login history is /merchant-login-history/:id
    const url = `/merchant-login-history/${user.id}`;
    window.location.href = url;
  };
  const confirmDelete = async () => {
    if (selectedUser) {
      const response = await deleteUser(selectedUser._id);
      if (response.status) {
        fetchUsers();
      }
      closeDeleteModal();
    }
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setSelectedUser(null);
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  return (
    <div className="">
      <div className="d-flex justify-content-between align-items-center nav-bar pb-3">
        <div className="navbar">
          <div className="navbar-options d-flex">
            <input
              type="search"
              className="search-btn rounded-start-4 p-3"
              placeholder="Search users"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            <button className="search-img rounded-end-4 border-0">
              <img src={searchIcon} className="search" alt="search icon" />
            </button>
          </div>
        </div>
        <div>
          <Link to="/add-user">
            <button className="btn text-white flex items-center" style={{ background: "#D65246" }}>
              <img src={add} className="pe-2" alt="Add" />
              Add User
            </button>
          </Link>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table-borderless w-100 text-center bg-light" style={{ fontSize: "12px" }}>
          <thead className="text-light" style={{ background: "#253A71" }}>
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">Username</th>
              <th className="p-3">Email</th>
              <th className="p-3">Contact</th>
              <th className="p-3">Login Time</th>
              <th className="p-3">Logout Time</th>
              <th className="p-3">Active Time</th>
              <th className="p-3">Role</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center p-3">
                  <div className="d-flex justify-content-center">
                    <div className="mx-auto">
                      <Loader />
                      No Data Found
                    </div>
                  </div>
                </td>
              </tr>
            ) : (
              filteredUsers.map((user, index) => (
                <tr key={index}>
                  <td className="p-3 text-primary">{index + 1 || '-'}</td>
                  <td className="p-3">{user?.username || '-'}</td>
                  <td className="p-3">{user?.email || '-'}</td>
                  <td className="p-3">{user?.contact || '-'}</td>
                  <td className="p-3">
                    {user?.loginTime
                      ? new Date(user.loginTime).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })
                      : '-'}
                  </td>
                  <td className="p-3">
                    {user?.logoutTime
                      ? new Date(user.logoutTime).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })
                      : '-'}
                  </td>

                  <td className="p-3">{user?.activeTime?.totalTime}</td>
                  <td className="p-3">{user?.role || '-'}</td>
                  <td className="table-head2">
                    <button className="show-btn m-2" onClick={() => handleShowInfo(user)}>
                      <img src={show} alt="Show" className="mx-auto" />
                    </button>
                    <button
                          className="edit-btn ms-1"
                          onClick={() => handleEditClick(user)}
                        >
                          <img src={edit} alt="Edit" className="mx-auto" />
                        </button>
                    <button
                          className="delete-btn m-2"
                          onClick={() => handleDeleteClick(user)}
                        >
                          <img
                            src={deleteimg}
                            alt="Delete"
                            className="mx-auto"
                          />
                        </button>
                    <button className="show-btn m-2" onClick={() => navigate(`/merchant-login-history/${user._id}`)}>
                      <img
                            src={locationimg}
                            alt="Edit"
                            className="mx-auto"
                          />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} handleClick={(e) => setCurrentPage(Number(e.target.id))} />

      {isInfoModalOpen && (
        <UserInfoModal
          user={selectedUser}
          onHide={() => setIsInfoModalOpen(false)} // Close modal function
        />
      )}

      {showDeleteModal && (
        <DeleteModal
          onDelete={confirmDelete}
          onHide={closeDeleteModal}
          text="User"
        />
      )}

      {showEditModal && (
        <EditUser
          user={selectedUser}
          onHide={closeEditModal}
          
        />
      )}
    </div>
  );
};

export default Users;

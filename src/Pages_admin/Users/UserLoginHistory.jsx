import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getUserLoginHistory } from '../../Components_web/Api/Webapi'; // Fetch function
import Loader from '../../Components_admin/Loader/Loader';

const UserLoginHistory = () => {
  const { id } = useParams();
  const [userLoginHistory, setUserLoginHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserLoginHistory = async (id) => {
      setLoading(true);
      const response = await getUserLoginHistory(id);
      console.log(response);
      if (response.status) {
        setUserLoginHistory(response.data); // Set user login history data from API
      }
      setLoading(false);
    };

    if (id) {
      fetchUserLoginHistory(id);
    }
  }, []);

  return (
    <div>
      <h1>User Login History</h1>
      {loading ? (
        <Loader />
      ) : (
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
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {userLoginHistory.length === 0 ? (
                <tr>
                  <td colSpan="5" className="text-center p-3">
                    <div className="d-flex justify-content-center">
                      <div className="mx-auto">
                        <Loader />
                        No Data Found
                      </div>
                    </div>
                  </td>
                </tr>
              ) : (
                userLoginHistory.map((history, index) => (
                  <tr key={index}>
                    <td className="p-3 text-primary">{index + 1}</td>
                    <td className="p-3 text-primary">{history.userId.username} </td>
                    <td className="p-3 text-primary">{history.userId.email} </td>
                    <td className="p-3 text-primary">{history.userId.contact} </td>
                    <td className="p-3">
                      {history.loginTime ? new Date(history.loginTime).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      }) : '-'}
                    </td>
                    <td className="p-3">
                      {history.logoutTime ? new Date(history.logoutTime).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      }) : '-'}
                    </td>
                    <td className="p-3">
                      {history.duration ? history.duration.totalTime : '-'}
                    </td>
                   
                    <td className="p-3">
                        
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserLoginHistory;

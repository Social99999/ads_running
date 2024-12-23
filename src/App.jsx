import React, { useEffect, useState } from "react";
import io from 'socket.io-client';

import "./App.css";

// import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "leaflet/dist/leaflet.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import Formate from "./Components_web/Formate/Formate";
import Mainbody from "./Components_web/WebBody/Mainbody";
import Pricing from "./Pages_web/Pricing/Pricing";
import Tracking from "./Pages_web/Tracking/Tracking";
import LoginWeb from "./Components_web/Login/Login";
import SignupWeb from "./Components_web/SignUp/Signup";

import About from "./Pages_web/About/About";
import Contact from "./Pages_web/Contact/Contact";

import ProtectedRouteAdmin from "./Pages_admin/Protected/Protected";
import UnprotectedRouteAdmin from "./Pages_admin/Protected/UnProtectedRoute";
import Dashboard from "./Pages_admin/Dashboard/Dashboard";
import LoginAdmin from "./Components_admin/Login/Login";

import EditUser from "./Pages_admin/EditUser/EditUser";

import Users from "./Pages_admin/Users/Users";

import CreateOrderAdmin from "./Pages_admin/orders/CreateOrder/CreateOrder";
import ViewUser from "./Components_admin/ViewUser/ViewUser";

import Profile from "./Pages_admin/Profile/Profile";

// import LoginAdmin from "./Components_admin/Login/Login";
import "react-toastify/dist/ReactToastify.css";
import AddUser from "./Pages_admin/Users/AddUser";
import AddDeliveryManAdmin from "./Pages_admin/DeliveryMan/AddDeliveryMan";


function App() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io('https://adsrunning.onrender.com', {
      withCredentials: true,
      transports: ['websocket', 'polling']
    });
    
    socket.on('connect', () => {
        console.log('Connected to server');
    });
    
    socket.on('connect_error', (error) => {
        console.log('Connection error:', error);
    });

    // You no longer need to manually emit 'disconnect' with the token here
    socket.on('disconnect', () => {
        console.log('Disconnected from server');
    });
    
    // After successful login
    function onLoginSuccess(token) {
        socket.emit('authenticate', token);
    }
}, []);


  useEffect(() => {
    if (socket) {
      socket.on("connect", () => {
        console.log("Connected to server");
      });
    }
  }, [socket]);

  // console.log("USER islogin", islogin);
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" />

      <Routes>
        {/* Unprotected Routes */}


        {/* web */}

        <Route
          path="/ads"
          element={
            <Formate >
              <Mainbody />
            </Formate>
          }
        />

        <Route
          path="/pricing"
          element={
            <Formate >
              <Pricing />
            </Formate>
          }
        />
        <Route path="/" element={<LoginWeb />} />
        <Route path="/register" element={<SignupWeb />} />
        <Route
          path="/tracking"
          element={
            <Formate >
              <Tracking  />
            </Formate>
          }
        />
        <Route
          path="/about"
          element={
            <Formate >
              <About />
            </Formate>
          }
        />
        <Route
          path="/contact"
          element={
            <Formate >
              <Contact />
            </Formate>
          }
        />

        {/* adminRoutes */}

        <Route
          path="/admin-login"
          element={
            <UnprotectedRouteAdmin>
              <LoginAdmin />
            </UnprotectedRouteAdmin>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRouteAdmin>
              <Dashboard />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="/edit-merchant"
          element={
            <ProtectedRouteAdmin>
              <EditUser />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/add-user"
          element={
            <ProtectedRouteAdmin>
              <AddUser />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/add-delivery-man-admin"
          element={
            <ProtectedRouteAdmin>
              <AddDeliveryManAdmin />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="/merchant"
          element={
            <ProtectedRouteAdmin>
              <Users />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="/create-order-admin"
          element={
            <ProtectedRouteAdmin>
              <CreateOrderAdmin />
            </ProtectedRouteAdmin>
          }
        />
        <Route
          path="/view-user"
          element={
            <ProtectedRouteAdmin>
              <ViewUser />
            </ProtectedRouteAdmin>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRouteAdmin>
              <Profile />
            </ProtectedRouteAdmin>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

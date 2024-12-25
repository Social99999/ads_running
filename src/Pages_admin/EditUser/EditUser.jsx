import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { Modal, ModalBody, Button } from "react-bootstrap";
import { editUser } from "../../Components_web/Api/Webapi";

const EditUserModal = ({ show, onHide, user }) => {
  console.log(user);
  const [phone, setPhone] = useState(user.contact);
  const formik = useFormik({
    initialValues: {
      // userName: user.userName,
      email: user.email,
      username: user.username,
      contact: user.contact,
      password: user.password,
      address: {
        street: user.address.street,
        city: user.address.city,
        state: user.address.state,
        pincode: user.address.pincode,
      },
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      username: Yup.string()
        .min(3, 'Username must be at least 3 characters long')
        .required("Username is required"),
      contact: Yup.string()
        .matches(/^[0-9]{10}$/, 'Please enter a valid 10-digit contact number')
        .required("Contact number is required"),
    
      address: Yup.object({
        street: Yup.string().required('Street address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        pincode: Yup.string()
          .matches(/^[0-9]{6}$/, 'Please enter a valid 6-digit pincode')
          .required('Pincode is required'),
      }),
    }),
    onSubmit: async (values) => {
      // Handle form submission here
      console.log("Form data:", values);

      try {
        const res = await editUser(user._id, values);
        console.log(res);
        if (res.status) {
          onHide();
        }
      } catch (err) {
        console.log(err);
      }
    },
  });

  return (
    <Modal show={true} onHide={onHide} centered size="lg">
      <ModalBody className="p-4">
        <div className="text-center">
          <h4 className="mb-3 fw-bold" style={{ color: "#253A71" }}>
            Edit User
          </h4>
          <form onSubmit={formik.handleSubmit}>
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="email" className="form-label" style={{ color: "#999696" }}>
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  placeholder="Email"
                  {...formik.getFieldProps("email")}

                />
                {formik.touched.email && formik.errors.email && (
                  <div className="text-danger">{formik.errors.email}</div>
                )}
              </div>
              <div className="col-md-6">
                <label htmlFor="username" className="form-label" style={{ color: "#999696" }}>
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="form-control"
                  placeholder="Username"
                  {...formik.getFieldProps("username")}

                />
                {formik.touched.username && formik.errors.username && (
                  <div className="text-danger">{formik.errors.username}</div>
                )}
              </div>
            </div>

            <div className="mb-3">
              <label htmlFor="contactNumber" className="form-label" style={{ color: "#999696" }}>
                Contact Number
              </label>
              <input
                type="text"
                id="contact"
                className="form-control"
                placeholder="Contact Number"
                {...formik.getFieldProps("contact")}
              />
              {formik.touched.contact && formik.errors.contact && (
                <div className="text-danger">{formik.errors.contact}</div>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label" style={{ color: "#999696" }}>
                Password
              </label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="Password"
                {...formik.getFieldProps("password")}

              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-danger">{formik.errors.password}</div>
              )}
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="address.street" className="form-label" style={{ color: "#999696" }}>
                  Street Address
                </label>
                <input
                  type="text"
                  id="address.street"
                  className="form-control"
                  placeholder="Street Address"
                  {...formik.getFieldProps("address.street")}

                />
                {formik.touched.address?.street && formik.errors.address?.street && (
                  <div className="text-danger">{formik.errors.address?.street}</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="address.city" className="form-label" style={{ color: "#999696" }}>
                  City
                </label>
                <input
                  type="text"
                  id="address.city"
                  className="form-control"
                  placeholder="City"
                  {...formik.getFieldProps("address.city")}

                />
                {formik.touched.address?.city && formik.errors.address?.city && (
                  <div className="text-danger">{formik.errors.address?.city}</div>
                )}
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="address.state" className="form-label" style={{ color: "#999696" }}>
                  State
                </label>
                <input
                  type="text"
                  id="address.state"
                  className="form-control"
                  placeholder="State"
                  {...formik.getFieldProps("address.state")}

                />
                {formik.touched.address?.state && formik.errors.address?.state && (
                  <div className="text-danger">{formik.errors.address?.state}</div>
                )}
              </div>

              <div className="col-md-6">
                <label htmlFor="address.pincode" className="form-label" style={{ color: "#999696" }}>
                  Pincode
                </label>
                <input
                  type="text"
                  id="address.pincode"
                  className="form-control"
                  placeholder="Pincode"
                  {...formik.getFieldProps("address.pincode")}

                />
                {formik.touched.address?.pincode && formik.errors.address?.pincode && (
                  <div className="text-danger">{formik.errors.address?.pincode}</div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <Button
                type="submit"
                style={{
                  background: "#D65246",
                  color: "white",
                  minWidth: "120px",
                  borderRadius: "8px",
                }}
              >
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={onHide}
                style={{
                  background: "#F3F4F6",
                  color: "#374151",
                  minWidth: "120px",
                  borderRadius: "8px",
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default EditUserModal;

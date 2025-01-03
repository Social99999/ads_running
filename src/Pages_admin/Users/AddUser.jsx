import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { addUser } from "../../Components_web/Api/Webapi";

const AddUser = () => {

    const initialValues = {
        username: "",
        email: "",
        password: "",
        contact: "",
        category: "",
        address: {
            street: "",
            city: "",
            state: "",
            pincode: ""
        }
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string().required("Username is required").min(3, "Username must be at least 3 characters long"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().required("Password is required").min(6, "Password must be at least 6 characters long"),
        contact: Yup.string().required("Contact is required").matches(/^[0-9]{10}$/, "Please enter a valid 10-digit contact number"),
        category: Yup.string().required("Category is required"),
        address: Yup.object().shape({
            street: Yup.string().required("Street address is required"),
            city: Yup.string().required("City is required"),
            state: Yup.string().required("State is required"),
            pincode: Yup.string().required("Pincode is required").matches(/^[0-9]{6}$/, "Please enter a valid 6-digit pincode"),
        }),
    });
    

    const navigate = useNavigate();

    const onSubmit = async (values) => {
        const res = await addUser(values);
        if (res.status) {
            navigate('/merchant');
        }
    };

    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
        >
            {(formik) => (
                <Form className="user-form">
                    {/* Username Field */}
                    <div className="row input-box">
                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">

                            <Field
                                type="text"
                                name="username"
                                className="form-control"
                                placeholder="Username"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="username" component="div" className="error text-danger ps-2" />
                        </div>

                        {/* Email Field */}

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="email"
                                name="email"
                                className="form-control"
                                placeholder="Email"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="email" component="div" className="error text-danger ps-2" />
                        </div>

                        {/* Password Field */}

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="password"
                                name="password"
                                className="form-control"
                                placeholder="Password"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="password" component="div" className="error text-danger ps-2" />
                        </div>

                        {/* Contact Number */}

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="contact"
                                className="form-control"
                                placeholder="Contact Number"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="contact" component="div" className="error text-danger ps-2" />
                        </div>

                        {/* Category Field */}

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="category"
                                className="form-control"
                                placeholder="Category"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="category" component="div" className="error text-danger ps-2" />
                        </div>

                        {/* Address Fields */}

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="address.street"
                                className="form-control"
                                placeholder="Street Address"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="address.street" component="div" className="error text-danger ps-2" />
                        </div>

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="address.city"
                                className="form-control"
                                placeholder="City"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="address.city" component="div" className="error text-danger ps-2" />
                        </div>

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="address.state"
                                className="form-control"
                                placeholder="State"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="address.state" component="div" className="error text-danger ps-2" />
                        </div>

                        <div className="input-error col-xxl-5 col-xl-4 col-lg-5 col-md-6 col-sm-5 col-12 mb-3">
                            <Field
                                type="text"
                                name="address.pincode"
                                className="form-control"
                                placeholder="Pincode"
                                style={{ height: "4.5em", border: "1px solid #E6E6E6", borderRadius: "5px" }}
                            />
                            <ErrorMessage name="address.pincode" component="div" className="error text-danger ps-2" />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn rounded-2 m-3 p-2 fw-bold" style={{ width: "150px", background: "#d65246", color: "white" }}>
                            Save
                        </button>
                        <button type="button" className="btn rounded-2 m-3 p-2 fw-bold" style={{ width: "150px", background: "#FFF", color: "#000" }} onClick={() => navigate('/merchant')}>
                            Cancel
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default AddUser;

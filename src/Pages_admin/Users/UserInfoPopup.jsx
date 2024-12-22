import React from "react";
import { Modal, ModalBody, ModalHeader } from "react-bootstrap";

const UserInfoModal = ({ user, onHide }) => {
    if (!user) return null;

    return (
        <Modal show={true} onHide={onHide} centered>
            <ModalHeader closeButton className="bg-primary text-white">
                <h5 className="mb-0">User Information</h5>
            </ModalHeader>
            <ModalBody className="p-4">
                <div className="user-details">
                    <div className="card mb-4 shadow-sm">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-3 text-primary">Personal Details</h6>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">User name:</span>
                                <span className="fw-bold">{user.username}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Email:</span>
                                <span className="fw-bold">{user.email}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Contact Number:</span>
                                <span className="fw-bold">{user.contact}</span>
                            </div>
                         
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-muted">Created By Admin:</span>
                                <span className={`badge ${user.createdByAdmin ? 'bg-success' : 'bg-secondary'}`}>
                                    {user.createdByAdmin ? "Yes" : "No"}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h6 className="card-subtitle mb-3 text-primary">Address Information</h6>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">Street:</span>
                                <span className="fw-bold">{user.address.street}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">City:</span>
                                <span className="fw-bold">{user.address.city}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <span className="text-muted">State :</span>
                                <span className="fw-bold">{user.address.state}</span>
                            </div>
                            <div className="d-flex justify-content-between align-items-center">
                                <span className="text-muted">Pincode:</span>
                                <span className="fw-bold">{user.address.pincode}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </ModalBody>
        </Modal>
    );
};

export default UserInfoModal;

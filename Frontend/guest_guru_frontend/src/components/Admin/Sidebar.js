
import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import {NavLink} from "react-router-dom";

function Sidebar() {
    const [modalIsOpenL, setModalIsOpenL] = useState(false);
  //create a function  that calls the api of admin check
  const checkAdmin = async () => {
    const response = await fetch("http://localhost:8000/admincheck/", {
      method: "GET",
      credentials: "include",
    });

    //if the status code is not equals to 200, redirect to login page
    if (response.status !== 200) {
      window.location.href = "/login";
    }
  };

  useEffect(() => {
    checkAdmin();
  }, []);
  //if the status code is equals to 2

  const logout = () => {
    fetch("http://localhost:8000/logout/", {
      method: "POST",
      credentials: "include",
    }).then(() => {
      swal("Logged out successfully", {
        icon: "success",
      });
      window.location.href = "/login";
    });
  };

  const openModal = () => {
    setModalIsOpenL(true);
  };

  const closeModal = () => {
    setModalIsOpenL(false);
  };
  return (
    <div>
        <div className="sidebar">
        <h3 className="sidebar-heading">Admin Panel</h3>
        <ul className="sidebar-menu">
          <li>
            <NavLink to="/dashboard" >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/room-dash">Rooms</NavLink>
          </li>
          {/* <li>
            <NavLink to="#">Event List</NavLink>
          </li> */}
          <li>
            <NavLink to="/user">User List</NavLink>
          </li>
          <li>
            <NavLink to="/booking">Bookings</NavLink>
          </li>
          <li>
            <NavLink to="/facilitites-dash">Facilities</NavLink>
          </li>
          <li>
            <i class="fa-solid fa-right-from-bracket" onClick={openModal}>
              
            </i> Logout
            <Modal show={modalIsOpenL} onHide={closeModal} centered>
              <Modal.Header closeButton>
                <Modal.Title>Logout</Modal.Title>
              </Modal.Header>
              <Modal.Body>Are you sure you want to logout?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={logout}>
                  Logout
                </Button>
              </Modal.Footer>
            </Modal>
          </li>
        </ul>
      </div>
    </div>
  )
}
export default Sidebar

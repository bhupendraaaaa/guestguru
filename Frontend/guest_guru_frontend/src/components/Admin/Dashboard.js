import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import swal from "sweetalert";
import Sidebar from "./Sidebar";



function Dashboard() {
  
  return (
    <div className="App">
      <Sidebar/>

      <div className="content">
        <h2>Dashboard</h2>
        <p>Welcome to the admin dashboard.</p>
      </div>
    </div>
  );
}

export default Dashboard;

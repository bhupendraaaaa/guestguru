import React, { useEffect } from 'react';
import './Dashboard.css';



function Dashboard() {

  //create a function  that calls the api of admin check
  const checkAdmin = async () => {
    
    const response = await fetch('http://localhost:8000/admincheck/', {
      method: 'GET',
      credentials: 'include'
    });
  

  //if the status code is not equals to 200, redirect to login page
  if (response.status !== 200) {
    window.location.href = '/login';
  }
}

  useEffect(() => {checkAdmin();}, []);
  //if the status code is equals to 2
    return (
      <div className="App">
        <div className="sidebar">
          <h3 className="sidebar-heading">Admin Panel</h3>
          <ul className="sidebar-menu">
            <li><a href=""  className='active'>Dashboard</a></li>
            <li><a href="/room-dash">Rooms</a></li>
            <li><a href="#">Event List</a></li>
            <li><a href="/user">User List</a></li>
            <li><a href="/booking">Bookings</a></li>
            <li><i class="fa-solid fa-right-from-bracket">Logout</i></li>
          </ul>
        </div>
          
        <div className="content">
          <h2>Dashboard</h2>
          <p>Welcome to the admin dashboard.</p>
        </div>
      </div>
    );
  }

export default Dashboard;

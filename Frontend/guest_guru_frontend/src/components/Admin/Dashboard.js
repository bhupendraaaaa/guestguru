import React from 'react';
import './Dashboard.css';


function Dashboard() {
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

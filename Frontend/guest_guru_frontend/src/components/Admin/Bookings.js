import React from 'react'
import './Dashboard.css';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

 function Bookings() {
  return (
    <div>
        <div className="App">
        <div className="sidebar">
            <h3 className="sidebar-heading">Admin Panel</h3>
            <ul className="sidebar-menu">
            <li><a href=""  className='active'>Dashboard</a></li>
            <li><a href="/room_dash">Rooms</a></li>
            <li><a href="#">Event List</a></li>
            <li><a href="/user">User List</a></li>
            <li><a href="#">Bookings</a></li>
            </ul>
        </div>
            
        <div className="content">
            <h2>Bookings</h2>
            <p>Welcome to the Booking dashboard.</p>
        </div>
    </div>
    </div>

  )
}
export default Bookings 

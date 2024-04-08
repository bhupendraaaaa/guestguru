import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './Dashboard.css';

function Userlist() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    let api = 'http://localhost:8000/allusers/';
    const response = await fetch(api, {
      method: 'GET',
      credentials: 'include'
  });
    const data = await response.json();
    console.log(data);

    setUsers(data);
  }

  useEffect(() => {
    getUsers();
    // Invoke the function
  }, []); // Add missing closing brackets

  return (
    <div>
      <div className="App">
        <div className="sidebar">
          <h3 className="sidebar-heading">Admin Panel</h3>
          <ul className="sidebar-menu">
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="#" className='active'>Rooms</a></li>
            <li><a href="#">Event List</a></li>
            <li><a href="#">User List</a></li>
            <li><a href="#">Bookings</a></li>
          </ul>
        </div>

        <div className="content">
          <h2 className='mb-3 text-start'>Add User</h2>

          <h2 className='mt-5 mb-3 text-start'>Registered User Details</h2>

          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>Password</th>
              </tr>
            </thead>

            <tbody>
              {users.map((User) => (
                <tr key={User.id}>
                  <td>{User.id}</td>
                  <td>{User.firstname}</td>
                  <td>{User.lastname}</td>
                  <td>{User.email}</td>
                  <td>{User.address}</td>
                  <td>{User.password}</td>
                  <td><Button variant="primary" >Edit</Button></td>
                  <td><Button variant="danger" >Delete</Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

    </div>
  )
}
export default Userlist 
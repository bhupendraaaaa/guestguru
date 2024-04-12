import React, { useState, useEffect } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import './Dashboard.css';
import Form from 'react-bootstrap/Form';


function Userlist() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');


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
            <li><a href="/room-dash" className='active'>Rooms</a></li>
            <li><a href="#">Event List</a></li>
            <li><a href="/user">User List</a></li>
            <li><a href="/booking">Bookings</a></li>
          </ul>
        </div>


        <div className="content">
          <h2 className='mb-3 text-start'>Add User</h2>


        <Form>
          <div className="row">
            <div className="col">
              <Form.Group 
              className="mb-3" 
              controlId="formBasicEmail"
              >
                <Form.Label>First Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
              <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              >
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </div>


            <div className="col">
              <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              >
                <Form.Label>Email</Form.Label>
                <Form.Control
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              >
                <Form.Label>Phone</Form.Label>
                <Form.Control
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </div>
            
            <div className="col">
              <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              >
                <Form.Label>Address</Form.Label>
                <Form.Control
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                />
              </Form.Group>
              <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              >
                <Form.Label>Password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="col">
              <Button
              variant="primary"
              type="submit"
              >
                Add User
              </Button>


            
            </div>
          </div>
        </Form>

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
            <h2 className='mt-5 mb-3 text-start'>Registered User Details</h2>

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
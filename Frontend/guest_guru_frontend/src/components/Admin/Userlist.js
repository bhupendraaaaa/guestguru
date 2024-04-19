import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import "./Dashboard.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

function Userlist() {
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const getUsers = async () => {
    let api = "http://localhost:8000/allusers/";
    const response = await fetch(api, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    console.log(data);

    setUsers(data);
  };

  useEffect(() => {
    getUsers();
    // Invoke the function
  }, []);

  const handleUser = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("password", password);
    formData.append("role", role);

    let addUser = "http://localhost:8000/registration/";

    let addUserResponse = await fetch(addUser, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    let parsedData = await addUserResponse.json();
    console.log(parsedData);
    console.log(formData);

    if (addUserResponse.status === 201) {
      alert("User Added Successfully");
      getUsers();
    } else {
      if (parsedData.firstname) {
        alert("First Name is required");
      } else if (parsedData.lastname) {
        alert("Last Name is required");
      } else if (parsedData.email) {
        alert("Email is required");
      } else if (parsedData.phone) {
        alert("Phone is required");
      } else if (parsedData.address) {
        alert("Address is required");
      } else if (parsedData.password) {
        alert("Password is required");
      } else if (parsedData.role) {
        alert("Role is required");
      }
    }
  };

  const openModal = (User) => {
    setModalIsOpen(true);

    setFirstName(User.firstname);
    setLastName(User.lastname);
    setEmail(User.email);
    setPhone(User.phone);
    setAddress(User.address);
    setPassword(User.password);
    setRole(User.role);
    setUserId(User.id);
    console.log("user", userId);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleUserEdit = async () => {
    const formData = new FormData();
    formData.append("firstname", firstName);
    formData.append("lastname", lastName);
    // formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    // formData.append("password", password);
    formData.append("role", role);

    let response = await fetch(`http://localhost:8000/useredit/${userId}/`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      alert("User Updated Successfully");
      getUsers();
      closeModal();
      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPassword("");
      setRole("");
      setUserId("");
    }
  };

  const handleUserDelete = async (id) => {
    let response = await fetch(`http://localhost:8000/delete/${id}`, {
      method: "POST",
      credentials: "include",
    });
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      alert("User Deleted Successfully");
      getUsers();
      window.location.reload();
    } 
  };
  return (
    <div>
      <div className="App">
        <div className="sidebar">
          <h3 className="sidebar-heading">Admin Panel</h3>
          <ul className="sidebar-menu">
            <li>
              <a href="/dashboard">Dashboard</a>
            </li>
            <li>
              <a href="/room-dash" className="active">
                Rooms
              </a>
            </li>
            <li>
              <a href="#">Event List</a>
            </li>
            <li>
              <a href="/user">User List</a>
            </li>
            <li>
              <a href="/booking">Bookings</a>
            </li>
          </ul>
        </div>

        <div className="content">
          <h2 className="mb-3 text-start">Add User</h2>

          <Form>
            <div className="row">
              <div className="col">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="col">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="col">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Phone Number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Your Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </Form.Group>
              </div>

              <div className="col">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Role</Form.Label>
                  <Form.Control
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="guest">Guest</option>
                  </Form.Control>
                </Form.Group>
              </div>
              <div className="col">
                <Button variant="primary" type="submit" onClick={handleUser}>
                  Add User
                </Button>
              </div>
            </div>
          </Form>
          <h2 className="mt-5 mb-3 text-start">Registered User Details</h2>
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
                  <td>
                    <Button variant="primary" onClick={() => openModal(User)}>
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button 
                    variant="danger"
                    onClick={() => handleUserDelete(User.id)}
                    >Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="modal">
            <Modal show={modalIsOpen} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit User</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter Your Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Your Address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Role</Form.Label>
                    <Form.Control
                      as="select"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                    >
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      <option value="guest">Guest</option>
                    </Form.Control>
                  </Form.Group>
                  <Button variant="primary" onClick={handleUserEdit}>
                    Update User
                  </Button>
                </Form>
              </Modal.Body>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Userlist;

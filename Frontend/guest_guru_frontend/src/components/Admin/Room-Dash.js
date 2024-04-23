import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import Sidebar from "./Sidebar";
import swal from "sweetalert";

function App() {
  const [roomList, setRoomList] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomImage, setRoomImage] = useState("");
  const [roomPrice, setRoomPrice] = useState("");
  const [roomCapacity, setRoomCapacity] = useState("");
  const [roomDescription, setRoomDescription] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [roomId, setRoomId] = useState("");

  useEffect(() => {
    const getRooms = async () => {
      const response = await fetch("http://localhost:8000/book/room/");
      const data = await response.json();
      setRooms(data);
      console.log(data);
    };
    getRooms();
  }, []);

  const handleRoom = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("room_type", roomName);
    if (roomImage && roomImage.length > 0) {
      formData.append("image", roomImage[0]);
    }
    formData.append("price", roomPrice);
    formData.append("capacity", roomCapacity);
    formData.append("description", roomDescription);
    formData.append("room_no", roomNumber);

    let addRoom = "http://localhost:8000/book/room/";

    let addRoomResponse = await fetch(addRoom, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    let parsedData = await addRoomResponse.json();
    console.log(parsedData);
    console.log(formData);

    if (addRoomResponse.status === 201) {
      swal({
        title: "Room Added Successfully",
        icon: "success",
        button: "OK",
      });
      setRoomCapacity("");
      setRoomDescription("");
      setRoomName("");
      setRoomPrice("");
      setRoomNumber("");
      fetchRoomList();

      
    } else {
      if (parsedData.room_type) {
        alert(parsedData.room_type);
      } else if (parsedData.image) {
        alert(parsedData.image);
      } else if (parsedData.price) {
        alert(parsedData.price);
      } else if (parsedData.capacity) {
        alert(parsedData.capacity);
      } else if (parsedData.description) {
        alert(parsedData.description);
      }
    }
  };

  const fetchRoomList = () => {
    fetch("http://localhost:8000/book/room/")
      .then((response) => response.json())
      .then((data) => {
        setRoomList(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("room_type", roomName);
    formData.append("price", roomPrice);
    formData.append("capacity", roomCapacity);
    formData.append("description", roomDescription);
    formData.append("room_no", roomNumber);

    let response = await fetch(
      `http://localhost:8000/book/edit/${roomId}/`,
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal({
        title: "Room Updated Successfully",
        icon: "success",
        button: "OK",
      });
      setRoomCapacity("");
      setRoomDescription("");
      setRoomName("");
      setRoomPrice("");
      setRoomNumber("");
      fetchRoomList();
      closeModal();
      window.location.reload();
    } 


  };

  const handleDelete = async (id) => {
    let response = await fetch(`http://localhost:8000/book/delete/${id}/`, {
      method: "POST",
      credentials: "include",
    });
    let parsedData = await response.json();
    console.log(parsedData);

    if (response.status === 200) {
      swal({
        title: "Room Deleted Successfully",
        icon: "success",
        button: "OK",
      });
      fetchRoomList();  
      window.location.reload();
    } 
  };


  const openModal = (room) => {
    setModelIsOpen(true);
    setRoomId(room.id);
    setRoomName(room.room_type);
    setRoomPrice(room.price);
    setRoomCapacity(room.capacity);
    setRoomDescription(room.description);
    setRoomNumber(room.room_no);
  };

  const closeModal = () => {
    setModelIsOpen(false);
  };

  return (
    <div>
      <div className="App">
       <Sidebar />

        <div className="content">
          <h2 className="mb-3 text-start text-large-bold">Add Room</h2>

          <Form>
            <div className="row">
              <div className="col">
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Room Name</Form.Label>
                  <Form.Control
                    
                    type="text"
                    placeholder="Enter room name"
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    
                  />
                </Form.Group>
              </div>
              <div className="mb-3">
                <label for="formFile" className="form-label">
                  Room Image
                </label>
                <input
                  className="form-control"
                  type="file"
                  id="formFile"
                  onChange={(e) => {
                    let file = e.target.files[0];
                    setRoomImage(file);
                  }}
                />
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Room Price</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter room price"
                    value={roomPrice}
                    onChange={(e) => setRoomPrice(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Room Capacity</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter room capacity"
                    value={roomCapacity}
                    onChange={(e) => setRoomCapacity(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Room No.</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Enter room number"
                    value={roomNumber}
                    onChange={(e) => setRoomNumber(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group
                  className="mb-3 text-start"
                  controlId="formBasicEmail"
                >
                  <Form.Label>Room Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter room description"
                    value={roomDescription}
                    onChange={(e) => setRoomDescription(e.target.value)}
                  />
                </Form.Group>
              </div>
            </div>

            <Button variant="primary" type="submit" onClick={handleRoom}>
              Add Rooms
            </Button>
          </Form>

          <h2 className="mt-5 mb-3 text-start text-large-bold">Room Details</h2>

          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Room No.</th>
                <th>Room Name</th>
                <th>Room Image</th>
                <th>Room Price</th>
                <th>Room Capacity</th>
                <th>Room Description</th>

                <th colSpan={2}>Action</th>
              </tr>
            </thead>

            <tbody>
              {rooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.room_no}</td>
                  <td>{room.room_type}</td>
                  <td>
                    <img src={room.image} alt="Room 1" width={"200px"} />
                  </td>
                  <td>{room.price}</td>
                  <td>{room.capacity}</td>
                  <td>{room.description}</td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => openModal(room)}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(room.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <div className="modal">
            <Modal show={modelIsOpen} onHide={closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Room</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group
                    className="mb-3 text-start"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Room Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter room name"
                      value={roomName}
                      onChange={(e) => setRoomName(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-start"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Room Price</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter room price"
                      value={roomPrice}
                      onChange={(e) => setRoomPrice(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-start"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Room Capacity</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter room capacity"
                      value={roomCapacity}
                      onChange={(e) => setRoomCapacity(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-start"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Room No.</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Enter room number"
                      value={roomNumber}
                      onChange={(e) => setRoomNumber(e.target.value)}
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 text-start"
                    controlId="formBasicEmail"
                  >
                    <Form.Label>Room Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      placeholder="Enter room description"
                      value={roomDescription}
                      onChange={(e) => setRoomDescription(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" onClick={handleEdit}>
                    Update Room
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

export default App;

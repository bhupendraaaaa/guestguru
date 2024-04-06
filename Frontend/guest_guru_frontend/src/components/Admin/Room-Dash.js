import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';

function App() {
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState([]);
  const [roomImage, setRoomImage] = useState("");
  const [roomPrice, setRoomPrice] = useState([]);
  const [roomCapacity, setRoomCapacity] = useState([]);
  const [roomDescription, setRoomDescription] = useState([]);
  const [roomNumber, setRoomNumber] = useState([]);


  useEffect(() => {
    const getRooms = async () => {
      const response = await fetch('http://localhost:8000/book/room/');
      const data = await response.json();
      setRooms(data);
      console.log(data);
    }
    getRooms();
  }, []);

  const handleRoom = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('room_type', roomName);
    if (roomImage && roomImage.length > 0) {
      formData.append('image', roomImage[0]);
    }
    formData.append('price', roomPrice);
    formData.append('capacity', roomCapacity);
    formData.append('description', roomDescription);
    formData.append('room_no', roomNumber);
    formData.append('image',roomImage)

    let addRoom = 'http://localhost:8000/book/room/'

    let addRoomResponse = await fetch(addRoom, {
      method: 'POST',
      body: formData,
      credentials:'include'
    });

    let parsedData = await addRoomResponse.json();
    console.log(parsedData);
    console.log(formData)

    if (addRoomResponse.status === 201) {
      alert('Room Added Successfully');
      // setRoomName('');
      // setRoomImage('');
      // setRoomPrice('');
      // setRoomCapacity('');
      // setRoomDescription('');
      // return;
    }

    else {
      if (parsedData.room_type) {
        alert(parsedData.room_type);
      }
      else if (parsedData.image) {
        alert(parsedData.image);
      }
      else if (parsedData.price) {
        alert(parsedData.price);
      }
      else if (parsedData.capacity) {
        alert(parsedData.capacity);
      }
      else if (parsedData.description) {
        alert(parsedData.description);
      }
    }
  }

  return (
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
        <h2 className='mb-3 text-start'>Add Room</h2>

        <Form>
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label >Room Name</Form.Label>
                <Form.Control type="text" placeholder="Enter room name" value={roomName} onChange={(e) => setRoomName(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Room Image</Form.Label>
                <Form.Control type="file" value={roomImage} onChange={(e) => {
                      let file = e.target.files[0];
                      setRoomImage(file)
                }
                  } />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Room Price</Form.Label>
                <Form.Control type="text" placeholder="Enter room price" value={roomPrice} onChange={(e) => setRoomPrice(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Room Capacity</Form.Label>
                <Form.Control type="text" placeholder="Enter room capacity" value={roomCapacity} onChange={(e) => setRoomCapacity(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Room No.</Form.Label>
                <Form.Control type='number' placeholder="Enter room number" value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Room Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter room description" value={roomDescription} onChange={(e) => setRoomDescription(e.target.value)} />
              </Form.Group>
            </div>
          </div>

          <Button variant="primary" type="submit" onClick={handleRoom}>
            Submit
          </Button>
        </Form>

        <h2 className='mt-5 mb-3 text-start'>Room Details</h2>

        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
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
                <td>{room.room_type}</td>
                <td><img src={room.image} alt="Room 1" width={'200px'} /></td>
                <td>{room.price}</td>
                <td>{room.capacity}</td>
                <td>{room.description}</td>
                <td><Button variant="primary">Edit</Button></td>
                <td><Button variant="danger">Delete</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default App;
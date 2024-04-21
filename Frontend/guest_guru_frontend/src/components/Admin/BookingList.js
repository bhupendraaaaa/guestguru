import React from 'react';
import { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Sidebar from "./Sidebar";

function BookingList() {
    const [bookingList, setBookingList] = useState([]);
    const [roomType, setRoomType] = useState([]);
    const [checkInDate, setCheckInDate] = useState([]);
    const [checkOutDate, setCheckOutDate] = useState([]);
    const [guestCount, setGuestCount] = useState([]);
    const [modelIsOpen, setModelIsOpen] = useState(false);
    const [room, setRoom] = useState([]);
    const [bookingId, setBookingId] = useState("");

    const getBookings = async () => {
        let api = 'http://localhost:8000/book/booking';
        const response = await fetch(api, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        console.log(data);
        setBookingList(data);
    }

    useEffect(() => {
        getBookings();
    }, []);

    const handleBooking = async (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("room_type", roomType);
        formData.append("check_in", checkInDate);
        formData.append("check_out", checkOutDate);
        formData.append("guest_count", guestCount);

        let addBooking = "http://localhost:8000/book/booking";

        let addBookingResponse = await fetch(addBooking, {
            method: "POST",
            body: formData,
            credentials: "include",
        });

        let parsedData = await addBookingResponse.json();
        console.log(parsedData);
        console.log(formData);

        if (addBookingResponse.status === 201) {
            alert("Booking Added Successfully");
            getBookings();

        } else {
            if (parsedData.room_type) {
                alert("Room Type is required");
            } else if (parsedData.check_in) {
                alert("Check-In Date is required");
            } else if (parsedData.check_out) {
                alert("Check-Out Date is required");
            } else if (parsedData.guest_count) {
                alert("Guest Count is required");
            }
        }
    }

    const handleDelete = async (id) => {
      let response = await fetch(`http://localhost:8000/book/bookingdelete/${id}/`, {
          method: 'POST',
          credentials: 'include',
    });
    let parsedData = await response.json();
    console.log(parsedData);
    if (response.status === 200) {
        alert("Booking Deleted Successfully");
        window.location.reload();
    } 
    };

    const handleBookingEdit = async (e) => {
      const formData = new FormData();
      formData.append("room", room.id);
      formData.append("room_type", roomType);
      
      formData.append("check_in", checkInDate);
      formData.append("check_out", checkOutDate);
      formData.append("guest_count", guestCount);

      let response = await fetch(`http://localhost:8000/book/bookingedit/${bookingId}/`, {
          method: 'POST',
          body: formData,
          credentials: 'include',
      });

      let parsedData = await response.json();
      console.log(parsedData);
      if (response.status === 200) {
          alert("Booking Updated Successfully");
          getBookings();
          closeModal();
          setCheckInDate("");
          setCheckOutDate("");
          setGuestCount("");
      }
    };
        


            

    const openModal = (booking) => {
        setModelIsOpen(true);
        setBookingId(booking.id);
        setRoomType(booking.room.room_type);
        setCheckInDate(booking.check_in);
        setCheckOutDate(booking.check_out);
        setGuestCount(booking.guest_count);

    }

    const closeModal = () => {
        setModelIsOpen(false);
    }

  return (
    <div className='App'>
      <Sidebar />
      <div className='content'>
        <h2 className="mb-3 text-start">Booking List</h2>

        <form>
          <div className="row">
            <div className="col">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Room Type</Form.Label>
                <Form.Control type="text" placeholder="Enter Room Type" value={roomType} onChange={
                    (e) => setRoomType(e.target.value)
                } />
              </Form.Group>
            </div>

            <div className="col">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Check-In Date </Form.Label>
                <Form.Control type="date" placeholder="Enter Check-in Date" value={checkInDate} onChange={
                    (e) => setCheckInDate(e.target.value)
                } />
              </Form.Group>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Check-Out Date</Form.Label>
                <Form.Control type="date" placeholder="Enter-out Date"  value={checkOutDate} onChange={
                    (e) => setCheckOutDate(e.target.value)
                
                }/>
              </Form.Group>
            </div>

            <div className="col">
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>No. of Guest</Form.Label>
                <Form.Control type="text" placeholder="Enter Guest Count" value={guestCount} onChange={
                    (e) => setGuestCount(e.target.value)
                } />
              </Form.Group>
            </div>
          </div>

            <Button variant="primary" type="submit" onClick={handleBooking}>
                Submit
            </Button>
        </form>
        <h2 className='mt-5 mb-3 text-start'>Booking Details</h2>
        <Table responsive>
            <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Room Type</th>
                    <th>Check-In Date</th>
                    <th>Check-Out Date</th>
                    <th>No. of Guests</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookingList.map((booking) => ( 
                    <tr key={booking.id}>
                        <td>{booking.id}</td>
                        <td>{booking.room.room_type}</td>
                        <td>{booking.check_in}</td>
                        <td>{booking.check_out}</td>
                        <td>{booking.guest_count}</td>
                        <td><Button variant="primary" onClick={() => openModal(booking)}>Edit</Button></td>
                        <td><Button variant="danger" onClick={() => handleDelete(booking.id)}>Delete</Button></td>
                    </tr>
                ))}
            </tbody>
        </Table>
        <div className="modal">
          <Modal show={modelIsOpen} onHide={closeModal}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Booking</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Room Type</Form.Label>
                <Form.Control type="text" placeholder="Enter Room Type" value={roomType} onChange={
                    (e) => setRoomType(e.target.value)
                } />
              </Form.Group>
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Check-In Date </Form.Label>
                <Form.Control type="date" placeholder="Enter Check-in Date" value={checkInDate} onChange={
                    (e) => setCheckInDate(e.target.value)
                } />
              </Form.Group>
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>Check-Out Date</Form.Label>
                <Form.Control type="date" placeholder="Enter-out Date"  value={checkOutDate} onChange={
                    (e) => setCheckOutDate(e.target.value)
                
                }/>
              </Form.Group>
              <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                <Form.Label>No. of Guest</Form.Label>
                <Form.Control type="text" placeholder="Enter Guest Count" value={guestCount} onChange={
                    (e) => setGuestCount(e.target.value)
                } />
              </Form.Group>
              <Button variant="primary" type="submit" onClick={handleBookingEdit}>
                Update Booking
              </Button>
            </Modal.Body>
          </Modal>
        </div>
        
      </div>
    </div>
  )
}

export default BookingList;

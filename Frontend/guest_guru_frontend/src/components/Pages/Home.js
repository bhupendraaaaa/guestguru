import React, { useState } from 'react';
import './Home.css';
import backGround from '../Assets/about.jpg';
import roomFirst from '../Assets/room1.jpg';
import roomSecond from '../Assets/room2.jpg';
import roomThird from '../Assets/room3.jpg';


function Home() {
  const [bookings, setBookings] = useState();
  const [check_in, setCheckIn] = useState();
  const [check_out, setCheckOut] = useState();
  const [guest_count, setGuestCount] = useState();
  const [room_type, setRoomType] = useState();

  const handleBooking = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append('check_in', check_in);
    formData.append('check_out', check_out);
    formData.append('guest_count', guest_count);
    formData.append('room_type', room_type);


    let booking = 'http://localhost:8000/book/booking/'
    let bookingResponse = await fetch(booking, {
      method: 'POST',
      body: formData,
      credentials: 'include' 
    });
     
    let parsedData = await bookingResponse.json();
    

    if (bookingResponse.status === 201) {
      alert('Booking Successful');
      setBookings([bookings, parsedData]);
      return;
    }else if(bookingResponse.status === 406){
        alert('Room is already booked')
    }
    else {
      console.log(parsedData);
      if (parsedData.check_in) {
        alert(parsedData.check_in);
      }
      else if (parsedData.check_out) {
        alert(parsedData.check_out);
      }
      else if (parsedData.guest_count) {
        alert(parsedData.guest_count);
      }
    }
  }

  return (
    <>
      <main className="main">
        <section className="hero">
          <div className="container-home">
            <h1>A Memorable Experience</h1>
            <p>
              "Unleashing Hospitality with Heart and Technology!"
            </p>
            <div className="booking">
              <div className="booking-item">
                <label htmlFor="check-in">Check-in</label>
                <input type="date" id="check-in" value={check_in} onChange={(e) => setCheckIn(e.target.value)} />
              </div>
              <div className="booking-item">
                <label htmlFor="check-out">Check-out</label>
                <input type="date" id="check-out" value={check_out} onChange={(e) => setCheckOut(e.target.value)} />
              </div>
              <div className="booking-item">
                <label htmlFor="guests">No. of Guests</label>
                <input type="number" id="guests" value={guest_count} onChange={(e) => setGuestCount(e.target.value)} />
              </div>
              <div className="booking-item">
                <label htmlFor="Type">Room Category</label>
                <select id="Type" value={room_type} onChange={(e) => setRoomType(e.target.value)}>
                  <option value="8">Single</option>
                  <option value="4">Double</option>
                  <option value="5">King Sized</option>
                  <option value="11">Deluxe Queen Room</option>
                  <option value="12">Ensuite Room</option>

                </select>
              </div>
              <div className="booking-item">
                <button onClick={handleBooking}>Book Now</button>
              </div>
            </div>
          </div>
        </section>

        <div className="container-home-about">
          <h2>About Guest Guru</h2>
          <div className="underline"></div>
          <div className="about-content">
            <p>
              Ladies and gentlemen, history keeps repeating itself but doesn't teach us any lessons. 'Never again' has turned into 'again and again and again.' So today, ladies and gentlemen, take Hotel Lunar as a wake-up call and a message to be our messenger that people are the ones who can change what they want to change.
              Ladies and gentlemen, history keeps repeating itself but doesn't teach us any lessons. 'Never again' has turned into 'again and again and again.' So today, ladies and gentlemen, take Hotel Lunar as a wake-up call and a message to be our messenger that people are the ones who can change what they want to change.
            </p>
            <div>
              <img src={backGround} alt="Hotel lobby with comfortable seating" />
            </div>
          </div>
          <button>Read More</button>
        </div>

        <section className="events" id="events">
          <div className="container-home-event">
            <h2>Events & Weddings</h2>
            <div className="underline"></div>
            <p>
              Ladies and gentlemen, history keeps repeating itself but doesn't teach us any lessons. 'Never again' has turned into 'again and again and again.' So today, ladies and gentlemen, take Hotel Lunar as a wake-up call and a message to be our messenger that people are the ones who can change what they want to change.
            </p>
          </div>
        </section>

        <section className="rooms-suites" id="rooms-suites">
          <div className="container-home-room">
            <h2>Our Galleries</h2>
            <div className="underline"></div>
            <div className="gallery">
              <div className="gallery-item">
                <img src={roomFirst} alt="Room 1" />
              </div>
              <div className="gallery-item">
                <img src={roomSecond} alt="Room 2" />
              </div>
              <div className="gallery-item">
                <img src={roomThird} alt="Room 3" />
              </div>
            </div>
            <button className="navigation-button prev-button"><i className="fa-solid fa-angles-left"></i></button>
            <button className="navigation-button next-button"><i className="fa-solid fa-angles-right"></i></button>


          </div>
        </section>
      </main>
    </>
  );
}

export default Home;

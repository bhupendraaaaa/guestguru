import React, { useEffect, useState } from "react";
import "./Home.css";
import backGround from "../Assets/about.jpg";
import roomFirst from "../Assets/room1.jpg";
import roomSecond from "../Assets/room2.jpg";
import roomThird from "../Assets/room3.jpg";
import { Navigate, useNavigate } from "react-router-dom";
import swal from "sweetalert";

function Home() {
  const navigate = useNavigate();

  const [user, setUser] = useState("");

  useEffect(() => {
    // Function to check if the user is logged in
    const checkuser = async () => {
      try {
        const response = await fetch("http://localhost:8000/usercheck/", {
          method: "GET",
          credentials: "include",
        });

        let data = await response.json();

        if (response.status === 200) {
          setUser(data.msg);
        }
      } catch (error) {
        console.error("Error checking user:", error);
      }
    };

    checkuser();

    if (user === "admin") {
      navigate("/dashboard");
    } else {
      navigate("/");
    }
  }, []);

  const [bookings, setBookings] = useState();
  const [check_in, setCheckIn] = useState();
  const [check_out, setCheckOut] = useState();
  const [guest_count, setGuestCount] = useState();
  const [room_type, setRoomType] = useState();

  useEffect(() => {
    navigate("/");
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("check_in", check_in);
    formData.append("check_out", check_out);
    formData.append("guest_count", guest_count);
    formData.append("room_type", room_type);

    let booking = "http://localhost:8000/book/booking/";
    let bookingResponse = await fetch(booking, {
      method: "POST",
      body: formData,
      credentials: "include",
    });

    var parsedData = await bookingResponse.json();

    if (bookingResponse.status === 201) {

      swal({
        title: "Booking Successful!",
        text: "Your booking has been confirmed",
        icon: "success",
        button: "OK",
      });
      setBookings([bookings, parsedData]);
      return;
    } else if (bookingResponse.status === 406) {
      swal({

        title: "Booking Unsuccessful!",
        text: "Room is already Booked !",
        icon: "error",
        button: "OK",
      });
      setCheckIn("");
      setCheckOut("");
      setGuestCount("");
      setRoomType("");

      
    } else {
      swal({
        title: "Booking Unsuccessful!",
        text: `${parsedData.msg}`,
        icon: "error",
        button: "OK",
      });
      setCheckIn("");
      setCheckOut("");
      setGuestCount("");
      setRoomType("");

    }
  };


  const handleReadMoreClick = () => {
    navigate("/about");
  }

  return (
    <>
      <main className="main">
        <section className="hero">
          <div className="container-home">
            <h1>A Memorable Experience</h1>
            <p>"Unleashing Hospitality with Heart and Technology!"</p>

            <form onSubmit={handleBooking}>
              <div className="booking">
                <div className="booking-item">
                  <label htmlFor="check-in">Check-in</label>
                  <input
                    required
                    type="date"
                    id="check-in"
                    value={check_in}
                    onChange={(e) => setCheckIn(e.target.value)}
                  />
                </div>
                <div className="booking-item">
                  <label htmlFor="check-out">Check-out</label>
                  <input
                    required
                    type="date"
                    id="check-out"
                    value={check_out}
                    onChange={(e) => setCheckOut(e.target.value)}
                  />
                </div>
                <div className="booking-item">
                  <label htmlFor="guests">No. of Guests</label>
                  <input
                    required
                    type="number"
                    id="guests"
                    value={guest_count}
                    onChange={(e) => setGuestCount(e.target.value)}
                  />
                </div>
                <div className="booking-item">
                  <label htmlFor="Type">Room Category</label>
                  <select
                    required
                    id="Type"
                    value={room_type}
                    onChange={(e) => setRoomType(e.target.value)}
                  >
                    <option disabled defaultChecked>Select Room</option>
                    <option value="9">Single Room</option>
                    <option value="4">Double</option>
                    <option value="10">King Sized</option>
                    <option value="11">Deluxe Queen Room</option>
                    <option value="12">Ensuite Room</option>
                    <option value="24">Standard Room</option>
                  </select>
                </div>
                <div className="booking-item">
                  <button type="submit">Book Now</button>
                </div>
              </div>
            </form>
          </div>
        </section>

        <div className="container-home-about">
          <h2>About Guest Guru</h2>
          <div className="underline"></div>
          <div className="about-content">
            <p>
              Ladies and gentlemen, history keeps repeating itself but doesn't
              teach us any lessons. 'Never again' has turned into 'again and
              again and again.' So today, ladies and gentlemen, take Hotel Lunar
              as a wake-up call and a message to be our messenger that people
              are the ones who can change what they want to change. Ladies and
              gentlemen, history keeps repeating itself but doesn't teach us any
              lessons. 'Never again' has turned into 'again and again and
              again.' So today, ladies and gentlemen, take Hotel Lunar as a
              wake-up call and a message to be our messenger that people are the
              ones who can change what they want to change. Ladies and gentlemen, history keeps repeating itself but doesn't teach us any lessons. 'Never again' has turned into 'again and again and again.' So today, ladies and gentlemen, take Hotel Lunar as a wake-up call and a message to be our messenger that people are the ones who can change what they want to change.
            </p>
            <div>
              <img
                src={backGround}
                alt="Hotel lobby with comfortable seating"
              />
            </div>
          </div>
          <button onClick={handleReadMoreClick}>Read More</button>
        </div>

        <section className="events" id="events">
          <div className="container-home-event">
            <h2>Events & Weddings</h2>
            <div className="underline"></div>
            <p>
              Ladies and gentlemen, history keeps repeating itself but doesn't
              teach us any lessons. 'Never again' has turned into 'again and
              again and again.' So today, ladies and gentlemen, take Hotel Lunar
              as a wake-up call and a message to be our messenger that people
              are the ones who can change what they want to change.
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
            <button className="navigation-button prev-button">
              <i className="fa-solid fa-angles-left"></i>
            </button>
            <button className="navigation-button next-button">
              <i className="fa-solid fa-angles-right"></i>
            </button>
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;

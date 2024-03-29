import React from 'react';
import './Home.css';
import backGround from '../Assets/about.jpg';
import roomFirst from '../Assets/room1.jpg';
import roomSecond from '../Assets/room2.jpg';
import roomThird from '../Assets/room3.jpg';

function Home() {
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
                <input type="date" id="check-in" />
              </div>
              <div className="booking-item">
                <label htmlFor="check-out">Check-out</label>
                <input type="date" id="check-out" />
              </div>
              <div className="booking-item">
                <label htmlFor="guests">No. of Guests</label>
                <input type="number" id="guests" />
              </div>
              <div className="booking-item">
                <label htmlFor="Type">Type</label>
                <input type="text" id="Type" />
              </div>
              <div className="booking-item">
                <button>Book Now</button>
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

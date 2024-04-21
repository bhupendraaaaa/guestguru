import React from 'react'
import './About.css';
import backGround from '../Assets/about.jpg';
import hero from '../Assets/our-blog-3.jpg';

 function About() {
  return (
    <div>
        <main className="main-about">
            <section className="hero-about">
                <div className="container-about">
                    <h1>About Us</h1>
                </div>
            </section>
            <div className="container-about-about">
                <div className="about">
                    <h2>Our Story</h2>
                    <div className="underline-about">
                        <div className="content-about">
                            <p>Guest Guru is a platform that connects travelers with local hosts. We believe that the best way to experience a destination is through the eyes of a local. Our mission is to provide travelers with a unique and authentic experience that goes beyond the traditional hotel stay. We want to help travelers discover hidden gems, explore local culture, and create lasting memories. Whether you are looking for a cozy apartment in the city or a beachfront villa, Guest Guru has the perfect accommodation for you. Our hosts are passionate about sharing their knowledge and love for their city, and they are committed to providing you with a memorable stay. So why stay in a hotel when you can stay with a local? Book your next trip with Guest Guru and experience the world like a true traveler.</p>
                        <div>
                            <img 
                            src ={hero}
                            />
                        </div>
                        </div>
                    </div>
                    {/* <p>Guest Guru is a platform that connects travelers with local hosts. We believe that the best way to experience a destination is through the eyes of a local. Our mission is to provide travelers with a unique and authentic experience that goes beyond the traditional hotel stay. We want to help travelers discover hidden gems, explore local culture, and create lasting memories. Whether you are looking for a cozy apartment in the city or a beachfront villa, Guest Guru has the perfect accommodation for you. Our hosts are passionate about sharing their knowledge and love for their city, and they are committed to providing you with a memorable stay. So why stay in a hotel when you can stay with a local? Book your next trip with Guest Guru and experience the world like a true traveler.</p> */}
                </div>
            </div>

            
        </main>
    </div>
  )
}
export default About;

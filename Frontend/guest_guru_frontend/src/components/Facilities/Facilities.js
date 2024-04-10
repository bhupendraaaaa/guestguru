import React from 'react'
import './Facilities.css';
import image2 from '../Assets/Facilities/2.png';
// import image2 from '../../images/2.jpg';
// import image3 from '../../images/3.jpg';
// import image4 from '../../images/4.jpg';


function Facilities() {
  return (
    <>
      <div className="hero-ser">
        <div className="ser-title">
          <h1>Our Facilities</h1>
        </div>
      </div>
      <section>
        <div className="ser-container">
          <div className="ser" key=''>
            <img src={image2} alt="Room 1" />
            <div className="ser-name">
              <h3>Facilitie Name</h3>
            </div>
            <p>Description</p>
          </div>
        </div>
          
      </section>
    </>
  )
}
export default Facilities;

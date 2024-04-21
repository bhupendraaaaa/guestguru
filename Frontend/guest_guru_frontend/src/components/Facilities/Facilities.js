import React, { useState, useEffect } from 'react';
import './Facilities.css';
function Facilities() {
    const [facilities, setfacilities] = useState([]);

    useEffect(() => {
        const getfacilities = async () => {
            const response = await fetch('http://localhost:8000/facility/view/');
            const data = await response.json();
            setfacilities(data);
            console.log(data);
        }
        getfacilities();

    }, []);
    return (
        <div>
            <div className="hero-room">
                <div className="room-title">
                    <h1>Facilities</h1>
                </div>
                <section>
                    <div className="room-container">
                        {facilities.map((Facility) => (
                            <div className="room" key={Facility.id}>
                                <img src={Facility.image} alt="Room 1" />
                                <div className="room-name">
                                    <h3>{Facility.name}</h3>
                                </div>
                                <p>{Facility.description} </p>
                                <p>&#8377;{Facility.price}</p>
                               
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    )
}
export default Facilities

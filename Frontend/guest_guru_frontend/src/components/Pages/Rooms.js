import React, { useState, useEffect } from 'react';
import './Room.css';
import room1 from '../Assets/Deluxe Ensuite Room.jpg';
import room2 from '../Assets/standard room.jpg';
import room3 from '../Assets/deluxe queen room.jpg';
import room4 from '../Assets/double bedroom.jpg';
import room5 from '../Assets/Ensuite Room.jpg';
import room6 from '../Assets/king ensuite bedroom.jpg';
import room7 from '../Assets/King Room.jpg';
import room8 from '../Assets/normal room.jpg';
function Rooms() {
    const [rooms, setRooms] = useState([]);
    useEffect(() => {
        const getRooms = async () => {
            const response = await fetch('http://localhost:8000/book/room/');
            const data = await response.json();
            setRooms(data);
            console.log(data);
        }
        getRooms();

    }, []);
    return (
        <div>
            <div className="hero-room">
                <div className="room-title">
                    <h1>Rooms & Suits</h1>
                </div>
                <section>
                    <div className="room-container">
                        {rooms.map((room) => (
                            <div className="room" key={room.id}>
                                <img src={room.image} alt="Room 1" />
                                <div className="room-name">
                                    <h3>{room.room_type}</h3>
                                </div>
                                <p>{room.capacity} Bedroom - {room.capacity} Guest</p>
                                <p>&#8377;{room.price} per night</p>
                                <button onClick={() => {
                                    window.location.href = `/description/${room.id}`
                                }
                                }>Readmore</button>
                            </div>
                        ))}
                    </div>
                </section>

            </div>
        </div>
    )
}
export default Rooms

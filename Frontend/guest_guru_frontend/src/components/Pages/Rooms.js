import React, { useState, useEffect } from 'react';
import './Room.css';
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

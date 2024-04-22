import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';


function Description() {
    const {id} = useParams();

    const[room, setRoom] = useState([]);

    useEffect(() => {
        const getRoom = async () => {
            const response = await fetch(`http://localhost:8000/book/room/${id}`);
            const data = await response.json();
            setRoom(data);
            console.log(data);
        }
        getRoom();

    }, [id]);

    return (
        <div>
            <div className="container-md">
                <div className="row mt-5 mb-5">
                    <div className="col">
                    <img src={room.image} alt="Room" className="img-fluid" style={{ height: '500px' , width: '500px'}} />
                    </div>
                    <div className="col">
                        <h2>{room.room_type}</h2>
                        <p>{room.description}</p>
                        <ul>
                        <li style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Capacity: {room.capacity}</li>
                        <li style={{ fontSize: '1.5em', fontWeight: 'bold' }}>Price: {room.price}</li>
                        </ul>
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Description;


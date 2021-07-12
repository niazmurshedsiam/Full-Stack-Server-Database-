import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from "react";
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBookings] = useState([]);
    const [loginInUser, setLoginnUser] = useContext(UserContext);
    useEffect(()=>{
        fetch('http://localhost:8000/bookings?email='+ loginInUser.email)
        .then(res=>res.json())
        .then(data=>setBookings(data))
    },[])
    return (
        <div>
            <h1>Booking: {bookings.length}</h1>

            {
                bookings.map(books => <div>{books.name} from: {(new Date(books.checkIn).toDateString('dd/MM/YYYY'))} to: {(new Date(books.checkOut).toDateString('dd/MM/YYYY'))}</div>)
            }
        </div>
    );
};

export default Bookings;
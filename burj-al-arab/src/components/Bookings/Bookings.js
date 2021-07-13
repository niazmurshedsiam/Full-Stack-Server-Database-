import React from 'react';
import { useContext } from 'react';
import { useState,useEffect } from "react";
import { UserContext } from '../../App';

const Bookings = () => {
    const [bookings,setBookings] = useState([]);
    const [loginInUser,setLoginInUser] = useContext(UserContext)
    useEffect(()=>{
        fetch('http://localhost:8000/bookings?email=' +loginInUser.email,{
            method:'GET',
            headers:{
                'Content-Type': 'application/json',
                authorization: `Bearer ${sessionStorage.getItem('token')}`
            }
        
        })
        .then(res=>res.json())
        .then(data=>setBookings(data))
    },[])
    return (
        <div>
            <h1>Bookings: {bookings.length}</h1>
            {
                bookings.map(books => <div key={books._id}>{books.name} from: {new Date(books.checkIn).toDateString('MM/DD/YYYY')}  to:  {new Date(books.checkOut).toDateString('MM/DD/YYYY')}</div>)
            }
        </div>
    );
};

export default Bookings

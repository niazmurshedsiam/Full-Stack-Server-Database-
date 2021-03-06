import React, { useEffect, useState } from 'react';
import Event from "./../Event/Event";

const Home = () => {
    const [events,setEvents] = useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/events')
        .then(res=>res.json())
        .then(data=> setEvents(data))
    },[])
    return (
        <div>
            <div>
            {
                events.map(event =><Event event={event}></Event>)
            }
        </div>
        </div>
    );
};

export default Home;
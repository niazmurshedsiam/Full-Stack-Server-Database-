import React from 'react';
import Event from "./../Event/Event";
const events = [
    {
        name: 'Child Support',
        pic: 'childSupport.png'
    },
    {
        name: 'Animal Shelter',
        pic: 'animalShelter.png'
    }
]
const Home = () => {

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
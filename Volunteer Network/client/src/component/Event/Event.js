import React from 'react';
const Event = ({event}) => {
    return (
        <div className="col-md-3">
            <img src={require(`../../images/${event.pic}`)} alt="" style={{height:'300px'}}/>
            <h3>{event.name}</h3>
        </div>
    );
};

export default Event;
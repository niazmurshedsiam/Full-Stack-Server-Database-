import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
const AddEvent = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [imageURL,setImageURL] = useState(null);
    const onSubmit = data => {
        const eventData = {
            name: data.name,
            imageURL: imageURL
        };
        const url = `http://localhost:5001/addEvent`;
      console.log(eventData);
      fetch(url,{
          method: 'POST',
          headers: {
              'content-type':'application/json'
          },
          body: JSON.stringify(eventData)
      })
      .then(res=>console.log('server side response',res))
      
    };

  const handleImageUpload = event =>{
    // console.log(event.target.files[0]);
    const imageData = new FormData();
    imageData.set('key','335045a2e20dfb20b2e75072ff553f1f');
    imageData.append('image',event.target.files[0]);
    axios.post('https://api.imgbb.com/1/upload',
    imageData)
      .then(function (response) {
        setImageURL(response.data.data.display_url);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
    return (
        <div style={{margin:"10px"}}>
            <form onSubmit={handleSubmit(onSubmit)}>
     
                <input name="name" defaultValue="New exciting event" {...register("example")}/>
                <br />
                <input type="file" name="exampleRequired" onChange={handleImageUpload}/>
                <br />
                <input type="submit"/>
            </form>
        </div>
    );
};

export default AddEvent;
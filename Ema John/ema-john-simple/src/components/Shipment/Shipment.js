import React from 'react';
import './Shipment.css';
import {useForm} from 'react-hook-form';
import { useContext } from 'react';
import { UserContext } from '../../App';
const Shipment = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const [loginInUser,setLoginInUser] = useContext(UserContext);
    const onSubmit = data => {
        console.log(data)
    };
  
    console.log(watch("example")); 
  
    return (
    <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
        <input name="name" defaultValue={loginInUser.name} {...register("exampleRequired", { required: true })} placeholder="Enter Your Name"/>
            {errors.name && <span className="error">Name is required</span>}
            
            <input name="email" defaultValue={loginInUser.email} {...register("exampleRequired", { required: true })} placeholder="Enter Your Email"/>
            {errors.email && <span className="error">Email is required</span>}
            
            <input name="address" defaultValue={loginInUser.address} {...register("exampleRequired", { required: true })} placeholder="Enter Your Address"/>
            {errors.address && <span className="error">Address is required</span>}
            
            <input name="country" defaultValue={loginInUser.country} {...register("exampleRequired", { required: true })} placeholder="Enter Your Country"/>
            {errors.country && <span className="error">Country is required</span>}
            
            <input name="zipcode" defaultValue={loginInUser.zipcode} {...register("exampleRequired", { required: true })} placeholder="Enter Your Zip Code"/>
            {errors.zipcode && <span className="error">Zip Code is required</span>}
        <input type="submit" />
    </form>
    );
};

export default Shipment;
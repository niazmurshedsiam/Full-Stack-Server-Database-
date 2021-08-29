import React from 'react';
import { useForm } from "react-hook-form";
const AddEvent = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const onSubmit = data => console.log(data);
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
     
                <input defaultValue="test" {...register("example")} />
                <br />
                <input {...register("exampleRequired", { required: true })} />
                <br />
                <input type="submit" />
            </form>
        </div>
    );
};

export default AddEvent;
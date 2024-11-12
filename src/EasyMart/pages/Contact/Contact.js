import React from 'react';
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import useAuth from '../../hooks/useAuth';
import './Contact.css';

const Contact = () => {
    const { user, getStarting, messages, setMessages } = useAuth();
    const { register, handleSubmit, reset } = useForm();

    document.title = 'Contact Us';

    const onSubmit = data => {
        fetch('https://easymartbackend.vercel.app/message', {
            method: 'POST',
            headers: { 'content-type': 'application/json'},
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            if(result.insertedId){
                toast.success("Successfully send your message", {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 5000,
                });
                setMessages([...messages, data])
                reset();
            }
        })
    };

    return (
        <>
            <>
                <style type="text/css">
                    {
                        `
                        .easy-mart-confirm-message input, .easy-mart-confirm-message textarea{
                            border: 1px solid ${getStarting?.primaryColor};
                            color: ${getStarting?.primaryColor};
                        }
                        .easy-mart-confirm-message input:active, .easy-mart-confirm-message textarea:active{
                            border: 1px solid ${getStarting?.primaryColor};
                        }
                        .easy-mart-confirm-message input:hover,.easy-mart-confirm-message textarea:hover{
                            border: 1px solid ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        .easy-mart-contact-us{
                            background-color: ${getStarting?.primaryColor};
                        }
                        `
                    }
                </style>
            </>
            <div className="easy-mart-contact py-5">
                <div className="container">
                    <h2 className="text-center py-1" style={{color: getStarting?.primaryColor}}>Contact Us</h2>
                    <div className="easy-mart-confirm-message text-center">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <input defaultValue={user?.displayName} placeholder="Please Type Your Name....." {...register("name")} style={{textTransform: "capitalize"}} required/>
                            <input defaultValue={user?.email} placeholder="Please Type Your Email....." {...register("email")} required/>
                            <input defaultValue={user?.phoneNumber} placeholder="Please Type Your Number....." {...register("phoneNumber")} type="number" required/>
                            <textarea {...register("message")} placeholder="Please Type Your Message....." style={{height: '120px'}} required/>
                            <input type="submit" className="btn text-white w-50"  style={{backgroundColor: getStarting?.primaryColor}}/>
                        </form>
                    </div>

                    <div className="easy-mart-contact-us text-center text-white p-3 my-5">
                        <div>
                            <h4>Address</h4>
                            <p>{getStarting?.address}</p>
                        </div>
                        <div>
                            <h4>Phone</h4>
                            <p>{getStarting?.phone}</p>
                        </div>
                        <div>
                            <h4>Email</h4>
                            <p>{getStarting?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Contact;
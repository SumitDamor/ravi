import React from 'react'
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';
const SendEmail = () => {
    const [template, settemplate] = useState('template_7f89mq9')
    const form = useRef();
    const  location = useLocation()
    // console.log(location);
    const sendEmail = (e) => {
      e.preventDefault();
        
      emailjs.sendForm('service_hu3356u', template, form.current, 'AMgttjaC_np9gj5xJ')
        .then((result) => {
            console.log(result.text);
            alert("Done")
        }, (error) => {
            console.log(error.text);
        });
    };
  return (
    <>
   <h1 className="font-thin text-black text-center capitalize text-2xl mt-6">Send Email to <p className='font-semibold'>{location.state ? location.state.email : ""}</p></h1>
    <form ref={form} onSubmit={sendEmail} className='form flex flex-col m-4 md:m-12 space-y-2'>
      <label>Name</label>
      <input type="text" name="to_name" className='w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default'  placeholder='Enter name'/>
      {
        location.state ? <div> <label>To Email</label>
      <input type="text" name="to_email" value={location.state.email} className='w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default' /></div>
      : <div>
      <label>To Email</label>
      <input type="text" name="to_email" className='w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default'  placeholder='Enter email'/>
      </div>
      }
     
      <label>From Name</label>
      <input type="text" name="from_name" className='w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default'  placeholder='Enter email'/>
      <label>Message</label>
      <textarea name="message" className='w-full
            border-[1.5px] border-form-stroke
            rounded-lg
            py-3
            px-5
            font-medium
            text-body-color
            placeholder-body-color
            outline-none
            focus:border-primary
            active:border-primary
            transition
            disabled:bg-[#F5F7FD] disabled:cursor-default'  placeholder='Enter messsage'/>
      <input type="submit" value="Send" className='bg-gray-100 px-6 py-4 rounded transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 hover:font-bold hover:shadow-xl cursor-pointer hover:bg-slate-300 text-black'/>
    </form>
    <div className='form flex flex-col m-4 md:m-12 space-y-2'>
      <h1>Please Provide Template (If Any)</h1>
<input className='w-full
        border-[1.5px] border-form-stroke
        rounded-lg
        py-3
        px-5
        font-medium
        text-body-color
        placeholder-body-color
        outline-none
        focus:border-primary
        active:border-primary
        transition
        disabled:bg-[#F5F7FD] disabled:cursor-default'  type="text" name="template_key" placeholder='Provide Template Key' onChange={(e) => {settemplate(e.target.value)}} />
            </div>
    </>
  )
}

export default SendEmail
import React, { useEffect, useState } from 'react'
import {useForm} from "react-hook-form"
import { apiConnector } from '../../services/apiconnector';
import { contactusEndpoint } from '../../services/apis';
import CountryCode from "../../data/countrycode.json"

const ContactUsForm = () => {

    const [loading, setLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors, isSubmitSuccessful}
    } = useForm();

    const submitContactForm = async(data) => {
        console.log("Logging Data" , data);
        try{
            setLoading(true);
            // const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Logging response", response);
            setLoading(false);
        }
        catch(error) {
            console.log("Error:" , error.message);
            setLoading(false);
        }
    }

    useEffect( () => {
        if(isSubmitSuccessful) {
            reset({
                email:"",
                firstname:"",
                lastname:"",
                message:"",
                phoneNo:"",
            })
        }
    },[reset, isSubmitSuccessful] );


  return (
    <form onSubmit={handleSubmit(submitContactForm)}>

    <div className='flex flex-col gap-14'>
            <div className='flex gap-3'>
                {/* firstName */}
                <div className='flex flex-col'>
                    <label htmlFor='firstname'>First Name</label>
                    <input  
                        type='text'
                        name='firstname'
                        id='firstname'
                        placeholder='Enter first name'
                        className=' text-richblack-900 placeholder-richblack-500 w-[287px] h-12 p-3 bg-richblack-100 rounded-lg shadow-inner justify-start items-center gap-3 inline-flex grow shrink basis-0  text-[16px] font-medium leading-normal'
                        {...register("firstname", {required:true})}
                    />
                    {
                        errors.firstname && (
                            <span>
                                Please enter Your name
                            </span>
                        )
                    }
                </div>

                {/* lastName */}
                <div className='flex flex-col'>
                    <label htmlFor='lastname'>Last Name</label>
                    <input  
                        type='text'
                        name='lastname'
                        id='lastname'
                        className=' text-richblack-900 placeholder-richblack-500 w-[287px] h-12 p-3 bg-richblack-100 rounded-lg shadow-inner justify-start items-center gap-3 inline-flex grow shrink basis-0  text-[16px] font-medium leading-normal'
                        placeholder='Enter Last name'
                        {...register("lastname")}
                    />
                    
                </div>

            </div>


            {/* email */}
            <div className='flex flex-col'>
                <label htmlFor='email'>Email Address</label>
                <input 
                    type='email'
                    name='email'
                    id='email'
                    className=' text-richblack-900 placeholder-richblack-500 w-[589px] h-12 p-3 bg-richblack-100 rounded-lg shadow-inner justify-start items-center gap-3 inline-flex grow shrink basis-0 text-[16px] font-medium leading-normal'
                    placeholder='Enter email Address'
                    {...register("email", {required:true})}
                />
                {
                    errors.email && (
                        <span>
                            Please enter your email address
                        </span>
                    )
                }
            </div>

            {/* phoneNo */}
            <div className='flex flex-col'>

                <label htmlFor='phonenumber'>Phone Number</label>

                <div className='flex flex-row gap-1'>
                    {/* dropdown */}
                   
                        <select
                            name='dropdown'
                            id="dropdown"
                            // className='bg-yellow-50 w-[80px]'
                            className='w-[81px] h-12 p-3 bg-richblack-100 text-richblack-900 placeholder-richblack-500 rounded-lg shadow-inner justify-start items-center gap-3 inline-flex'
                            {...register("countrycode", {required:true})}
                        >
                            {
                                CountryCode.map( (element , index) => {
                                    return (
                                        <option key={index} value={element.code}>
                                            {element.code} -{element.country}
                                        </option>
                                    )
                                } )
                            }
                        </select>
                        
                        <input
                            type='number'
                            name='phonenumber'
                            id='phonenumber'
                            placeholder='12345 67890'
                            className=' text-richblack-900 placeholder-richblack-500 w-[287px] h-12 p-3 bg-richblack-100 rounded-lg shadow-inner justify-start items-center gap-3 inline-flex grow shrink basis-0  text-[16px] font-medium leading-normal'
                            {...register("phoneNo",  
                            {
                                required:{value:true, message:"Please enter Phone Number"},
                                maxLength: {value:10, message:"Invalid Phone Number"},
                                minLength:{value:8, message:"Invalid Phone Number"} })}
                        />
                  
                </div>
                {
                    errors.phoneNo && (
                        <span>
                            {errors.phoneNo.message}
                        </span>
                    )
                }

            </div>

            {/* message */}
            <div className='flex flex-col'>
                <label htmlFor='message'>Message</label>
                <textarea 
                    name='message'
                    id='message'
                    cols="30"
                    className=' text-richblack-900 placeholder-richblack-500 p-3 bg-richblack-100 rounded-lg shadow-inner justify-start items-center gap-3 inline-flex grow shrink text-[16px] font-medium leading-normal'
                    rows="7"
                    placeholder='Enter Your message here'
                    {...register("message", {required:true})}
                />
                {
                    errors.message && (
                        <span>
                            Please enter your message.
                        </span>
                    )
                }
            </div>
                
            <button type='submit'
            className='w-[594px] h-12 p-3 bg-yellow-200 rounded-lg shadow-inner justify-center items-center gap-2 inline-flex text-center text-richblack-900 text-[16px] font-medium leading-normal'>
                    Send Message
            </button>
    </div>

    </form>
  )
}

export default ContactUsForm


"use client"
import React, { useState } from "react";
import Navbar from "../../Navbar";
import axios from 'axios';

import { useForm } from 'react-hook-form';
import { useRouter } from "next/navigation";

const Newcontact = () => {
  const { register, formState: { errors, isSubmitting }, handleSubmit } = useForm();
  
  const [inputData, setInputData] = useState({
    id: '',
    photoUrl: '',
    name: '',
    mobile: '',
    email: '',
    company: '',
    title: '',
    group: '',
  });

  const router = useRouter();

  const onSubmit = (data:any) => {
    console.log('Form data:', data);

    axios.post('http://localhost:3003/users', inputData)
      .then(res => {
        alert("Data Added Successfully");
       router.push('/');
      })
      .catch(err => console.log(err));
  }

  const isFormValid = Object.keys(errors).length === 0;

  return (
    <div>
      <Navbar />
      <main className="flex min-h-screen flex-col items-center p-12">
        <h1 className="text-green-700 text-lg font-bold">Add contact</h1>
        <p className="font-sans md:font-serif">
          Loverm ipsum dolor sit amet consecteture, adipsicing elit. Aspesrnature
          exercitationem distinitio ludantium hic ipsam mollitia percifications ominus iusto.
          Soluta error quo, molestia libero laborum vitae? possiums voluptatum iuto officiis!
        </p>

        <form className="bg-white rounded p-4 shadow-md" onSubmit={handleSubmit(onSubmit)}>
          <div className='form-group mb-3'>
            <input
              type="text" placeholder="Name"
              {...register("name", { required: true, minLength: 4 })}
              className="w-full border border-gray-300 rounded p-2"
              onChange={(e) => setInputData({ ...inputData, name: e.target.value })}
            />
            {errors.name && errors.name.type === "required" && <p className='text-red-500 text-sm'>Please enter the name</p>}
            {errors.name && errors.name.type === "minLength" && <p className='text-yellow-500 text-sm'>Please enter at least 4 characters</p>}
          </div>
          <div className='form-group mb-3'>
            <input
              type="text" placeholder="photoUrl"
              {...register("photoUrl", { required: true })}
              className="w-full border border-gray-300 rounded p-2"
              onChange={(e) => setInputData({ ...inputData, photoUrl: e.target.value })}
            />
            {errors.photoUrl && errors.photoUrl.type === "required" && <p className='text-red-500 text-sm'>Please enter the photo URL</p>}
          </div>
          <div className='form-group mb-3'>
            <input
              type="text" placeholder="Mobile"
              {...register("mobile", { required: true, minLength: 10 })}
              className="w-full border border-gray-300 rounded p-2"
              onChange={(e) => setInputData({ ...inputData, mobile: e.target.value })}
            />
            {errors.mobile && errors.mobile.type === "required" && <p className='text-red-500 text-sm'>Please enter valid mobile number</p>}
            {errors.mobile && errors.mobile.type === "minLength" && <p className='text-yellow-500 text-sm'>Please enter 10 digits mobile number</p>}
          </div>
          <div className='form-group mb-3'>
            <input
              type="text" placeholder="Email"
              {...register("email", { required: true })}
              className="w-full border border-gray-300 rounded p-2"
              onChange={(e) => setInputData({ ...inputData, email: e.target.value })}
            />
            {errors.email && errors.email.type === "required" && <p className='text-red-500 text-sm'>Please enter valid email</p>}
          </div>
          <div className='form-group mb-3'>
            <input
              type="text" placeholder="Company"
              {...register("company", { required: true })}
              className="w-full border border-gray-300 rounded p-2"
              onChange={(e) => setInputData({ ...inputData, company: e.target.value })}
            />
            {errors.company && errors.company.type === "required" && <p className='text-red-500 text-sm'>Please enter the company</p>}
          </div>
          <br />
          <button
            type="submit"
            className="bg-green-700 text-white font-bold rounded p-50 cursor-pointer"
            disabled={!isFormValid || isSubmitting}
          >
            Create
          </button>
        </form>
      </main>
    </div>
  );
};

export default Newcontact;
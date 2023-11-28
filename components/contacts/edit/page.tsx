
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {useForm} from  'react-hook-form';
import { useRouter } from 'next/navigation';
import Navbar from '../../Navbar';
 
 
const Edit = () => {
  const { register, formState: {errors}, trigger } = useForm();
 
  interface UserData {
    id: string;
    name: string;
    phone: string;
    email: string;
  }
 
    const [data, setData] = useState<UserData>({
      id: '',
      name: '',
      phone: '',
      email: '',
    });
 
 
  useEffect(() => {
    let userId:any=localStorage.getItem("UserId")
    console.log(userId)
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      let userId:any=localStorage.getItem("UserId")
      try {
     
 
  const response = await axios.get(`http://localhost:3003/users/${userId}`);
          setData(response.data);
          console.log("hksdkgkds",response.data.phone)
      } catch (error) {
        console.error(error);
      }
    };
 
    fetchData();
  }, []);
 
   
  const router = useRouter();
 
  function handleSubmit(event: { preventDefault: () => void; }) {
      event.preventDefault()
 
      axios.put(`http://localhost:3003/users/${data.id}`, data)
      .then(res => {
        alert("Data Added Sucessfully");
        router.push('/.');
      }).catch(err => console.log(err));
     }
 
     
  return (
    <div>
      <Navbar />
  <main className="flex min-h -screen flex-col items-center justify-between p-24">
      <div className='w-90 h-90 mx-auto p-4'>
        <h2 className='text-center mb-4 font-bold text-green-800'>Edit contact</h2>
        <form onSubmit={handleSubmit} className='bg-white rounded p-4 w-120 shadow-md'>
          <div className='form-group mb-3 p-2'>
            <label htmlFor='name' className="text-sm font-medium text-gray-700">ID</label>
            <input
             type='text'
             className={`w-full border rounded p-2 ${errors.id && errors.id.type === "required" ? "border-red-500" : "border-gray-300"}`}
             placeholder='enter id'
             value={data.id}
             {...register("id", { required: true })}
             onChange={(e) => setData({ ...data, id: e.target.value })}
             onBlur={() => trigger("id")}  />
             {errors.id && errors.id.type === "required" && <p className='text-red-500 text-sm'>Please enter the ID</p>}
          </div>
          <div className='form-group p-2 mb-3'>
            <label htmlFor='name' className="text-sm font-medium text-gray-700">Name</label>
            <input
             type='text'
             className={`w-full border rounded p-2 ${errors.name && errors.name.type === "required" ? "border-red-500" : "border-gray-300"}`}
             value={data.name}
             {...register("name", { required: true, minLength: 4 })}
              onChange={(e) => setData({ ...data, name: e.target.value })}
              onBlur={() => trigger("name")}/>
            {errors.name && errors.name.type === "required" &&  <p className='text-red-500 text-sm'>Please enter the name</p>}
            {errors.name && errors.name.type === "minLength" && <p className='text-yellow-500 text-sm'>Please enter at least 4 characters</p>}
          </div>
          <div className='form-group  p-2 mb-3'>
            <label htmlFor='phone' className="text-sm font-medium text-gray-700">Phone</label>
            <input
              type='text'
              className={`w-full border rounded p-2 ${errors.phone && errors.phone.type === "required" ? "border-red-500" : "border-gray-300"}`}
              placeholder='Enter your phone'
              value={data.phone}
              {...register("phone", { required: true, minLength: 4 })}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
              onBlur={() => trigger("phone")}/>
              {errors.phone && errors.phone.type === "required" &&  <p className='text-red-500 text-sm'>please enter a valid phone number</p>}
          </div>
          <div className='form-group  p-2 mb-3'>
            <label htmlFor='email' className="text-sm font-medium text-gray-700">Email</label>
            <input
             type='text'
             className={`w-full border rounded p-2 ${errors.email && errors.email.type === "required" ? "border-red-500" : "border-gray-300"}`}
            value={data.email}
            {...register("email", { required: true})}  
            onChange={(e) => setData({ ...data, email: e.target.value })}
            onBlur={() => trigger("email")}  />
            {errors.email && errors.email.type === "required" && <p className='text-red-500 text-sm'>Please enter the valid email</p>}
          </div>
          <button type='submit' className="bg-green-800 hover:bg-green-600 rounded-lg px-4">U
          pdate
          </button>
        </form>
      </div>
  </main>
  </div>
  );
};
 
export default Edit;
 
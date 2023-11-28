"use client"
import Navbar from "./components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from 'react';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';





interface UserData {
  id: string;
  photoUrl: string,
  name: string;
  email: string;
  phone: string;
 
}



function Home()  {
  const router =useRouter();
  const [data, setData] = useState<UserData[]>([]);
  const [records, setRecords] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {
    axios.get<UserData[]>("http://localhost:3003/users")
      .then((res) => {
        setData(res.data);
        setRecords(res.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);
 
  const filterRecords = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value.toLowerCase();
    setRecords(
      data.filter( (f) =>
          f.name.toLowerCase().includes(inputValue) )
    );
  };

  const setUserIdAndNavigate = (id: string) => {
    let userId: any = id;
    localStorage.setItem("UserId", userId);
    router.push(`/components/contacts/edit`);
  };
  const setviewAndNavigate = (id: string) => {
    let userId: any = id;
    localStorage.setItem("UserId", userId);
    router.push(`/components/contacts/view`);
  };


  const handleButtonClick = () => {
    router.push("/components/contacts/new");
  
    
  };

  
 
 

  return (
    <div>
      <Navbar />
      
      <div className="flex items-center space-x-4 py-2 ml-40">
      <h1 className="text-green-700 font-bold text-lg">Contact manager</h1>
      <button onClick={handleButtonClick}
        className="bg-green-700 hover:bg-green-400 rounded">
         <FontAwesomeIcon icon={faPlusCircle} className="ml-2"/>New
      </button>
      </div>
      
      
      <div className="flex items-center space-x-4 py-2 ml-40">
      <p className="font-sans md:font-serif">Contact management software is a tool that stores your contact information with your customers and prospects while keeping track of your interactions between your business and your contacts. 
              For example, the information could be the phone numbers, addresses, social media handles, emails, sales history, linked businesses, and so on. </p>
      </div>
      <div className="flex items-center space-x-4 py-2 ml-40">
         <input className="border p-1 mr-1" type="text" placeholder="Search Name" onChange={filterRecords}/>
        <button className="bg-green-700 text-white p-0">Submit</button>
      </div>
      
      <div className="flex items-center space-x-4 py-2 ml-40">
      <section>
      <div className="grid grid-cols-3 gap-4 p-4">
            {loading ? (
              <p>Loading...</p>
            ) : (
              records.map((d, i) => (
              <div key={i} className="bg-white rounded-lg ring-1">
                <div className="border p-10 ml-40">
                    <div className="flex items-center mb-4">
                    <p className="p-1 ml-2 font-bold text-lg">Name:</p>
                    <p className="p-1 ml-2">{d.name}</p>
                </div>
               <div className="flex items-center mb-4">
                   <p className="p-1 ml-2 font-bold text-lg">Email:</p>
                   <p className="p-1 ml-2">{d.email}</p>
                </div>
                <div className="flex items-center mb-4">
                   <p className="p-1 ml-2 font-bold text-lg">Phone:</p>
                   <p className="p-1 ml-2">{d.phone}</p>
                </div>
              
              <div className="flex">
                
              <button
                  onClick={() => setviewAndNavigate(d.id)} className="mr-4 bg-blue-700 text-white px-2 py-2 rounded"
                  >
                     view
                  </button>
                  <button
                  onClick={() => setUserIdAndNavigate(d.id)} className="mr-4 bg-green-700 text-white px-2 py-2 rounded"
                  >
                     edit
                  </button>
                  
                   <button onClick={() =>handleDeleteSubmit(d.id)} className="mr-4 bg-red-700 text-white px-2 py-2 rounded"
                   >
                   delete
                  </button>
                  
            </div>
          </div>
        </div>
              ))
            )}
      </div>
    </section>
    </div>
      </div>   
  );
  function handleDeleteSubmit(id:string) { 
    const conf = window.confirm("do you want to delet");
    if(conf) {
      axios.delete(`http://localhost:3003/users/${id}`)
      .then(res => {
        alert('record has deleted');
      }).catch(err => console.log(err))
      }
    }
};

export default Home;
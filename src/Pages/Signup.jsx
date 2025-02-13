import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [Name, setName] = useState('')
  const [UserName, setUserName] = useState('')
  const [Password , setPassword] = useState('')

  const navigate = useNavigate()
  return (
    <Layout show={true}>
      <div className="h-[100vh] w-full flex justify-center items-center px-2">
       <form className="w-full flex justify-center">
       <div className="flex flex-col w-full md:w-[33rem] gap-2 p-6 py-12 border border-gray-100 border-solid md:rounded-2xl rounded-xl text-gray-300 bg-[#ffffff17]">
            <label 
            className="text-[1.2rem] font-sans font-[400]"
            htmlFor="Name">Name</label>
            <input type="text" id="Name" 
            value={Name}
            onChange={(e)=>{
              setName(e.target.value)
            }}
            placeholder="Enter Name"
            className="text-lg p-2 px-3 placeholder:text-gray-600 border-solid outline-none border rounded-xl border-gray-400"
            />
            <label 
            className="text-[1.2rem] font-sans font-[400]"
            htmlFor="UserName">UserName</label>
            <input type="text" id="UserName" 
            value={UserName}
            onChange={(e)=>{
              setUserName(e.target.value)
            }}
            placeholder="Enter UserName"
            className="text-lg p-2 px-3 placeholder:text-gray-600 border-solid outline-none border rounded-xl border-gray-400"
            />
            <label 
            className="text-[1.2rem] font-sans font-[400]"
            htmlFor="Password">Password</label>
            <input type="password" id="Password" 
            value={Password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            placeholder="Enter Password"
            className="text-lg p-2 px-3 placeholder:text-gray-600 border-solid outline-none border rounded-xl border-gray-400"
            />
            <strong 
            onClick={()=>{
              navigate('/login')
            }}
            className="text-[1.2rem] text-[white] font-sans font-[350] cursor-pointer underline">
              Have Account?
            </strong>
            <button 
            type="submit"
            className="bg-black py-2 rounded-xl font-semibold text-lg cursor-pointer"
            >
              Signup
            </button>
        </div>
       </form>
      </div>
    </Layout>
  );
};

export default Signup;

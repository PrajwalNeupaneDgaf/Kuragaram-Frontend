import React, { useEffect, useState } from "react";
import Layout from "../Layouts/Layout";
import { useNavigate } from "react-router-dom";
import { useData } from "../Context/AppContext";
import { toast } from "sonner";
import apiCaller from "../Axios";
import LoadingScreen from "../Components/Loading";

const Signup = () => {
  const [Name, setName] = useState('')
  const [UserName, setUserName] = useState('')
  const [Password , setPassword] = useState('')
  const [Loading, setLoading] = useState(false)
  const [LoadingPage, setLoadingPage] = useState(true)

  const navigate = useNavigate()

   const {IsAuthorized ,setUser , setIsAuthorized} = useData()

   useEffect(()=>{
      if(IsAuthorized){
        navigate('/')
      }
      setLoadingPage(false)
    },[IsAuthorized])

    if(LoadingPage) return <LoadingScreen/>

    const HandleSubmit = (e)=>{
      if(Loading) {return}
      e.preventDefault()
      setLoading(true)
      if(!UserName|| !Name || !Password){
        toast('Fill The Form Properly , Incomplete Credential')
        return
      }
      if(Password.length<8){
        toast('Password minimum Length Should be 8 digit')
        return
      }

      apiCaller.post('/user/register',{Name,UserName,Password})
      .then(res=>{
        const data = res.data
        setUser(data.User)
        setIsAuthorized(true)
        localStorage.setItem('Token',data?.Token)
         toast('Registered Succesfully')
      }).catch(err=>{
        console.log(err)
        toast(err.response?.data.message || 'Failed')
      }).finally(()=>{
        setLoading(false)
      })
  
    }
  return (
    <Layout show={true}>
      <div className="h-[100vh] w-full flex justify-center items-center px-2">
       <form onSubmit={HandleSubmit} className="w-full flex justify-center">
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
            className={` py-2 ${Loading?'bg-[#0000008a]':'bg-black'} rounded-xl font-semibold text-lg cursor-pointer`}
            >
              {
                Loading?`Signing up...`:"Signup"
              }
            </button>
        </div>
       </form>
      </div>
    </Layout>
  );
};

export default Signup;

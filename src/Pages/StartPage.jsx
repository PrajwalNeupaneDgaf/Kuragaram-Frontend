import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import { useNavigate } from "react-router-dom";
import apiCaller from "../Axios";
import { useData } from "../Context/AppContext";
import { toast } from "sonner";

const StartPage = () => {
  const [RoomId, setRoomId] = useState("");
  //const [Name, setName] = useState("");

  const [Loading,setLoading] = useState(false)

  const navigate = useNavigate();

  const {ActiveRoom , setActiveRoom , setTriggerPage,setUser} = useData()

  const joinGroup = () => {
    if (!RoomId) {
      return;
    }
    navigate(`/join/room/${RoomId}`);
  };

  const HandleCreateNew = () => {
    if(Loading){
      return
    }
    setLoading(true)
    apiCaller.get('/room/create')
    .then(res=>{
      const data = res.data
      console.log(data)
      setActiveRoom(data.Room)
      navigate(`/join/room/${data.Room._id}`)
      setUser(data?.User)
    }).catch(err=>{
      setTriggerPage(prev=>!prev)
      toast.error(err?.response?.data?.message||'Failed ')
    }).finally(()=>{
      setLoading(false)
    })
  };
  return (
    <Layout>
      <div className="h-[100vh] w-full flex justify-center items-center px-3">
        <div className="flex flex-col gap-3 w-full md:w-[32rem]">
          <header className="text-3xl font-[300] text-center">Join Room</header>
          <input
            placeholder="Enter RoomId"
            type="text"
            value={RoomId}
            onChange={(e) => {
              setRoomId(e.target.value);
            }}
            className="outline-none p-2 text-lg border-solid border-gray-400 border rounded-xl w-full"
          />
          {/* <input
            placeholder="Enter Name"
            type="text"
            value={Name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            className="outline-none p-2 text-lg border-solid border-gray-400 border rounded-xl w-full"
          /> */}
          <button
            onClick={joinGroup}
            className="bg-[white] mt-4 py-3 rounded-3xl w-full text-gray-800 font-[600] cursor-pointer"
          >
            Join Group
          </button>
          <div className="block text-center underline">Or</div>
          <button
            onClick={HandleCreateNew}
            className="bg-[white] mt-4 py-3 rounded-3xl w-full text-gray-800 font-[600] cursor-pointer"
          >
           {
            Loading?'Creating....':' Create New'
           }
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StartPage;

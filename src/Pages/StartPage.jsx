import React, { useState } from "react";
import Layout from "../Layouts/Layout";
import { useNavigate } from "react-router-dom";

const StartPage = () => {
  const [RoomId, setRoomId] = useState("");
  const [Name, setName] = useState("");

  const navigate = useNavigate()

  const joinGroup = ()=>{
    if(!RoomId){
      return
    }
    navigate(`/join/room/${RoomId}`)
  }
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
          <button onClick={joinGroup} className="bg-[white] mt-4 py-3 rounded-3xl w-full text-gray-800 font-[600] cursor-pointer">
            Join Group
          </button>
          <div className="block text-center underline">Or</div>
          <button
            onClick={() => {
              navigate("/");
            }}
            className="bg-[white] mt-4 py-3 rounded-3xl w-full text-gray-800 font-[600] cursor-pointer"
          >
           Create New
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default StartPage;

import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { User, LogOut, UserPlus, MessageSquare, PhoneMissed } from "lucide-react";
import { useData } from "../Context/AppContext";

const Navbar = ({ show, isRoom }) => {
  const navigate = useNavigate();

  const { User, IsAuthorized, setIsAuthorized , IsCreator,IsChats , IsRequestOpen , setIsChats , setIsRequestOpen } = useData();
  

  const path = location.pathname;

  const [hasRequests, sethasRequests] = useState(true)

  const {id} = useParams()

  const handleLogout = () => {
    setIsAuthorized(false);
    console.log(IsAuthorized);
  };

  const endCall = ()=>{
    navigate('/')
  }

  return (
    <nav className="flex flex-row justify-between py-3 px-6 md:px-12">
      <strong
        onClick={() => {
          if (!show) {
            navigate("/");
          }
        }}
        className="text-2xl font-sans cursor-pointer "
      >
        KuraGaram
      </strong>
      <div
        onClick={handleLogout}
        className={
          !IsAuthorized || isRoom
            ? "hidden"
            : "flex active:bg-[#ffffff75] transition-all duration-200 justify-center gap-1 items-center cursor-pointer hover:bg-[#ffffff10] px-3 py-2 rounded-3xl"
        }
      >
        <span>Logout</span>
        <LogOut />
      </div>
      <div
        onClick={() => {
          if (path.split("/")[1] == "login") {
            navigate("/register");
          } else {
            navigate("/login");
          }
        }}
        className={
          IsAuthorized
            ? "hidden"
            : "w-[7rem] border-[.1px] border-solid border-gray-300 flex active:bg-[#ffffff75] transition-all duration-200 justify-center gap-1 items-center cursor-pointer hover:bg-[#ffffff10] px-3 py-2 rounded-3xl"
        }
      >
        <span>{path.split("/")[1] == "login" ? "Register" : "Login"}</span>
      </div>
      <div
        className={
          isRoom ? "flex justify-center items-center gap-1 " : "hidden"
        }
      >
        <button onClick={()=>{
          setIsRequestOpen(true)
        }} className={!IsCreator?'hidden':" flex active:bg-[#ffffff75] transition-all duration-200 justify-center gap-1 items-center cursor-pointer hover:bg-[#ffffff10] px-3 py-2 rounded-3xl"}><UserPlus color='green' /></button>
        <button onClick={()=>{
          setIsChats(true)
        }} className=" flex active:bg-[#ffffff75] transition-all duration-200 justify-center gap-1 items-center cursor-pointer hover:bg-[#ffffff10] px-3 py-2 rounded-3xl"> <MessageSquare color="indigo"/></button>
        <button onClick={endCall} title="End Call" className=" flex active:bg-[#e44e4e] transition-all duration-200 justify-center gap-1 items-center cursor-pointer hover:bg-[#ffffff10] px-3 py-2 rounded-3xl"> <PhoneMissed color="red"/></button>
      </div>
    </nav>
  );
};

export default Navbar;

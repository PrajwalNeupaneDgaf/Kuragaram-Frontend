import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  User,
  LogOut,
  UserPlus,
  MessageSquare,
  PhoneMissed,
} from "lucide-react";
import { useData } from "../Context/AppContext";
import apiCaller from "../Axios";
import { toast } from "sonner";

const Navbar = ({ show, isRoom }) => {
  const navigate = useNavigate();

  const {
    User,
    setUser,
    IsAuthorized,
    setIsAuthorized,
    IsCreator,
    IsChats,
    setTriggerPage,
    ActiveRoom,
    IsRequestOpen,
    setIsChats,
    setIsRequestOpen,
    Requests
  } = useData();

  const path = location.pathname;

  const [hasRequests, sethasRequests] = useState(true);

  const { id } = useParams();

  const handleLogout = () => {
    localStorage.removeItem("Token");
    setIsAuthorized(false);
  };

  const endCall = () => {
    apiCaller
      .get(`/room/end/${ActiveRoom._id}`)
      .then((res) => {
        const data = res.data;
        toast.success(res.data?.message || "Call Canceled ...");
        setUser(data?.User);
        navigate("/");
      })
      .catch((err) => {
        setTriggerPage((p) => !p);
        console.log(err);
        toast.error("Error");
      });
  };

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
        <div className="relative">
          <div className={Requests?.length>0?"absolute right-1 bg-red-600 h-3 w-3 rounded-full top-1":'hidden'}>
          </div>
          <button
            onClick={() => {
              setIsRequestOpen(true);
            }}
            className={
              !IsCreator
                ? "hidden"
                : " flex active:bg-[#ffffff75] transition-all duration-200 justify-center gap-1 items-center cursor-pointer hover:bg-[#ffffff10] px-3 py-2 rounded-3xl"
            }
          >
            <UserPlus color="green" />
          </button>
        </div>
        <button
          onClick={() => {
            setIsChats(true);
          }}
          className=" flex active:bg-[#ffffff75] transition-all duration-200 justify-center gap-1 items-center cursor-pointer hover:bg-[#ffffff10] px-3 py-2 rounded-3xl"
        >
          {" "}
          <MessageSquare color="indigo" />
        </button>
        <button
          onClick={endCall}
          title="End Call"
          className=" flex active:bg-[#e44e4e] transition-all duration-200 justify-center gap-1 items-center cursor-pointer hover:bg-[#ffffff10] px-3 py-2 rounded-3xl"
        >
          {" "}
          <PhoneMissed color="red" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

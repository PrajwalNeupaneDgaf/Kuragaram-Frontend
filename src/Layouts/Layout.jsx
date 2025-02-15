import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { useData } from "../Context/AppContext";
import LoadingScreen from "../Components/Loading";
import { toast } from "sonner";
import apiCaller from "../Axios";

const Layout = ({ children, show, isRoom }) => {
  const navigate = useNavigate();

  const { IsAuthorized, LoadingPage, TriggerPage, User } = useData();

  useEffect(() => {
    if (!show) {
      if (!IsAuthorized) {
        navigate("/login");
      }
    }
  }, [IsAuthorized]);

  useEffect(() => {
   
    if (User) {
      if (User?.IsActive) {
        navigate(`/join/room/${User?.ActiveRoomId}`);
      }
    }
  }, [TriggerPage, User]);

  if (LoadingPage) return <LoadingScreen></LoadingScreen>;

  return (
    <div>
      <div className="fixed z-30 top-0 left-0 right-0">
        <Navbar isRoom={isRoom} show={show} />
      </div>
      {children}
    </div>
  );
};

export default Layout;

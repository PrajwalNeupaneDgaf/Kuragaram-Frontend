import React, { createContext, useContext, useEffect, useState } from "react";
import apiCaller from "../Axios";
import LoadingScreen from "../Components/Loading";
import { io } from "socket.io-client";
import { toast } from "sonner";

const userContext = createContext();

const AppContext = ({ children }) => {
  const [IsAuthorized, setIsAuthorized] = useState(false);
  const [User, setUser] = useState({});
  const [IsCreator, setIsCreator] = useState(false);
  const [IsChats, setIsChats] = useState(false);
  const [IsRequestOpen, setIsRequestOpen] = useState(false);
  const [Loading, setLoading] = useState(true);
  const [ActiveRoom, setActiveRoom] = useState({});
  const [CreatorRoom, setCreatorRoom] = useState({});
  const [TriggerPage, setTriggerPage] = useState(true);
  const [Messages, setMessages] = useState([]);
  const [Requests, setRequests] = useState([]);
  const [Socket, setSocket] = useState(null);
  const [Members, setMembers] = useState([]);

  useEffect(() => {
    apiCaller
      .get("/user/mydata")
      .then((res) => {
        const data = res.data;
        setUser(data.User);
        setIsAuthorized(true);
      })
      .catch((err) => {
        setIsAuthorized(false);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!User?._id) return; // ✅ Prevents creating socket if user is undefined

    // const newSocket = io("http://localhost:8000", {
    const newSocket = io("https://kuragaram-backend.onrender.com", {
      query: { id: User._id ,roomid:ActiveRoom._id},
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [User, ActiveRoom]);

  useEffect(() => {
    Socket?.on("newRequest", (data) => {
      toast.success("Request Received");
      setRequests([...Requests, data]);
    });
    Socket?.on("Reqhandle", (data) => {
      console.log(data)
      if (data.status) {
        location.href = `/join/room/${data.RoomId}`
      } else {
        location.href = "/";
      }
    });
    Socket?.on("newMessage", (data) => {
      toast.info("New Message");
      setMessages(p => [...p, data.newMessage]);
    });
    Socket?.on("room-closed", (data) => {
      toast.success("Room Closed");
      location.href = "/";
    });
    Socket?.on("room-left", (data) => {
      toast.success(`Room Left by ${data?.name}`);
      const newMembers = Members?.filter(itm=>itm._id!==data.user)
      setMembers(newMembers)
    });
    Socket?.on("newUserJoined", (data) => {
      setMembers(p=>[...p , data.member])
    });
    return () => Socket?.off("Message");
  }, [Socket]);
  if (Loading) return <LoadingScreen />;

  return (
    <userContext.Provider
      value={{
        IsAuthorized,
        setIsAuthorized,
        User,
        setUser,
        IsCreator,
        setIsCreator,
        IsChats,
        setIsChats,
        IsRequestOpen,
        setIsRequestOpen,
        LoadingPage: Loading,
        setLoadingPage: setLoading,
        ActiveRoom,
        setActiveRoom,
        TriggerPage,
        setTriggerPage,
        CreatorRoom,
        setCreatorRoom,
        Messages,
        setMessages,
        Requests,
        setRequests,
        setSocket,
        Members,
        setMembers,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default AppContext;

export const useData = () => {
  return useContext(userContext);
};

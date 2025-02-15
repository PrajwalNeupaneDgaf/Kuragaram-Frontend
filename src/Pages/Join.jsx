import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layouts/Layout";
import {
  Camera,
  CameraOff,
  HeadphoneOff,
  Headphones,
  Mic,
  MicOff,
  MicOffIcon,
  ScreenShare,
  ScreenShareOff,
  Speaker,
} from "lucide-react";
import { useData } from "../Context/AppContext";
import Chats from "../Components/Chats";
import LoadingScreen from "../Components/Loading";
import Requests from "../Components/Requests";
import apiCaller from "../Axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const Join = () => {
  const [Name, setName] = useState("");
  const [isCameraOpen, setisCameraOpen] = useState(false);
  const [IsMikeOn, setIsMikeOn] = useState(false);
  const [IsMute, setIsMute] = useState(false);
  const [IsScreenShare, setIsScreenShare] = useState(false);
  const [Source, setSource] = useState(null);
  const [Loading, setLoading] = useState(true);

  // fetching from context

  const { id } = useParams();

  const {
    User,
    IsChats,
    setLoadingPage,
    IsRequestOpen,
    setIsCreator,
    setCreatorRoom,
    setIsChats,
    setIsRequestOpen,
    setActiveRoom,
    setMessages,
    setRequests,
    Members, setMembers,
    Socket
  } = useData();

  const videoRef = useRef();

  const navigate = useNavigate();

  useEffect(() => {
    apiCaller
      .get(`/room/${id}`)
      .then((res) => {
        const data = res.data;
        setActiveRoom(data.Room);
        setIsCreator(data.Room.Creator === User._id);
        setMembers(data.Room.Members);
        setCreatorRoom(data?.CreatorRoom);
        setMessages(data?.Messages)
        setRequests(data?.CreatorRoom?.Request)
        toast.success("Welcome");
      })
      .catch((err) => {
        if (err?.response?.data?.message == "Not in Room") {
          apiCaller
            .get(`/room/join-request/${id}`)
            .then((res) => {
              toast.success("Wait till accepted");
              navigate(`/wait/room/${id}`);
            })
            .catch((err) => {
              navigate("/");
            });
        } else if (!User.IsActive || User.ActiveRoomId !== id) {
          navigate("/");
        }
        console.log(err)
        toast.error(err?.response?.data?.message || "Error from here");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // handle Camera Function

  const handleCamera = async () => {
    if (!isCameraOpen) {
      try {
        const userStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
          setSource(userStream);
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
      setisCameraOpen(true);
    } else {
      setisCameraOpen(false);
      if (Source) {
        Source.getTracks().forEach((track) => track.stop());
        if (videoRef.current) videoRef.current.srcObject = null;
        setSource(null);
      }
    }
  };

  const handleScreenShare = async () => {
    if (!IsScreenShare) {
      try {
        const userStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = userStream;
          setSource(userStream);
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
      setIsScreenShare(true);
    } else {
      setIsScreenShare(false);
      if (Source) {
        Source.getTracks().forEach((track) => track.stop());
        if (videoRef.current) videoRef.current.srcObject = null;
        setSource(null);
      }
    }
  };

  const handleMike = () => {
    if (IsMikeOn) {
      setIsMikeOn(false);
    } else {
      setIsMikeOn(true);
    }
  };
  const handleMute = () => {
    if (IsMute) {
      setIsMute(false);
    } else {
      setIsMute(true);
    }
  };

  if (Loading) return <LoadingScreen />;
  return (
    <Layout isRoom={true}>
      <div className="mt-14 flex flex-col justify-center items-center gap-2 px-3 md:px-8">
        <div className="flex justify-center items-center flex-row overflow-auto noScroll gap-3 flex-wrap">
          <div>
            <video
              autoPlay
              playsInline
              className={
                Source
                  ? "border rounded-lg w-36 h-30 object-cover md:w-56 md:h-44"
                  : "hidden"
              }
              ref={videoRef}
            ></video>
            <div
              className={
                !Source
                  ? "border border-gray-600 rounded-lg flex flex-col justify-center items-center w-36 h-30 md:w-56 md:h-44 bg-[#ffffff21]"
                  : "hidden"
              }
            >
              <CameraOff size={"2.6rem"} />
              <b className="md:text-xl text-lg font-[350]">
               {User?.Name}
              </b>
            </div>
          </div>

          {Members?.map((itm) => {
            return (
              <div
                key={itm._id}
                className={
                  itm._id!==User?._id
                    ? "border border-gray-600 rounded-lg flex flex-col justify-center items-center w-36 h-30 md:w-56 md:h-44 bg-[#ffffff21]"
                    : "hidden"
                }
              >
                <CameraOff size={"2.6rem"} />
                <b className="md:text-xl text-lg font-[350]">
                {itm.Name}
                </b>
              </div>
            );
          })}
        </div>
      </div>

      {/* Options Of Chats or Request  */}
      <div
        className={
          IsChats || IsRequestOpen
            ? "fixed overflow-auto top-0 z-40 right-0 bottom-0 w-[19rem] bg-stone-900"
            : "hidden"
        }
      >
        {IsChats && !IsRequestOpen ? <Chats /> : <Requests />}
      </div>
      {/* Camera and Other Controls  */}
      <div className=" z-30 fixed bottom-6 left-0 right-0 px-6 md:px-16">
        <div className="bg-[#ffffff0c] rounded-3xl py-2 px-3 flex justify-center gap-5 items-center w-full">
          <button
            onClick={handleCamera}
            className="hover:bg-[#ffffff4d] transition-all duration-200 p-2 rounded-xl cursor-pointer bg-[#ffffff17] px-2 md:px-4"
          >
            {!isCameraOpen ? <CameraOff /> : <Camera />}
          </button>
          <button
            onClick={handleMike}
            className="hover:bg-[#ffffff4d] transition-all duration-200 p-2 rounded-xl cursor-pointer bg-[#ffffff13] px-2 md:px-4"
          >
            {IsMikeOn ? <Mic /> : <MicOff />}
          </button>
          <button
            onClick={handleMute}
            className="hover:bg-[#ffffff4d] transition-all duration-200 p-2 rounded-xl cursor-pointer bg-[#ffffff13] px-2 md:px-4"
          >
            {IsMute ? <Headphones /> : <HeadphoneOff />}
          </button>
          <button
            title="Share Screen"
            onClick={handleScreenShare}
            className="hover:bg-[#ffffff4d] transition-all duration-200 p-2 rounded-xl cursor-pointer bg-[#ffffff13] px-2 md:px-4"
          >
            {!IsScreenShare ? <ScreenShare /> : <ScreenShareOff />}
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Join;

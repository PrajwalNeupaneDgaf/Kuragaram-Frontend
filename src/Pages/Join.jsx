import React, { useRef, useState } from "react";
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
import Requests from "../Components/Requests";

const Join = () => {
  const [Name, setName] = useState("");
  const [isCameraOpen, setisCameraOpen] = useState(false);
  const [IsMikeOn, setIsMikeOn] = useState(false);
  const [IsMute, setIsMute] = useState(false);
  const [IsScreenShare, setIsScreenShare] = useState(false);
  const [Source, setSource] = useState(null);

  // fetching from context 

  const {IsChats , IsRequestOpen , setIsChats , setIsRequestOpen} = useData()

  const videoRef = useRef();

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
  return (
    <Layout isRoom={true}>
      <div className="mt-14 flex justify-center items-center">
        <div className="flex justify-center items-center gap-3 flex-wrap">
          <video
            autoPlay
            playsInline
            className={
              Source
                ? "border rounded-lg w-36 h-30 object-cover md:w-72 md:h-60"
                : "hidden"
            }
            ref={videoRef}
          ></video>
          <div
            className={
              !Source
                ? "border border-gray-600 rounded-lg flex flex-col justify-center items-center w-36 h-30 md:w-72 md:h-60 bg-[#ffffff21]"
                : "hidden"
            }
          >
            <CameraOff size={"2.6rem"} />
            <b className="md:text-xl text-lg font-[350]">Your camera is off</b>
          </div>
        </div>
      </div>

      {/* Options Of Chats or Request  */}
      <div className={IsChats || IsRequestOpen?"fixed overflow-auto top-0 z-40 right-0 bottom-0 w-[19rem] bg-stone-900":"hidden"}>
            {
              IsChats && !IsRequestOpen?<Chats/>:<Requests/>
            }
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

import React from "react";
import { useData } from "../Context/AppContext";
import { ClipboardCopyIcon, User2Icon, X } from "lucide-react";
import { Toaster, toast } from "sonner";
import { useParams } from "react-router-dom";
import apiCaller from "../Axios";

const Requests = () => {
  const { setIsRequestOpen,CreatorRoom ,Requests,setRequests} = useData();

  const { id } = useParams();



  const CopyId = async () => {
    try {
      const text = `https://kuragaram.netlify.app/join/room/${id}`;
      await navigator.clipboard.writeText(text);
      toast("Copied");
    } catch (error) {
      toast("error in Copying");
    }
  };

  const manageRequest = (status,userId)=>{
    apiCaller.post(`/room/handleRequest/${id}/${userId}`,{status:status})
    .then(res=>{
      const data = res.data
      toast.success(status?"Accepted":"Rejected")

      const newRequests = Requests.filter(itm=>itm._id!==userId)
      setRequests(newRequests)

    }).catch(()=>{
      toast.error('failed')
    })
  }
  return (
    <div className="related w-full">
      <div className="absolute top-0 left-0 right-0 h-[4.5rem] bg-stone-900 z-20">
        <div className="m-2 rounded-2xl px-3 py-2 bg-[#ffffff0a] flex flex-row justify-between">
          <button
            onClick={() => {
              setIsRequestOpen(false);
            }}
            className="hover:text-red-400  rounded-2xl p-2 cursor-pointer"
          >
            <X />
          </button>
          <div className="flex flex-row items-center justify-center gap-2">
            <b className="text-xl font-[350] text-gray-400 flex gap-1 justify-center items-center">
              <User2Icon /> <span>Requests</span>
            </b>
            <button
              onClick={CopyId}
              title="Copy Room-Id"
              className="hover:bg-[#ffffff17] p-3 text-lg text-gray-400 rounded-xl cursor-pointer"
            >
              <ClipboardCopyIcon />
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 pt-20 fixed h-full w-full overflow-auto">
        {Requests?.map((itm) => {
          return (
            <div
              className="px-2 flex gap-2 flex-col py-2 mx-2 rounded-xl bg-[#ffffff1c]"
              key={itm.UserName}
            >
              <div className="flex flex-row gap-1  items-center">
                <button className="flex justify-center items-center bg-[#50dfc052] text-black h-6 w-6 rounded-full">
                  {itm.Name.trimStart().toUpperCase()[0]}
                </button>
                <strong className="text-lg font-[350] text-gray-200">
                  {itm.Name}
                </strong>
              </div>
              <div className="flex gap-3">
                <button onClick={()=>{
                  manageRequest(false ,itm._id)
                }} className="py-2 px-7 rounded-xl font-[460] cursor-pointer bg-[#5e585834]">
                  Reject
                </button>
                <button onClick={()=>{
                  manageRequest(true,itm._id)
                }} className="py-2 px-7 rounded-xl font-[460] cursor-pointer bg-[#0000007a]">
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <Toaster
        position="top-center"
        duration={700}
        theme="black"
        style={{
          fontSize: "12px",
        }}
      />
    </div>
  );
};

export default Requests;

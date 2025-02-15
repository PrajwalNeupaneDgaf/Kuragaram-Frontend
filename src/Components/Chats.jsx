import React, { useState } from "react";
import { useData } from "../Context/AppContext";
import { CrossIcon, MessageCircle, Send, SendHorizontal, X } from "lucide-react";
import apiCaller from "../Axios";
import { useParams } from "react-router-dom";
import {toast} from 'sonner'

const Chats = () => {
  const { setIsChats,Messages,setMessages } = useData();
  const [Text, setText] = useState('')

  const {id} = useParams()

 const sendMessage = ()=>{
  apiCaller.post(`/room/sendmessage/${id}`,{Text:Text})
  .then(res=>{
    const data = res.data
    setMessages([...Messages,data.message])
    setText('')
  }).catch(err=>{
    toast.error("Sorry")
  })
 }
  return (
    <div>
      <div className="absolute top-0 left-0 right-0 h-[4.5rem] bg-stone-900 z-20">
        <div className="m-2 rounded-2xl px-3 py-2 bg-[#ffffff0a] flex flex-row justify-between">
          <button
            onClick={() => {
              setIsChats(false);
            }}
            className="hover:text-red-400  rounded-2xl p-2 cursor-pointer"
          >
            <X />
          </button>
          <b className="text-xl font-[350] text-gray-400 flex gap-1 justify-center items-center">
            <MessageCircle /> <span>Chats</span>
          </b>
        </div>
      </div>
      {/* Message Box  */}
      <div className="noScrollBar overflow-auto absolute top-0 bottom-0 left-0 right-0 pt-18 pb-32 px-2">
            <div className="flex flex-col gap-2">
              {
                Messages?.map((itm,idx)=>{
                    return (
                        <div key={idx} className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <button className="flex justify-center items-center bg-[#50dfc052] text-black h-6 w-6 rounded-full">
                                    {itm.Sender?.toUpperCase()[0]}
                                </button>
                                <span className="text-lg font-[367]">
                                    {
                                        itm.Sender
                                    }
                                </span>
                            </div>
                            <textarea className="resize-none p-2 roundex-2xl h-fit rounded-2xl bg-[#ffffff10] outline-none cursor-auto" readOnly  >
                                {itm.Text}
                            </textarea>
                        </div>
                    )
                })
              }
            </div>
      </div>
      {/* Send Message  */}
      <div className="absolute bottom-0 left-0 right-0 bg-stone-900 z-20 h-[6.5rem]  px-[.3px]">
        <div className="h-full relative">
          <div
          className="absolute bottom-6 w-full flex gap-1 items-center"
          >
            <input
              value={Text}
              onChange={(e)=>{
                setText(e.target.value)
              }}
              placeholder="Enter Message"
              type="text"
              className="bg-[#ffffff28] py-3 px-4 rounded-3xl w-full outline-none text-lg font-sans text-gray-400"
            />
            <button
            onClick={sendMessage}
            className="bg-[#ffffff2d] h-12 w-14 flex justify-center items-center rounded-full cursor-pointer"
            >
                <SendHorizontal/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chats;

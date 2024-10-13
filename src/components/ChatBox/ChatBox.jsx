import React, { useContext, useEffect, useState } from "react";
import "./ChatBox.css";
import assets from "../../assets/assets.js";
import { AppContext } from "../../context/AppContext.jsx";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../../config/firebase.js";

const ChatBox = () => {
  const { userData, messagesId, chatUser, messages, setMessages } =
    useContext(AppContext);
  const [input, setInput] = useState("");

  const sendMessage = async ()=>{
    try {
      if(input && messagesId){
        await updateDoc(doc(db,"messages",messagesId),{
          messages: arrayUnion({
            sId : userData.id,
            text:input,
            createdAt: new Date()
          })
        })

        const userIDs = [chatUser.rId,userData.id];

        userIDs.forEach(async(id)=>{
          const userChatsRef = doc(db,"chats",id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if(userChatsSnapshot.exists()){
            const userChatData = userChatsSnapshot.data();
            const chatIndex = userChatData.chatsData.findIndex((c)=>c.messageId === messagesId); 
            userChatData.chatsData[chatIndex].lastMessage = input.slice(0,30);
            userChatData.chatsData[chatIndex].updatedAt = Date.now();
            if( userChatData.chatsData[chatIndex].rId === userData.id){
              userChatData.chatsData[chatIndex].messageSeen = false;
            }
            await updateDoc(userChatsRef,{
              chatsData: userChatData.chatsData
            })
          }

        })

      }
    } catch (error) {
      toast.error(error.message);
    }
    setInput("");
  }

  const convertTimestamp = (timestamp) =>{
    let date = timestamp.toDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    if(hour > 12){
      return hour -12  + ":" + minute + " PM";
  }
  else{
    return hour  + ":" + minute + " AM";
  }
}

  useEffect(()=>{
    if(messagesId){
      const unsub = onSnapshot(doc(db,"messages",messagesId),(res)=>{
        setMessages(res.data().messages.reverse())
      })
      return ()=>{
        unsub();
      }
    }
  },[messagesId])

  return chatUser ? (
    <div className="chat-box">
      <div className="chat-user">
        <img src={chatUser.userData.avatar} alt="img" />
        <p>
         {chatUser.userData.name}
          <img src={assets.green_dot} alt="green-dot" className="dot" />
        </p>
        <img src={assets.help_icon} className="help" alt="help" />
      </div>

      <div className="chat-msg">
        {messages.map((msg,index)=>( 
          <div key={index} className={msg.sId === userData.id? "s-msg": "r-msg"}>
          <p className="msg">{msg.text}</p>
          <div>
            <img src={msg.sId === userData.id ? userData.avatar : chatUser.userData.avatar} alt="" />
            <p>{convertTimestamp(msg.createdAt)}</p>
          </div>
        </div>
        ))}
       
       
      </div>

      <div className="chat-input">
        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" placeholder="Send a message" />
        <input type="file" id="image" accept="image/png, image/jpeg" hidden />
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="gallery-icon" />
        </label>
        <img onClick={sendMessage} src={assets.send_button} alt="send-button" />
      </div>
    </div>
  ) : (
    <div className="chat-welcome">
      <img src={assets.logo_icon} alt="" />
      <p>Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatBox;

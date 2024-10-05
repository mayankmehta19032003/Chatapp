import React from 'react'
import './Chat.css'
import LeftSidebar from "../../components/LeftSiderbar/LeftSidebar.jsx";
import ChatBox from "../../components/ChatBox/ChatBox.jsx";
import RightSidebar from "../../components/RightSidebar/RightSidebar.jsx"


const Chat = () => {
  return (
    <div className='chat'>
      <div className="chat-container">
        <LeftSidebar/>
        <ChatBox/>
        <RightSidebar/>
        
        
      </div>
    </div>
  )
}

export default Chat;

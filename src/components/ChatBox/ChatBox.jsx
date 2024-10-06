import React from 'react'
import "./ChatBox.css";
import assets from "../../assets/assets.js"

const ChatBox = () => {
  return (
    <div className='chat-box'>

      <div className="chat-user">
         <img src={assets.profile_img} alt="img" />
         <p>Richard Sandford <img src={assets.green_dot} alt="green-dot" className='dot' /></p>
         <img src={assets.help_icon} className='help' alt="help" />
      </div>

      <div className='chat-msg'>
        <div className="s-msg">
          <p className="msg">Lorem ipsum dolor sit amet consectetur!</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 pm</p>
          </div>
        </div>

        <div className="s-msg">
          <img src={assets.pic1} alt="pic-1" className='msg-img' />
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 pm</p>
          </div>
        </div>

        <div className="r-msg">
          <p className="msg">Lorem ipsum dolor sit amet consectetur!</p>
          <div>
            <img src={assets.profile_img} alt="" />
            <p>2:30 pm</p>
          </div>
        </div>
      </div>

      <div className='chat-input'>
        <input type="text" placeholder='Send a message'/>
        <input type="file" id="image" accept='image/png, image/jpeg' hidden/>
        <label htmlFor="image">
          <img src={assets.gallery_icon} alt="gallery-icon" />
        </label>
        <img src={assets.send_button} alt="send-button"/>
      </div>
       
    </div>
  )
}

export default ChatBox

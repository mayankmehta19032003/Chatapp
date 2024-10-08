import React from 'react'
import "./LeftSidebar.css";
import assets from "../../assets/assets.js";
import { logout } from '../../config/firebase.js';


const LeftSidbar = () => {
  return (
    <div className='ls'>
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="logo" className='logo' />
          <div className="menu">
            <img src={assets.menu_icon} alt="menu-icon" />
            <div className="sub-menu">
              <p>Edit Profile</p>
              <hr />
              <p onClick={()=> logout()}>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="search-logo" />
          <input type="text" placeholder='Search here' />
        </div>
      </div>
      <div className="ls-list">
        {Array(10).fill("").map((item,index)=>(
          <div key={index} className="friends">
          <img src={assets.profile_img} alt="profile" />
          <div>
            <p>Richard Sandford</p>
            <span>Hello how are you?</span>
          </div>
        </div>
        ))}
      </div>

    </div>
  )
}

export default LeftSidbar;

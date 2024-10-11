import React, { useContext, useState } from "react";
import "./LeftSidebar.css";
import assets from "../../assets/assets.js";
import { db, logout } from "../../config/firebase.js";
import { useNavigate } from "react-router-dom";
import { collection, getDoc, query, where } from "firebase/firestore";
import { AppContext } from "../../context/AppContext.jsx";

const LeftSidbar = () => {
  const navigate = useNavigate();
  const { userData } = useContext(AppContext);
  const [user, setUser] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  const inputHandler = async (e) => {
    try {
      const input = e.target.value;
      if (input) {
        setShowSearch(true);
        const userRef = collection(db, "users");
        const q = query(userRef, where("username", "==", input.toLowerCase()));
        const querySnap = await getDoc(q);
        if (!querySnap.empty && querySnap.docs[0].data().id !== userData.id) {
          setUser(querySnap.docs[0].data());
        }
        else{
          setUser(null);
        }
      }
      else{
        setShowSearch(false);
      }
    } catch (error) {}
  };

  return (
    <div className="ls">
      <div className="ls-top">
        <div className="ls-nav">
          <img src={assets.logo} alt="logo" className="logo" />
          <div className="menu">
            <img src={assets.menu_icon} alt="menu-icon" />
            <div className="sub-menu">
              <p onClick={() => navigate("/profile")}>Edit Profile</p>
              <hr />
              <p onClick={() => logout()}>Logout</p>
            </div>
          </div>
        </div>
        <div className="ls-search">
          <img src={assets.search_icon} alt="search-logo" />
          <input
            onChange={inputHandler}
            type="text"
            placeholder="Search here"
          />
        </div>
      </div>
      <div className="ls-list">
      {showSearch && user 
      ? <div className="friends add-user">
        <img src={user.avatar} alt="" />
        <p>{user.name}</p>
         </div> : Array(10)
          .fill("")
          .map((item, index) => (
            <div key={index} className="friends">
              <img src={assets.profile_img} alt="profile" />
              <div>
                <p>Richard Sandford</p>
                <span>Hello how are you?</span>
              </div>
            </div>
          ))  }
        
      </div>
    </div>
  );
};

export default LeftSidbar;

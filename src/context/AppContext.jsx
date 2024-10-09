import { doc, getDoc, updateDoc } from "firebase/firestore";
import { createContext, useState } from "react";
import { auth, db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = ({ children }) => {
    const navigate = useNavigate(); 
    const [userData, setUserData] = useState(null);
    const [chatData, setChatData] = useState(null);

    const loadUserData = async (uid) => {
        try {
            const userRef = doc(db, "users", uid);
            const userSnap = await getDoc(userRef);
            if (userSnap.exists()) { 
                const userData = userSnap.data();
                setUserData(userData);
                if (userData.avatar && userData.name) {
                    navigate("/chat");
                }  else {
                    navigate("/profile");
                }
            } else {
                navigate("/profile"); 
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const value = {
        userData,
        setUserData,
        chatData,
        setChatData,
        loadUserData,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;

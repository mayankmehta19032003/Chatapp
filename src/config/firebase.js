import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {getFirestore, setDoc,doc} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyAphLM9_BDsIo5CoprBTo4etj0o9DF-m8g",
  authDomain: "chatapp-mayank-1156d.firebaseapp.com",
  projectId: "chatapp-mayank-1156d",
  storageBucket: "chatapp-mayank-1156d.appspot.com",
  messagingSenderId: "965792421312",
  appId: "1:965792421312:web:4747599eedcb26dadc2425"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

//creating signup feature

const signup = async(username,email,password)=> {
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await setDoc(doc(db,"users",user.uid),{
            id:user.uid,
            username:username.toLowerCase(),
            email,
            name:"",
            avatar:"",
            bio:"Hey, There i am using Chapapp",
            lastSeen: Date.now()

        })
        await setDoc(doc(db,"chats",user.uid),{
            chatData: []
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code);
    }
}
export {signup}

//create login feature

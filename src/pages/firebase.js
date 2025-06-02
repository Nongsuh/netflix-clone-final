import { initializeApp } from "firebase/app";
import { 
    createUserWithEmailAndPassword,
    getAuth, 
    signInWithEmailAndPassword } from "firebase/auth";
import { 
    addDoc,
    collection, 
    getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCjVJuQnW6kn1g6N2ZrSGC-EujsAMdhfDo",
  authDomain: "netflix-clone-ac494.firebaseapp.com",
  projectId: "netflix-clone-ac494",
  storageBucket: "netflix-clone-ac494.firebasestorage.app",
  messagingSenderId: "732611194948",
  appId: "1:732611194948:web:a30b25d9c6538bd6df4c11"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup=async(name,email,password)=>{
    try{
        const res=await createUserWithEmailAndPassword(auth,email,password);
        const user=res.user;
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"local",
            email,
        });
    } catch(error){
        console.log(error);
        toast.error(error.code);
    }

}
const login =async(email,password)=>{
    try{
        signInWithEmailAndPassword(auth,email,password);
    }catch(error){
        console.log(error);
        toast.error(error.code);
    }
}

const logout=()=>{
    signOut(auth);
}

export {auth,db,login,signup,logout};
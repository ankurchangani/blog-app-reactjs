import { createUserWithEmailAndPassword , signInWithEmailAndPassword , signOut } from "firebase/auth";

import { auth , db } from "../../firebase.js";
import { setDoc  , doc } from "firebase/firestore";

const registerSuccess = () => ({ type: 'RegisterSuccess' });

const loginSuccess = (user) => ({ type: 'LoginSuccess', payload: user });

const loginError = (error) => ({ type: 'LoginError', payload: error });



export const registerAction = (data) => async (dispatch) => {
    try {
        const userCredintials = await createUserWithEmailAndPassword(auth , data.email , data.password);
        const user = userCredintials.user;
        await setDoc(doc(db , "users" , user.uid) , {name :data.name , email : data.email , uid : user.uid} )
        dispatch(registerSuccess());
    } catch (error) {
        
    }
}

export const loginAction = (data) => async (dispatch) => {
    try {
        if (!data.email || !data.password) { 
            dispatch(loginError("Email and password are required"));
            return;
        }

        const userCredentials = await signInWithEmailAndPassword(auth, data.email, data.password);
        const user = userCredentials.user;

        localStorage.setItem("userId", user.uid); 
        
        dispatch(loginSuccess({ uid: user.uid })); 
    } catch (error) {
        dispatch(loginError(error.message));
    }
};

export const logoutAction = () => async (dispatch) => {
    try {
        await signOut(auth);
        localStorage.removeItem("userId"); // Remove only userId
        dispatch({ type: 'LogoutSuccess' });
    } catch (error) {
        console.error("Error signing out:", error);
    }
};

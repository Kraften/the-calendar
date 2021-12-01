import { useContext } from "react";
import { auth } from './firebase'
import { signInWithEmailAndPassword } from "firebase/auth";
import AuthContext from "../../store/auth-context";

const SignIn = (email, password) => {
  const authCtx = useContext(AuthContext);
  signInWithEmailAndPassword(auth, email,  password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      // ...
    })
    .catch((error) => {
      // const errorCode = error.code;
      // const errorMessage = error.message;

    });
}

export default SignIn;
// import { useContext } from "react";
// import { auth } from './firebase'
// import { signInWithEmailAndPassword } from "firebase/auth";
// import AuthContext from "../../store/auth-context";


// const SignIn = (email, password) => {
//   signInWithEmailAndPassword(auth, email,  password)
//   .then((userCredential) => { // Signed in 
//       console.log(userCredential)
//       const authCtx = useContext(AuthContext);
//       console.log(authCtx)


//       const user = userCredential.user;
//       authCtx.login(user.accessToken)
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode, errorMessage)
//     });
// }

// export default SignIn;
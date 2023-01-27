import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, User } from "firebase/auth";

export default function() {
    const { $auth } = useNuxtApp();
    const user = useState<User | null>("firebase-user", () => null);

    function registerUser(email: any, password: any) {      
        createUserWithEmailAndPassword($auth, email, password)
          .then((userCredential) => {
            // Signed in 
            user.value = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }
      
    function loginUser(email: any, password: any) {
      
        signInWithEmailAndPassword($auth, email, password)
        .then((userCredential) => {
            // Signed in 
            user.value = userCredential.user;
          })
          .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
          });
    }

    return { user, loginUser, registerUser};
}


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut,
  onAuthStateChanged, GoogleAuthProvider, signInWithPopup, updateProfile, getIdToken} from "firebase/auth";
import { useEffect } from "react";
import {  useState } from "react";
import initializeAuthentication from "../pages/Login/Firebase/firebase.init";

initializeAuthentication();

const useFirebase = () => {
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [authError, setAuthError] = useState('');
  const [admin, setAdmin] = useState(false);
  const [token, setToken] = useState('');
  const googleProvider = new GoogleAuthProvider();
  const auth = getAuth();

  // Create New User
  const registerUser = (email, password, name, history) => {
      setIsLoading(true);
      createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential) => {
              setAuthError('');
              const newUser = { email, displayName: name };
              setUser(newUser);
              // save user to the database
              saveUser(email, name, 'POST');
              // send name to firebase after creation
              updateProfile(auth.currentUser, {
                  displayName: name
              }).then(() => {
              }).catch((error) => {
              });
              history.replace('/');
          })
          .catch((error) => {
              setAuthError(error.message);
              console.log(error);
          })
          .finally(() => setIsLoading(false));
  }

  // login User
  const loginUser = (email, password, location, history) => {
      setIsLoading(true)
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
          const destination = location?.state?.from || '/';
          history.replace(destination);
          setAuthError('')
      })
      .catch((error) => {
          setAuthError(error.message)
      })
      .finally( () => setIsLoading(false));
  }

    // Google Login
  const signInWithGoogle = (location, history) => {
      setIsLoading(true);
      signInWithPopup(auth, googleProvider)
          .then((result) => {
              const user = result.user;
              saveUser(user.email, user.displayName, 'PUT');
              setAuthError('');
              const destination = location?.state?.from || '/';
              history.replace(destination);
          }).catch((error) => {
              setAuthError(error.message);
          }).finally(() => setIsLoading(false));
  }


   // observer user state
   useEffect(() => {
      const unsubscribed = onAuthStateChanged(auth, (user) => {
          if (user) {
              setUser(user);
              getIdToken(user)
                  .then(idToken => {
                      setToken(idToken);
                  })
          } else {
              setUser({})
          }
          setIsLoading(false);
      });
      return () => unsubscribed;
  }, [auth])


 useEffect(() => {
  fetch(`https://polar-dusk-34230.herokuapp.com/users/${user.email}`)
      .then(res => res.json())
      .then(data => setAdmin(data.admin))
}, [user.email])

// Logout User
 const logOut = () => {
  setIsLoading(true)
  signOut(auth).then(() => {
  // Sign-out successful.
  }).catch((error) => {
  // An error happened.
  })
  .finally( () => setIsLoading(false));
}

// User and and admin added
const saveUser = (email, displayName, method) => {
  const user = { email, displayName };
  fetch('https://polar-dusk-34230.herokuapp.com/users', {
      method: method,
      headers: {
          'content-type': 'application/json'
      },
      body: JSON.stringify(user)
  })
      .then()
}
    return {
      user,
      admin,
      token,
      isLoading,
      authError,
      registerUser,
      loginUser,
      signInWithGoogle,
      logOut
    }
};

export default useFirebase;
import { useState, createContext, useContext, useEffect } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth, googleProvider, db } from "../config/firebase.js";
import { doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { formatDate } from "../util/formatting.js";

const AuthContext = createContext({
  currentUser: {
    user: null,
    data: null,
  },
  isUpdatingUser: false,
  handleLogin: () => { },
  handleRegister: () => { },
  handleSignInWithGoogle: () => { },
  handleEditProfile: () => { },
});

export const useAuth = () => {
  return useContext(AuthContext);
};

export function AuthContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [isUpdatingUser, setIsUpdatingUser] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, updateCurrentUser);
    return unsubscribe;
  }, []);

  async function updateCurrentUser(user) {
    setIsUpdatingUser(true);
    if (user) {
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      setCurrentUser(
        {
          user: { ...user },
          data: { ...userDoc.data() },
        }
      );
    } else {
      setCurrentUser(null);
    }
    setIsUpdatingUser(false);
  }

  async function handleLogin(data) {
    const { email, password } = data;
    await signInWithEmailAndPassword(auth, email, password);
  }

  async function handleRegister(data) {
    const { name, email, password, confirmedPassword, birthday } = data;

    if (password !== confirmedPassword) {
      throw new Error("Password and confirmed password did not match");
    }

    // Register the user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const userId = userCredential.user.uid;
    data = {
      name: name,
      birthday: formatDate(birthday),
      createdAt: formatDate(new Date()),
    }

    // Add the user's data to the firestore
    await setDoc(doc(db, 'users', userId), data);
  }

  async function handleSignInWithGoogle() {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const user = userCredential.user;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) {
      const data = {
        name: user.displayName,
        birthday: '',
        createdAt: formatDate(new Date()),
      }

      await setDoc(doc(db, 'users', user.uid), data);
    }
  }

  async function handleEditProfile(data) {
    const userDocRef = doc(db, 'users', currentUser.user.uid);
    data.birthday = formatDate(data.birthday);

    await updateDoc(userDocRef, data);
    await updateCurrentUser(currentUser.user);
  }

  const authCtx = {
    currentUser,
    isUpdatingUser,
    handleLogin,
    handleRegister,
    handleSignInWithGoogle,
    handleEditProfile,
  };

  return (
    <AuthContext.Provider value={authCtx}>
      {children}
    </AuthContext.Provider>
  );
};

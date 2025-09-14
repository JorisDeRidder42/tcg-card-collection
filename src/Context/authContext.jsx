import React, { useState, useEffect, useContext, createContext, useMemo } from 'react';
import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { doc, setDoc, deleteDoc, getDocs, collection } from "firebase/firestore";
import { toast } from 'react-toastify';

// Create a new context
const AuthContext = createContext();

// ✅ Fixed useAuth hook
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [savedCards, setSavedCards] = useState([]);

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();

    localStorage.setItem('token', token);
    console.log('Auth Token:', token);

    return userCredential;
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setAuthenticated(false); 
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  const toggleSaveCard = async (card) => {
    console.log('its called');
    if (!user) return;

    const cardRef = doc(db, "users", user.uid, "savedCards", card.id);
    const isSaved = savedCards.find(c => c.id === card.id);

    try {
    if (isSaved) {
      await deleteDoc(cardRef);
      setSavedCards(prev => prev.filter(c => c.id !== card.id));
      toast.info(`${card.name} removed from saved cards.`);
    } else {
      await setDoc(cardRef, card);
      setSavedCards(prev => [...prev, card]);
      toast.success(`${card.name} added to saved cards!`);
    }
  } catch (error) {
    toast.error('Oops, something went wrong.');
    console.error(error);
  }
  };

 useEffect(() => {
  let isMounted = true;

  const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
    if (!isMounted) return;

    if (firebaseUser) {
      setUser(firebaseUser);
      setAuthenticated(true);
      const snapshot = await getDocs(collection(db, "users", firebaseUser.uid, "savedCards"));
      const cards = snapshot.docs.map(doc => doc.data());
      setSavedCards(cards);
    } else {
      setUser(null);
      setAuthenticated(false);
      setSavedCards([]);
    }
    setLoading(false);
  });

  return () => {
    isMounted = false;
    unsub();
  };
}, []);


const value = useMemo(() => ({
  logout,
  authenticated,
  loading,
  signUp,
  signIn,
  googleSignIn,
  savedCards,
  toggleSaveCard,
  user
}), [authenticated, loading, savedCards, user]);


  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

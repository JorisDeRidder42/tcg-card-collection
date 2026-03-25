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
import { doc, setDoc, deleteDoc, getDocs, collection, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
  const navigate = useNavigate();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [savedCards, setSavedCards] = useState([]);

  // Authentication methods
  // const signUp = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  const signIn = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const token = await userCredential.user.getIdToken();
    localStorage.setItem('token', token);
    return userCredential;
  };

  const googleSignIn = () => signInWithPopup(auth, new GoogleAuthProvider());

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('token');
      setAuthenticated(false);
      setUser(null);
      setSavedCards([]);
    } catch (err) {
      console.error('Logout failed:', err);
      toast.error('Logout failed. Try again.');
    }
  };

  // Save / Remove card
  const toggleSaveCard = async (card) => {
    if (!user) return;

    const cardRef = doc(db, 'users', user.uid, 'savedCards', card.id);
    const isSaved = savedCards.some(c => c.id === card.id);

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
      console.error(error);
      toast.error('Oops, something went wrong.');
    }
  };


const clearCollection = async() => {
  if(!user) return;

  const colRef = collection(db, 'users', user.uid, 'savedCards');
  const snapshot = await getDocs(colRef);
  const batchDelete = snapshot.docs.map((d) => deleteDoc(doc(db, 'users', user.uid, 'savedCards', d.id)));
 
  await Promise.all(batchDelete);
  setSavedCards([]);
  toast.success("Collection cleared!");
  navigate('/');
};

  // Listen to auth state
  useEffect(() => {
    let isMounted = true;

    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!isMounted) return;

      if (firebaseUser) {
        setUser(firebaseUser);
        setAuthenticated(true);

        try {
          const snapshot = await getDocs(collection(db, 'users', firebaseUser.uid, 'savedCards'));
          const cards = snapshot.docs.map(doc => doc.data());
          setSavedCards(cards);
        } catch (err) {
          console.error('Failed to fetch saved cards:', err);
        }
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
    authenticated,
    loading,
    user,
    savedCards,
    // signUp,
    clearCollection,
    signIn,
    googleSignIn,
    logout,
    toggleSaveCard,
  }), [authenticated, loading, user, savedCards]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;

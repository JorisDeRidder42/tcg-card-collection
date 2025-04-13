// AuthContext.js

import React, { useState, useEffect, useContext, createContext } from 'react';
import { auth } from '../config/firebase';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

// Create a new context for authentication
const AuthContext = createContext();

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component to manage authentication state
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false)

  // Sign-up function
  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // Sign-in function
  const signIn = (email, password) => {
    console.log('it calls...')
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleSignIn = () => {
    console.log('google calls...')
    const provider = new GoogleAuthProvider(); // ✅ Use GoogleAuthProvider here
    return signInWithPopup(auth, provider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setAuthenticated(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    authenticated,
    signUp,
    signIn,
    googleSignIn
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
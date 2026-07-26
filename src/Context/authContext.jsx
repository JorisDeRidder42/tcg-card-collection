import React, { 
  useState, 
  useEffect, 
  useContext, 
  createContext, 
  useMemo 
} from 'react';
import { 
  auth, 
  db 
} from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from 'firebase/auth';
import { 
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  getDocs,
  collection,
  serverTimestamp
} from 'firebase/firestore';

import { toast } from 'react-toastify';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  // Firebase Auth user
  const [user, setUser] = useState(null);
  // Firestore user document
  const [profile, setProfile] = useState(null);
  const [savedCards, setSavedCards] = useState([]);

  // Email login
  const signIn = async(email,password)=>{
    const userCredential = 
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    const token = 
      await userCredential.user.getIdToken();
    localStorage.setItem(
      'token',
      token
    );
    return userCredential;
  };
  // Google login
  const googleSignIn = async()=>{
    const result = await signInWithPopup(
      auth,
      new GoogleAuthProvider()
    );
    const firebaseUser = result.user;
    // Maak Firestore profiel indien nodig
    const userRef = doc(
      db,
      "users",
      firebaseUser.uid
    );
    const userSnap = await getDoc(userRef);
    if(!userSnap.exists()){
      await setDoc(
        userRef,
        {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          favoritePokemon: "",
          favoriteSet: "",
          role: "user",
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
      );
    }
    return result;
  };
  // Logout
  const logout = async()=>{
    try{
      await signOut(auth);
      localStorage.removeItem(
        'token'
      );
      setAuthenticated(false);
      setUser(null);
      setProfile(null);
      setSavedCards([]);
    }catch(err){
      toast.error(
        "Logout failed. Try again."
      );
    }
  };
  // Save / remove card
  const toggleSaveCard = async(card)=>{
    if(!user) return;

    const cardRef = doc(
      db,
      'users',
      user.uid,
      'savedCards',
      card.id
    );
    const isSaved = savedCards.some(
      c => c.id === card.id
    );

    try{
      if(isSaved){
        await deleteDoc(cardRef);
        setSavedCards(prev =>
          prev.filter(
            c => c.id !== card.id
          )
        );
        toast.info(
          `${card.name} removed`
        );
      }else{
        const savedCard = {
          id: card.id,
          name: card.name,
          image: card.image,
          localId: card.localId,
          setId: card.setId ?? card.set?.id,
          setName: card.setName ?? card.set?.name,
          rarity: card.rarity || null,
          category: card.category || null,
        };
        console.log("CARD BEFORE SAVE", card);
        console.log("SET ID TEST", card.setId, card.set?.id);

        console.log("SAVED CARD OBJECT", savedCard);
        await setDoc(
          cardRef,
          savedCard
        );

        setSavedCards(prev=>[
          ...prev,
          savedCard
        ]);
        toast.success(
          `${card.name} saved!`
        );
      }
    }catch(error){
      console.log('SavedCard  error', error);
      toast.error(
        "Something went wrong.", error.message
      );
    }
  };
  // Clear collection
  const clearCollection = async() => {
    if(!user) return;
    const colRef = collection(
      db,
      'users',
      user.uid,
      'savedCards'
    );
    const snapshot = await getDocs(
      colRef
    );

    const deletes = snapshot.docs.map(
      item =>
        deleteDoc(
          doc(
            db,
            'users',
            user.uid,
            'savedCards',
            item.id
          )
        )
    );
    await Promise.all(deletes);
    setSavedCards([]);
    toast.success(
      "Collection cleared!"
    );
    window.location.href ='/';
  };
  // Auth listener
  useEffect(()=>{
    const unsubscribe =
      onAuthStateChanged(
        auth,
        async(firebaseUser)=>{
          if(firebaseUser){
            setUser(firebaseUser);
            setAuthenticated(true);
            try{
              // Firestore profiel ophalen
              const userRef = doc(
                db,
                "users",
                firebaseUser.uid
              );
              const userSnap = await getDoc(userRef);

              if(userSnap.exists()){
                setProfile(userSnap.data() );
              }else{
                // fallback profiel maken
                const newProfile = {
                  displayName:
                    firebaseUser.displayName,
                  email:
                    firebaseUser.email,
                  photoURL:
                    firebaseUser.photoURL,
                  favoritePokemon:"",
                  favoriteSet:"",
                  role:"user",
                  createdAt:
                    serverTimestamp(),
                  updatedAt:
                    serverTimestamp()
                };
                await setDoc(
                  userRef,
                  newProfile
                );
                setProfile(
                  newProfile
                );
              }
              // Saved cards laden
              const snapshot =
                await getDocs(
                  collection(
                    db,
                    'users',
                    firebaseUser.uid,
                    'savedCards'
                  )
                );
              const cards =
                snapshot.docs.map(
                  doc=>doc.data()
                );
              setSavedCards(cards);
            }catch(error){
               toast.error(
        "Something failed. Try again."
              );
            }
          }else{
            setUser(null);
            setProfile(null);
            setAuthenticated(false);
            setSavedCards([]);
          }
          setLoading(false);
        }
      );
      return ()=>unsubscribe();
  }, []);

  const value = useMemo(()=>({
    authenticated,
    loading,
    // Auth user
    user,
    // Firestore user data
    profile,
    savedCards,
    signIn,
    googleSignIn,
    logout,
    toggleSaveCard,
    clearCollection
  }),[
    authenticated,
    loading,
    user,
    profile,
    savedCards

  ]);
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
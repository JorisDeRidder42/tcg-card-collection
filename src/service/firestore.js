import { db } from '../firebase';
import { doc, setDoc, collection, getDocs } from 'firebase/firestore';

// Add a card to the user's collection
export const addCardToCollection = async (userId, card) => {
  const cardRef = doc(db, 'users', userId, 'collection', card.id);
  await setDoc(cardRef, {
    name: card.name,
    set: card.set,
    imageUrl: card.imageUrl,
    quantity: 1,
    addedAt: new Date(),
  });
};

// Get all cards from a user's collection
export const getUserCollection = async (userId) => {
  const colRef = collection(db, 'users', userId, 'collection');
  const snapshot = await getDocs(colRef);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

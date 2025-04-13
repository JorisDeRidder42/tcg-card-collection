import { useEffect, useState } from 'react';
import { getUserCollection } from '../services/firestore'; // same function we made earlier

export const useCollection = (userId) => {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const fetch = async () => {
      const data = await getUserCollection(userId);
      setCards(data);
    };

    fetch();
  }, [userId]);

  return cards;
};

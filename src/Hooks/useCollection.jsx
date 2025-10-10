import { useEffect, useState } from 'react';
import { getUserCollection } from '../services/firestore';

export const useCollection = (userId) => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) {
      setCards([]);
      setLoading(false);
      return;
    }

    const fetchCollection = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getUserCollection(userId);
        setCards(data);
      } catch (err) {
        console.error('Failed to fetch user collection:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollection();
  }, [userId]);

  return { cards, loading, error };
};

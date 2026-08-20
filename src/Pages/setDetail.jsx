import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchList } from '../hooks/useDataHook';
import CardList from '../components/Card/CardList';
import SkeletonCards from '../loaders/SkeletonCards';
import { useAuth } from '../Context/authContext';
import { getSetProgress } from '../utils/progress';
import ProgressSection from '../components/ProgressSection';
import SetHeader from '../components/Set/SetHeader';

const SetDetail = () => {
  const { setId } = useParams();
  const navigate = useNavigate();

  const { toggleSaveCard, savedCards } = useAuth();
  // Set informatie
  const { data: sets, isLoading: setsLoading } = useFetchList('/sets');
  // Kaarten van deze set
  const { data: cards, isLoading: cardsLoading } = useFetchList(
    setId ? `/cards?set.id=${setId}` : null
  );

  const currentSet = useMemo(() => {
    if (!sets) return null;
    return sets.find((set) => set.id === setId);
  }, [sets, setId]);

  const sortedCards = useMemo(() => {
    if (!cards) return null;
    return [...cards].reverse();
  }, [cards]);

  const isCardSaved = (id) => savedCards.some((card) => card.id === id);

  if (setsLoading) {
    return <div className="p-6">Loading set...</div>;
  }

  if (!currentSet) {
    return <div className="p-6">Set niet gevonden</div>;
  }
  const progress = getSetProgress(currentSet, savedCards, cards);
  console.log('currentset', currentSet);
  return (
    <div className="container max-w-screen-xl mx-auto py-6">
      {/* Terug knop */}
      <button
        className="btn btn-primary my-5 px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
        onClick={() => navigate('/')}
      >
        ← Alle sets
      </button>

      {/* Set header */}
      <SetHeader currentSet={currentSet} progress={progress} />

      {/* Cards */}
      {cardsLoading ? (
        <SkeletonCards />
      ) : (
        <CardList
          currentSet={currentSet}
          cards={sortedCards}
          isCardSaved={isCardSaved}
          onCardClick={toggleSaveCard}
          onCardDetailClick={(card) => navigate(`/card/${card.id}`)}
        />
      )}
    </div>
  );
};

export default SetDetail;

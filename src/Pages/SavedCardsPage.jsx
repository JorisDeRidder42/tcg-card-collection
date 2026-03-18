import React from 'react';
import { useAuth } from '../Context/authContext';
import CardList from '../components/CardList';
import { useNavigate } from 'react-router-dom';

const SavedCardsPage = () => {
  const { savedCards, toggleSaveCard } = useAuth();
  const navigate = useNavigate();
  const countCards = savedCards.length;

  const isCardSaved = (cardId) => savedCards.some(card => card.id === cardId);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
         <button className="btn btn-secondary mb-4" onClick={() => navigate('/')}>
        Back to Home
      </button>
       <h5>You have <label className='text-danger'>{countCards}</label> saved cards.</h5>

      <h1 className="text-3xl font-bold mb-6">Your Saved Cards</h1>

      {savedCards.length === 0 ? (
        <p className='text-center'>You haven't saved any cards yet.</p>
      ) : (
        <CardList 
          cards={savedCards} 
          onCardClick={toggleSaveCard} 
          isCardSaved={isCardSaved} 
        />
      )}
    </div>
  );
};

export default SavedCardsPage;

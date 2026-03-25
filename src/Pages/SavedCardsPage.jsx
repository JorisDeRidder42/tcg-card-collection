import React from 'react';
import { useAuth, } from '../Context/authContext';
import CardList from '../components/CardList';
import { useNavigate } from 'react-router-dom';
import { FaHome } from "react-icons/fa";

const SavedCardsPage = () => {
  const { savedCards, toggleSaveCard, clearCollection} = useAuth();
  const navigate = useNavigate();
  const countCards = savedCards.length;

  const isCardSaved = (cardId) => savedCards.some(card => card.id === cardId);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
         <button className="btn btn-secondary mb-4" onClick={() => navigate('/')}>
        <FaHome />
      </button>
      <button
  className="btn btn-warning"
  onClick={() => {
    if (window.confirm("Remove ALL cards from your collection?")) {
      clearCollection();
    }
  }}
>
  Clear Collection
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

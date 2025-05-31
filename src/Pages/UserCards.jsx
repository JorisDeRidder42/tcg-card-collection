import React from 'react';
import { useCollection } from './hooks/useCollection';

const UserCards = () => {
  const {savedCards, toggleSaveCards, user } = useCollection();


  if (!user) return <p>Please log in to save cards.</p>;
  
  return (
    <div>
      <h2>Your Collection</h2>
      {!cards.length && <p>No cards yet.</p>}

      {cards.map(card => {
        const isSaved = savedCards.some(c => c.id === card.id);
        return(
          <div key={card.id}>
            <img src={card.imageUrl} alt={card.name} width={100} />
            <p>{card.name}</p>
            <button onClick={() => toggleSaveCards(card)}></button>
            </div>
        )
      })}
      </div>
  );
};

export default UserCards;

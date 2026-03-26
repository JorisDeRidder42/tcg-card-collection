import React from 'react';
import { useCollection } from './hooks/useCollection';

const UserCards = () => {
  const {savedCards, toggleSaveCards, user } = useCollection();
  console.log('savedCards', savedCards);

  if (!user) return <p className='text-center'>Please log in to save cards.</p>;

  if (!savedCards || savedCards.length === 0) {
    return (
      <div className='text-center'>
        <h2>Your Collection</h2>
        <p>No cards yet.</p>
      </div>
    );
  }
  
return (
    <div>
      <h2>Your Collection</h2>
      <div className="d-flex flex-wrap gap-3">
        {savedCards.map((card) => (
          <div key={card.id} className="card p-2" style={{ width: '120px' }}>
            <img src={card.imageUrl} alt={card.name} className="mb-2" width={100} />
            <p className="text-center">{card.name}</p>
            
            <button
              className="btn btn-sm btn-primary w-100" onClick={() => toggleSaveCards(card)}>
              {savedCards.some((c) => c.id === card.id) ? 'Remove' : 'Save'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserCards;

import React from 'react';
import { useCollection } from './hooks/useCollection';

const UserCards = ({ user }) => {
  const cards = useCollection(user?.uid);

  return (
    <div>
      <h2>Your Collection</h2>
      {!cards.length && <p>No cards yet.</p>}
      {cards.map(card => (
        <div key={card.id} style={{ marginBottom: 16 }}>
          <img src={card.imageUrl} alt={card.name} width={100} />
          <p>{card.name} — Set: {card.set}</p>
        </div>
      ))}
    </div>
  );
};

export default UserCards;

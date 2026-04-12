import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const CardList = ({ cards, onCardClick, onCardDetailClick, selectedCardId, isCardSaved }) => {


  const getImage = (card) => {
    if(!card?.image) return '/placeholder.svg';
    return `${card.image}/low.png`;
  }


  return (
    <Container>
      <Row>
        {cards?.map((card) => {
          const saved = isCardSaved(card.id);

          return (
            <Col key={card.id} xs={12} sm={6} md={3} lg={2}>
              <div className={`card-item ${saved ? "saved" : ""}`}  onClick={() => onCardDetailClick?.(card)}>
               
                <img
                className='card-img'
                src={getImage(card)}
                alt={card.name} 
                loading='lazy'
                onError={(e) => e.target.src = '/placeholder.svg'}
                />
                {/* HOVER OVERLAY */}
                <div className='card-overlay'>
                  <button className={`save-btn ${saved ? "saved" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(card);
                  }}
                  >
                  {saved ? "★" : "☆"}
                </button>
              </div>
                {/* SUBTLE SAVED INDICATOR */}
              {saved && <span className="saved-check">✓</span>}
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CardList;
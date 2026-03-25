import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const CardList = ({ cards, onCardClick, selectedCardId, isCardSaved }) => {


  const getImage = (card) => {
    if(!card?.image) return '/placeholder.svg';
    return `${card.image}/high.png`;
  }


  return (
    <Container>
      <Row>
        {cards?.map((card) => {
          const isSelected = card.id === selectedCardId;
          const saved = isCardSaved(card.id);

          return (
            <Col key={card.id} xs={12} sm={6} md={3} lg={2}>
              <div
                onClick={() => onCardClick(card)}
                style={{
                  cursor: 'pointer',
                  marginTop: '12px',
                  transition: 'all 0.3s ease-in-out',
                  padding: '4px',
                  position: 'relative', // nodig voor vinkje overlay
                }}
              >
                <img
                  src={getImage(card)}
                  alt={card.name} loading='lazy'
                  onError={(e) => e.target.src = '/placeholder.svg'}
                  style={{
                    width: '100%',
                    display: 'block',
                    borderRadius: '8px',
                    transition: 'transform 0.3s ease-in-out',
                  }}
                />

                {/* Groen vinkje voor opgeslagen kaarten */}
                {saved && (
                  <div
                    style={{
                     position: 'absolute',
                      top: 0,
                      right: 0,
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0, 188, 0, 0.8)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: '14px',
                      pointerEvents: 'none'
                    }}
                  >
                    ✓
                  </div>
                )}
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CardList;
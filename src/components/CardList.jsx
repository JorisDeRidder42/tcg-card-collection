import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const CardList = ({ cards, onCardClick, selectedCardId, isCardSaved }) => {
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
                  border: isSelected ? '3px solid #ffff00' : '3px solid transparent',
                  borderRadius: '8px',
                  transition: 'all 0.3s ease-in-out',
                  padding: '4px',
                  position: 'relative', // nodig voor vinkje overlay
                }}
              >
                <img
                  src={card.image ? `${card.image}/low.webp` : '/placeholder.png'}
                  alt={card.name}
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
                      top: '4px',
                      right: '4px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      backgroundColor: '#00ff00',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      pointerEvents: 'none',
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
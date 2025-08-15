import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';


const CardList = ({ cards, onCardClick, selectedCardId  }) => {
  return (
     <Container>
      <Row>
        {cards?.map((card) => {
          const isSelected = card.id === selectedCardId;
          return (
            <Col key={card.id} xs={12} sm={6} md={3} lg={2}>
              <div
                onClick={() => onCardClick(card)}
                style={{
                  cursor: 'pointer',
                  marginTop: '12px',
                  border: isSelected ? '3px solid #ffff00ff' : '3px solid transparent',
                  borderRadius: '8px',
                  boxShadow: isSelected ? '0 0 12px rgba(255, 242, 0, 0.5)' : 'none',
                  transition: 'all 0.3s ease-in-out',
                  padding: '4px'
                }}
              >
                <div>
                  <img
                    src={card.images.small}
                    alt={card.name}
                    style={{
                      width: '100%',
                      display: 'block',
                      borderRadius: '8px',
                      transition: 'transform 0.3s ease-in-out'
                    }}
                    className="hover-zoom"
                  />
                </div>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CardList;

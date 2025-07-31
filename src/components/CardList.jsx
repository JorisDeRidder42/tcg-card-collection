import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';


const CardList = ({ cards, onCardClick, isCardSaved }) => {
  return (
    <Container>
      <Row>
        {cards?.map((card) => (
          <Col key={card.id} xs={12} sm={6} md={3} lg={2}>
            <div 
              onClick={() => onCardClick(card)} 
               style={{ cursor: 'pointer', marginTop: '12px' }}>
               <div
                  style={{
                    border: isCardSaved && isCardSaved(card.id) ? '4px solid gold' : '4px solid transparent',
                    borderRadius: '12px',
                    padding: '6px',
                    transition: 'border 0.2s ease-in-out',
                    overflow: 'hidden', // ensures image doesn't overflow on zoom
                  }}
                >
                  <img
                    src={card.images.small}
                    alt={card.name}
                    style={{ width: '100%', display: 'block', borderRadius: '8px', transition: 'transform 0.3s ease-in-out', }}
                    className="hover-zoom"
                  />
                </div>
              </div>
            </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardList;

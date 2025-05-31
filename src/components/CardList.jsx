import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';


const CardList = ({ cards, onCardClick }) => {
  return (
    <Container>
      <Row>
        {cards?.map((card) => (
          <Col key={card.id} xs={12} sm={6} md={4} lg={3}>
            <div 
              onClick={() => onCardClick(card)} 
              style={{ cursor: 'pointer', position: 'relative' }}
            >
              <img src={card.images.small} alt={card.name} className="w-full mt-3" />
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardList;

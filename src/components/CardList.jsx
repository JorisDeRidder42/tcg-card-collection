// components/CardList.js
import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';

const CardList = ({ cards }) => {
  return (
    <Container>
      <Row>
        {cards?.map((card) => (
          <Col key={card.id} xs={12} sm={6} md={4} lg={3}>
            <img src={card.images.small} alt={card.name} className="w-full mt-3" />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardList;

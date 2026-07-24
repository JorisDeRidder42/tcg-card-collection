import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import PokemonCard from './PokemonCard';

const CardList = ({ cards, onCardClick, onCardDetailClick, isCardSaved }) => {

    const getImage = (card) => {
    if(!card?.image) return '/placeholder.svg';
    return `${card.image}/low.png`;
  }

  return (
    <Container>
      <Row>
        {cards?.map(card => (
          <Col 
            key={card.id} xs={6} sm={6} md={3} lg={2}
          >
            <PokemonCard
              card={card}
              saved={isCardSaved(card.id)}
              onSave={onCardClick}
              onDetail={onCardDetailClick}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CardList;
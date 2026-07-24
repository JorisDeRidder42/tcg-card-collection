import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import PokemonCard from './PokemonCard';

const CardList = ({ cards, onCardClick, onCardDetailClick, isCardSaved }) => {
  console.log("cards", cards);
    const getImage = (card) => {
    if(!card?.image) return '/placeholder.svg';
    return `${card.image}/low.png`;
  }

  return (
    <Container className="card-grid">
      <Row className="g-3">
        {cards?.map(card => {
          const saved = isCardSaved(card.id);
          return (

            <Col
              key={card.id}
              xs={6}
              sm={4}
              md={3}
              lg={2}
            >
               {/* INFO */}
                <div className="card-info">
                  <strong>
                    {card.name}
                  </strong>
                </div>
              <div className="card-item">
                {/* IMAGE */}
                <img
                  src={getImage(card)}
                  alt={card.name}
                  loading="lazy"
                  className="card-image"
                  onError={(e)=>
                    e.target.src="/placeholder.svg"
                  }
                  onClick={() =>
                    onCardDetailClick(card)
                  }
                />
                {/* SAVE BUTTON */}
                <button
                  className={`save-button ${saved ? "owned" : ""}`}
                  onClick={(e)=>{
                    e.stopPropagation();
                    onCardClick(card);
                  }}
                >
                  {saved ? "✓" : "+"}
                </button>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CardList;
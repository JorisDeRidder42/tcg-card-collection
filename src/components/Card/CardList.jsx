import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { VscCheck, VscAdd } from 'react-icons/vsc';

const CardList = ({
  cards,
  onCardClick,
  onCardDetailClick,
  isCardSaved,
  currentSet,
}) => {
  const getImage = (card) => {
    if (!card?.image) return '/placeholder.svg';
    return `${card.image}/low.png`;
  };

  return (
    <Container fluid className="px-0">
      <Row className="g-4">
        {cards?.map((card) => {
          const saved = isCardSaved(card.id);

          return (
            <Col key={card.id} xs={6} sm={4} md={3} lg={2}>
              <Card className="h-100 border-0 shadow-lg none-hover-card rounded-4 overflow-hidden d-flex flex-column">
                <Card.Header className="bg-transparent border-0 pt-3 pb-0 px-3 text-center">
                  <span
                    className="fw-semibold text-light text-truncate d-block"
                    style={{ fontSize: '0.9rem' }}
                    title={card.name}
                  >
                    {card.name}
                  </span>
                </Card.Header>

                {/* Afbeelding van de kaart */}
                <Card.Body className="p-3 d-flex align-items-center justify-content-center position-relative">
                  <div
                    className="card-item-wrapper w-100 position-relative"
                    style={{ cursor: 'pointer' }}
                  >
                    <img
                      src={getImage(card)}
                      alt={card.name}
                      className="img-fluid rounded-3 w-100 shadow-sm"
                      style={{
                        objectFit: 'contain',
                        transition: 'transform 0.2s ease',
                      }}
                      onError={(e) => (e.target.src = '/placeholder.svg')}
                      onClick={() => onCardDetailClick(card)}
                    />
                  </div>
                </Card.Body>

                {/* Footer met de Save / Collectie knop */}
                <Card.Footer className="bg-transparent border-0 pb-3 pt-0 px-3 text-center">
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCardClick({
                        ...card,
                        setId: currentSet.id,
                        setName: currentSet.name,
                      });
                    }}
                    className={`w-100 d-flex align-items-center justify-content-center gap-1 border-0 fw-semibold py-2 text-white ${saved ? 'btn-success' : 'btn-primary'}`}
                    style={{
                      borderRadius: '10px',
                      background: saved
                        ? 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
                        : 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                      fontSize: '0.85rem',
                    }}
                  >
                    {saved ? (
                      <>
                        <VscCheck size={16} /> In collectie
                      </>
                    ) : (
                      <>
                        <VscAdd size={16} /> Toevoegen
                      </>
                    )}
                  </Button>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default CardList;

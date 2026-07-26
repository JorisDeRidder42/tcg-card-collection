import { Container, Row, Col, Badge } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useFetchList } from "../../hooks/useDataHook";
import { useAuth } from "../../Context/authContext";

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: card } = useFetchList(`/cards/${id}`);
  const { data: setCards } = useFetchList(card?.set?.id ? `/cards?set.id=${card.set.id}` : null);
  const { savedCards, toggleSaveCard } = useAuth();

  if (!card) return <h6>Card not found...</h6>;

  const saved = savedCards?.some(
    collection => collection.id === card.id
  );

  const sortedCards = [...(setCards || [])].sort(
  (a,b) =>
    Number(a.localId) - Number(b.localId)
);


const currentIndex = sortedCards.findIndex(
  c => c.id === card.id
);


const previousCard =
  currentIndex > 0
    ? sortedCards[currentIndex - 1]
    : null;


const nextCard =
  currentIndex < sortedCards.length - 1
    ? sortedCards[currentIndex + 1]
    : null;


  return (
    <Container className="py-5">

      <button
        className="btn btn-primary mb-4"
        onClick={() => navigate(`/sets/${card.set.id}`)}
      >
        ← {card.set.name}
      </button>

        <div className="d-flex justify-content-between align-items-center mb-4">

  <button
    className="btn btn-outline-primary"
    disabled={!previousCard}
    onClick={() =>
      navigate(`/card/${previousCard.id}`)
    }
  >
    ← Vorige
  </button>


  <span className="fw-bold">
    {currentIndex + 1} / {sortedCards.length}
  </span>


  <button
    className="btn btn-outline-primary"
    disabled={!nextCard}
    onClick={() =>
      navigate(`/card/${nextCard.id}`)
    }
  >
    Volgende →
  </button>

</div>


      <Row className="align-items-start g-5">

        {/* CARD IMAGE */}
        <Col md={5} className="text-center">

          <div className="card-viewer">
            {previousCard && (
              <img
                src={`${previousCard.image}/low.png`}
                alt={previousCard.name}
                className="stack-card left"
                onClick={() =>
                  navigate(`/card/${previousCard.id}`)
                }
              />
            )}


            <img
              src={`${card.image}/high.png`}
              alt={card.name}
              className="main-card"
            />


            {nextCard && (
              <img
                src={`${nextCard.image}/low.png`}
                alt={nextCard.name}
                className="stack-card right"
                onClick={() =>
                  navigate(`/card/${nextCard.id}`)
                }
              />
            )}

          </div>
        </Col>
        {/* CARD INFO */}
        <Col md={7}>

          <h1 className="mb-2">
            {card.name}
          </h1>


          <div className="mb-3">

            <img
              src={`${card.set?.symbol}.png`}
              alt={card.set?.name} widt={30}
            />
            <span className="ms-2">
              {card.set?.name}
            </span>

          </div>
          <div className="d-flex gap-2 flex-wrap mb-4">

            <Badge bg="dark">
              #{card.localId}
            </Badge>

            <Badge bg="secondary">
              {card.category}
            </Badge>


            {card.rarity && (
              <Badge bg="warning">
                {card.rarity}
              </Badge>
            )}

          </div>
          {/* Pokemon */}
          {card.category === "Pokemon" && (

            <div className="card-info-box">

              {card.hp && (
                <p>
                  ❤️ HP: {card.hp}
                </p>
              )}

              {card.types?.length > 0 && (
                <p>
                  Type: {card.types.join(", ")}
                </p>
              )}
              <h4>
                Attacks
              </h4>

              {card.attacks?.map((attack,index)=>(
                <div
                  key={index}
                  className="mb-3"
                >

                  <strong>
                    {attack.name}
                  </strong>

                  <span className="ms-3">
                    {attack.damage}
                  </span>

                  <p>
                    {attack.effect}
                  </p>

                </div>
              ))}

            </div>

          )}


          {/* Trainer */}
          {card.category === "Trainer" && (

            <div className="card-info-box">

              <h4>
                {card.trainerType}
              </h4>

              <p>
                {card.effect}
              </p>

            </div>

          )}


          <p className="mt-4">
            Illustrator:
            <strong>
              {" "}
              {card.illustrator}
            </strong>
          </p>


          <button
            className={`btn ${
              saved
                ? "btn-warning"
                : "btn-success"
            }`}
            onClick={() => toggleSaveCard(card)}
          >
            {saved ? "★ Saved" : "☆ Save"}
          </button>
        </Col>
      </Row>
    </Container>
  );
};

export default CardDetail;
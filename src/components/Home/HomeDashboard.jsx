import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import SetProgressBar from "../ProgressSection";
import { getSetProgress } from "../../utils/progress";
import { getSetColor } from "../../utils/setColors";

const HomeDashboard = ({ sets, savedCards, showAllSets, setShowAllSets }) => {
  const navigate = useNavigate(); 

  if (!sets || sets.length === 0) {
    return (
      <div className="text-center py-6">
        <h2>Geen sets gevonden...</h2>
      </div>
    );
  }

  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold mb-4">
        Pokémon Sets
      </h2>

      {/* 4-koloms Grid systeem met React-Bootstrap */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {sets.map((set) => {
          const progress = getSetProgress(set, savedCards);
          return (
            <Col key={set.id}>
              <Card 
                className="h-100 shadow-md"
                onClick={() => navigate(`/sets/${set.id}`)}
                style={{ cursor: 'pointer', transition: 'transform 0.2s ease' }}
              >
                <Card.Body className="d-flex flex-column justify-content-between">
                  {set.logo ? (
                    <Card.Img
                      src={set.logo + '.png'}
                      alt={set.name}
                      loading="lazy"
                      className="sets-image mx-auto mb-4 object-fit-contain"
                      style={{ height: '80px' }}
                    />
                  ) : (
                    <h3 className="text-center text-lg font-bold mt-4 mb-4">
                      {set.name}
                    </h3>
                  )}

                  <SetProgressBar progress={progress} />
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>
        
      {!showAllSets && (
        <div className="d-flex justify-content-center mt-5">
          <Button
            size="lg"
            onClick={() => setShowAllSets(true)}
            className="my-4 px-4"
          >
            Toon meer sets ↓
          </Button>
        </div>
      )}
    </section>
  );
};

export default HomeDashboard;
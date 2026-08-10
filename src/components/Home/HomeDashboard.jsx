import React from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import SetProgressBar from "../ProgressSection";
import { getSetProgress } from "../../utils/progress";

const SetDashboard = ({ sets, savedCards, showAllSets, setShowAllSets }) => {
  const navigate = useNavigate(); 

  if (!sets || sets.length === 0) {
    return (
      <div className="text-center py-6 text-light">
        <h2>Geen sets gevonden...</h2>
      </div>
    );
  }

  return (
    <section className="mt-4">
      <h2 className="text-2xl font-bold mb-4 text-light" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
        Pokémon Sets
      </h2>

      {/* 4-koloms Grid systeem */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {sets.map((set) => {
          const progress = getSetProgress(set, savedCards);
          return (
            <Col key={set.id}>
              <Card 
                className="h-100 text-light border-0 shadow-lg set-glass-card"
                onClick={() => navigate(`/sets/${set.id}`)}
                style={{ cursor: 'pointer' }}
              >
                <Card.Body className="d-flex flex-column justify-content-between p-4">
                  {set.logo ? (
                    <Card.Img
                      src={set.logo + '.png'}
                      alt={set.name}
                      className="sets-image mx-auto object-fit-contain"
                      style={{ height: '70px', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}
                    />
                  ) : (
                    <h3 className="text-center text-lg font-bold mt-3 mb-3">
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
            size="md"
            onClick={() => setShowAllSets(true)}
            className="px-5 py-3 fw-bold border-0 text-white shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
              borderRadius: '12px',
              transition: 'transform 0.2s ease, opacity 0.2s ease'
            }}
          >
            Toon meer sets ↓
          </Button>
        </div>
      )}
    </section>
  );
};

export default SetDashboard;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import SetProgressBar from '../ProgressSection';
import { getSetProgress } from '../../utils/progress';

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
    <section className="mt-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2
          className="text-2xl font-bold text-light m-0"
          style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}
        >
          Pokémon Sets
        </h2>
        <span className="text-muted small">Totaal: {sets.length} sets</span>
      </div>

      {/* 4-koloms Grid systeem */}
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {sets.map((set) => {
          const progress = getSetProgress(set, savedCards);

          return (
            <Col key={set.id}>
              <Card
                className="h-100 text-light border-0 shadow-lg set-glass-card rounded-4 overflow-hidden"
                onClick={() => navigate(`/sets/${set.id}`)}
                style={{
                  cursor: 'pointer',
                  backgroundColor: 'rgba(23, 25, 35, 0.6)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 20px rgba(0,0,0,0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                }}
              >
                <Card.Body className="d-flex flex-column justify-content-between p-4">
                  {/* Logo of Titel */}
                  <div
                    className="text-center mb-3"
                    style={{
                      minHeight: '70px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {set.logo ? (
                      <Card.Img
                        src={set.logo + '.png'}
                        alt={set.name}
                        className="img-fluid object-fit-contain"
                        style={{
                          maxHeight: '65px',
                          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
                        }}
                      />
                    ) : (
                      <h5 className="fw-bold m-0 text-light">{set.name}</h5>
                    )}
                  </div>

                  {/* Voortgangssectie en extra tekst */}
                  <div>
                    <div className="d-flex justify-content-between align-items-center mb-1 small text-muted">
                      <span>Voortgang</span>
                      <strong className="text-light">
                        {progress?.percentage || 0}%
                      </strong>
                    </div>

                    <SetProgressBar progress={progress} />

                    <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top border-secondary border-opacity-25 small text-muted">
                      <span>Verzameld:</span>
                      <strong className="text-light">
                        {progress?.collected || 0} /{' '}
                        {progress?.total || set.cardCount?.total || 0}
                      </strong>
                    </div>
                  </div>
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
              transition: 'transform 0.2s ease, opacity 0.2s ease',
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

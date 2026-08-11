import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import ProgressSection from '../ProgressSection';

const SetHeader = ({ currentSet, progress }) => {
  if (!currentSet) return null;

  return (
    <Card className="mt-5 text-light border-0 shadow-lg none-hover-card mb-4 p-4 rounded-4">
      <Card.Body className="p-0">
        <Row className="align-items-center">
          {/* Linker kolom: Logo, Titel en de Info-pillen */}
          <Col
            xs={12}
            lg={5}
            className="text-center text-lg-start mb-4 mb-lg-0"
          >
            {/* Logo */}
            {currentSet.logo && (
              <div className="mb-3">
                <img
                  src={currentSet.logo + '.png'}
                  alt={currentSet.name}
                  className="img-fluid"
                />
              </div>
            )}
            <h1
              className="fw-bold display-6 mb-3"
              style={{ textShadow: '0 3px 8px rgba(0,0,0,0.6)' }}
            >
              {currentSet.name}
            </h1>

            {/* Info blokjes onder elkaar of netjes in een flex */}
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start text-muted">
              {currentSet.symbol && (
                <div className="d-flex align-items-center gap-2 bg-dark bg-opacity-50 px-3 py-2 rounded-pill">
                  <img
                    src={currentSet.symbol + '.png'}
                    alt={currentSet.name}
                    width={22}
                    height={22}
                    style={{ objectFit: 'contain' }}
                    className="bg-white p-1 rounded-circle"
                  />
                  <span className="small text-light">Set Symbool</span>
                </div>
              )}

              <div className="bg-dark bg-opacity-50 px-3 text-light py-2 rounded-pill small">
                Official:{' '}
                <strong className="text-light ms-1">
                  {currentSet.cardCount.official}
                </strong>
              </div>

              <div className="bg-dark bg-opacity-50 px-3 text-light py-2 rounded-pill small">
                Total:{' '}
                <strong className="text-light ms-1">
                  {currentSet.cardCount.total}
                </strong>
              </div>
            </div>
          </Col>

          {/* Rechter kolom: De voortgangsbalk krijgt nu alle ruimte */}
          <Col xs={12} lg={7} className="ps-lg-4">
            <div className="bg-dark bg-opacity-50 p-4 rounded-4 w-100 border border-secondary border-opacity-25 shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0 fs-6 text-light">Voortgang Collectie</h5>
                <span
                  className="badge px-3 py-2 fs-6 fw-bold"
                  style={{
                    background:
                      'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                    color: '#fff',
                    borderRadius: '8px',
                  }}
                >
                  {progress?.percentage || 0}%
                </span>
              </div>

              {/* De balk zelf */}
              <div className="my-3">
                <ProgressSection progress={progress} />
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SetHeader;

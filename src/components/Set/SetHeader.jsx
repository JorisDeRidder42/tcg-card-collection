import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import ProgressSection from '../ProgressSection';

const SetHeader = ({ currentSet, progress }) => {
  if (!currentSet) return null;

  const collected = progress?.collected || 0;
  const total = progress?.total || currentSet.cardCount?.total || 0;
  const remaining = total - collected;
  const percentage =
    progress?.percentage || Math.round((collected / total) * 100) || 0;

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
                  style={{ maxHeight: '120px', objectFit: 'contain' }}
                />
              </div>
            )}

            <h1
              className="fw-bold display-6 mb-3"
              style={{ textShadow: '0 3px 8px rgba(0,0,0,0.6)' }}
            >
              {currentSet.name}
            </h1>

            {/* Info blokjes */}
            <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-lg-start text-light">
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
                Total: <strong className="text-light ms-1">{total}</strong>
              </div>
            </div>
          </Col>

          {/* Rechter kolom: De voortgangsbalk in een strak glazen sub-blok */}
          <Col xs={12} lg={7} className="ps-lg-4">
            <div
              className="p-4 rounded-4 w-100 border border-secondary border-opacity-25 shadow-sm"
              style={{
                backgroundColor: 'rgba(15, 23, 42, 0.4)',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="m-0 fs-6 text-light fw-semibold">
                  Voortgang Collectie
                </h5>
                <span
                  className="badge px-3 py-2 fs-6 fw-bold shadow-sm"
                  style={{
                    background:
                      'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                    color: '#fff',
                    borderRadius: '8px',
                  }}
                >
                  {percentage}%
                </span>
              </div>

              {/* De voortgangsbalk zelf */}
              <div className="my-3">
                <ProgressSection progress={progress} />
              </div>

              {/* Duidelijke onderkant met tellingen */}
              <div className="d-flex justify-content-between text-light small mt-3 pt-3 border-top border-secondary border-opacity-25">
                <span>
                  Verzameld:{' '}
                  <strong className="text-light">
                    {collected} / {total} kaarten
                  </strong>
                </span>
                <span>
                  Nog te gaan:{' '}
                  <strong style={{ color: '#a855f7' }}>
                    {remaining} kaarten
                  </strong>
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default SetHeader;

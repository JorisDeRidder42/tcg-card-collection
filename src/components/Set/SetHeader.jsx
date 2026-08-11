import React from "react";

import { Card, Row, Col } from "react-bootstrap";

import ProgressSection from "../ProgressSection";



const SetHeader = ({ currentSet, progress }) => {

  if (!currentSet) return null; // Veiligheidscheck
  return (
    <Card className="mt-5 text-light border-0 shadow-lg none-hover-card mb-4 p-4 rounded-4">
      <Card.Body className="p-0">
        {/* Header Grid: Links Logo, Rechts Informatie */}
        <Row className="align-items-center mb-5">
          {/* Linker kolom: Set Logo (Neemt ca. 40% in beslag) */}
          <Col xs={12} md={4} className="text-center text-md-start mb-4 mb-md-0">
            {currentSet.logo && (
              <img
                src={currentSet.logo + ".png"}
                alt={currentSet.name}
                className="img-fluid"
                style={{maxHeight: '150px', objectFit: 'contain', filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.3))'
                }}
              />
            )}
          </Col>
          {/* Rechter kolom: Titel en Info (Neemt ca. 60% in beslag) */}
          <Col xs={12} md={8} className="text-center text-md-start">
            <h1 className="fw-bold mb-4 display-6" style={{ textShadow: '0 3px 8px rgba(0,0,0,0.6)' }}>
              {currentSet.name}
            </h1>
            <div className="d-flex flex-wrap gap-4 justify-content-center justify-content-md-start text-muted">
              {/* Set Symbool */}
              {currentSet.symbol && (
                <div className="d-flex align-items-center gap-2 bg-dark bg-opacity-50 px-3 py-2 rounded-pill">
                  <img src={currentSet.symbol + ".png"} alt={currentSet.name} width={28} height={28} style={{ objectFit: 'contain' }} className="bg-white p-1 rounded-circle"
                  />
                  <span className="small">Set Symbool</span>
                </div>
              )}
              {/* Tellingen */}
              <div className="bg-dark bg-opacity-50 px-3 py-2 rounded-pill small">
                Official Count: <strong className="text-light ms-1">{currentSet.cardCount.official}</strong>
              </div>
              <div className="bg-dark bg-opacity-50 px-3 py-2 rounded-pill small">
                Total Cards: <strong className="text-light ms-1">{currentSet.cardCount.total}</strong>
              </div>
            </div>
          </Col>
          <Col xs={12} md={8}>
            <div className="mt-3 border-top pt-4 border-secondary border-opacity-50">
              <h5 className="text-muted mb-3 text-center">Je Collectie Voortgang</h5>
              <ProgressSection progress={progress} />
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};
export default SetHeader;
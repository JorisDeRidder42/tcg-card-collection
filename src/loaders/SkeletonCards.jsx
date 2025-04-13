import React from "react";
import { Container, Row, Col, Placeholder } from "react-bootstrap";

const SkeletonCards = () => {
  const skeletons = Array.from({ length: 20 }); // Adjust number of skeletons

  return (
    <Container className="py-4">
      <Row className="g-3">
        {skeletons.map((_, idx) => (
          <Col key={idx} xs={6} sm={4} md={3}>
            <Placeholder as="div" animation="glow">
              <Placeholder
                xs={12}
                style={{
                  height: "400px",
                  borderRadius: "1em",
                  display: "block",
                }}
              />
            </Placeholder>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SkeletonCards;

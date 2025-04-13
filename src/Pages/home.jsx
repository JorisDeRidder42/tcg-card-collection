import React, { useEffect, useState } from 'react';
import {useFetchList} from '../Hooks/dataHooks';
import { Container, Row, Col } from 'react-bootstrap';
import SkeletonCards from '../loaders/SkeletonCards';


const Home = () => {
  const [selectedSetId, setSelectedSetId] = useState('');
  const { data: sets, isLoading: setsLoading } = useFetchList('/sets');
  const { data: cards, isLoading: cardsLoading } = useFetchList(selectedSetId ? `/cards?q=set.id:${selectedSetId}` : '');

  const newSets = sets?.data?.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {setsLoading ? (
        <p>Loading sets...</p>
      ) : (
          <select
            value={selectedSetId}
            onChange={(e) => setSelectedSetId(e.target.value)}
            className="border p-2 rounded mb-6"
          >
            <option value="">Select a set</option>
            {newSets?.map((set) => (
              <option key={set.id} value={set.id}>
                {set.name}
              </option>
            ))}
          </select>
      )}
      

      {cardsLoading ? (
        <SkeletonCards/>
      ) : 

      (<Container>
        <Row>
          {cards?.data.map((card) => (
            <Col key={card.id} xs={12} sm={6} md={4} lg={3}>
              <img src={card.images.small} alt={card.name} className="w-full mt-3" />
            </Col>
          ))}
        </Row>
      </Container>)}
    </div>
  );
};

export default Home;

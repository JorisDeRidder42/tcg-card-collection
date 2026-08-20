import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { useAuth } from '../Context/authContext';

const Friends = () => {
  const [search, setSearch] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  const { searchUsers, sendFriendRequest } = useAuth();

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setSearchResult(null);
      return;
    }
    setSearching(true);

    try {
      const results = await searchUsers(search);
      if (results.length === 0) {
        setSearchResult(null);
        return;
      }
      setSearchResult(results[0]);
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="friends-page">
      <Container className="py-5">
        <div className="friends-header mb-5">
          <h1>Friends</h1>

          <p>Find trainers and build your collection together.</p>
        </div>

        <Row className="mb-5">
          <Col md={8} lg={6}>
            <Form onSubmit={handleSearch}>
              <div className="d-flex gap-2">
                <Form.Control
                  type="text"
                  placeholder="Search username..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />

                <Button type="submit" variant="primary">
                  Search
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
        {searching && <h4 className="text-center">Searching...</h4>}
        {searchResult && (
          <Row className="mb-5">
            <Col md={6} lg={4}>
              <Card className="friend-card">
                <Card.Body>
                  <div className="friend-avatar">
                    {searchResult.photoURL ? (
                      <img
                        src={searchResult.photoURL}
                        alt={searchResult.displayName}
                      />
                    ) : (
                      '👤'
                    )}
                  </div>

                  <h4>{searchResult.displayName}</h4>

                  <p className="friend-status">@{searchResult.userName}</p>

                  <Button
                    variant="primary"
                    className="w-100"
                    onClick={() => sendFriendRequest(searchResult.id)}
                  >
                    Add Friend
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
        <section className="friends-section">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>My Friends</h2>

            <span className="friends-count text-light">0 Friends</span>
          </div>
          {/* <Row>
            <Col md={6} lg={4}>
              <Card className="friend-card">
                <Card.Body>
                  <div className="friend-avatar">👤</div>

                  <h4>TrainerName</h4>

                  <p className="friend-status">128 Pokémon</p>

                  <div className="d-flex gap-2">
                    <Button variant="primary" className="flex-grow-1">
                      Collection
                    </Button>

                    <Button variant="outline-light">Trade</Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row> */}
        </section>
      </Container>
    </div>
  );
};

export default Friends;

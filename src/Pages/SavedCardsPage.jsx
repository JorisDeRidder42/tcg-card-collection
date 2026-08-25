import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHome, FaPrint, FaSearch, FaTrash } from 'react-icons/fa';
import { useAuth } from '../Context/authContext';
import CardList from '../components/Card/CardList';
import { Modal, Button } from 'react-bootstrap';

const SavedCardsPage = () => {
  const { savedCards, toggleSaveCard, clearCollection } = useAuth();
  const [showConfirm, setShowConfirm] = useState(false);

  const navigate = useNavigate();
  const countCards = savedCards.length;

  const isCardSaved = (cardId) => savedCards.some((card) => card.id === cardId);

  return (
    <>
      <main className="saved-cards-page">
        <div className="container py-5">
          {/* Header */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-5">
            <div>
              <h1 className="fw-bold mb-2">Your Saved Cards</h1>

              <p className="text-light mb-0">Manage your Pokémon collection.</p>
            </div>

            <div className="d-flex gap-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => navigate('/')}
                aria-label="Back to home"
                title="Back to home"
              >
                <FaHome />
              </button>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => window.print()}
                aria-label="Print collection"
                title="Print collection"
              >
                <FaPrint />
              </button>

              {countCards > 0 && (
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => setShowConfirm(true)}
                >
                  <FaTrash className="me-2" />
                  Clear Collection
                </button>
              )}
            </div>
          </div>

          {/* Collection stats */}
          <div className="collection-stats mb-4">
            <div className="collection-stat-card">
              <div>
                <span className="collection-stat-label">Collection</span>

                <h2 className="collection-stat-number">{countCards}</h2>
              </div>

              <span className="collection-stat-badge">
                {countCards === 1 ? 'Card' : 'Cards'}
              </span>
            </div>
          </div>

          {/* Collection */}
          {countCards === 0 ? (
            <div className="text-center py-5">
              <div className="display-1 mb-4">🃏</div>

              <h3 className="fw-bold">Your collection is empty</h3>

              <p className="text-light mb-4">
                Start saving Pokémon cards to build your collection.
              </p>

              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate('/')}
              >
                Browse Cards
              </button>
            </div>
          ) : (
            <section aria-label="Saved Pokémon cards">
              <CardList
                cards={savedCards}
                onCardClick={toggleSaveCard}
                isCardSaved={isCardSaved}
              />
            </section>
          )}
        </div>
      </main>
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Clear collection</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          Are you sure you want to remove all cards from your collection?
          <p className="text-danger">This action cannot be undone.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>

          <Button
            className="d-flex align-items-center btn btn-danger"
            variant="danger"
            onClick={() => {
              setShowConfirm(false);
              clearCollection();
            }}
          >
            <FaTrash className="me-2" />
            Clear Collection
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default SavedCardsPage;

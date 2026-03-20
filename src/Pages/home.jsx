import React, { useEffect, useState, useMemo } from 'react';
import {useFetchList} from '../hooks/useDataHook';
import SkeletonCards from '../loaders/SkeletonCards';
import SetSelection from '../components/SetSelecction';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../Context/authContext';
import { useNavigate, useSearchParams } from 'react-router-dom';


const Home = () => {
  const {authenticated, user, logout, toggleSaveCard, savedCards} = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchMode, setSearchMode] = useState("set");

    // Initial values from URL
  const initialSetId = searchParams.get('sets') || '';
  const initialSearchQuery = searchParams.get('search') || '';

  const [selectedSetId, setSelectedSetId] = React.useState(initialSetId);
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);
  const [selectedCardId, setSelectedCardId] = React.useState(null);

  const { data: sets, isLoading: setsLoading } = useFetchList('/sets');
  const { data: allCards, isLoading: allCardsLoading } = useFetchList('/cards');
  const { data: cards, isLoading: cardsLoading } = useFetchList(selectedSetId ? `/cards?set.id=${selectedSetId}` : null);

  // Sort sets and pick first set if nothing is selected
const newSets = useMemo(() => {
  if (!sets) return [];

  const sorted = [...sets].reverse();

  // Automatically select the first set only if nothing is selected yet
  if (!selectedSetId && sorted.length > 0) {
    setSelectedSetId(sorted[0].id);
  }
  return sorted;
}, [sets, selectedSetId]);

useEffect(() => {
  const params = {};
  if (selectedSetId) params.set = selectedSetId;
  if (searchQuery) params.search = searchQuery;
  setSearchParams(params);
}, [selectedSetId, searchQuery, setSearchParams]);

  // Filter cards in memory
const filteredCards = useMemo(() => {
  const source = searchMode === "all" ? allCards : cards;
  console.log("without image:", source.filter(c => !c.image).length);

  if (!source) return [];

  if (!searchQuery) return source;

  const query = searchQuery.toLowerCase();

  return source.filter(card =>
    card.name.toLowerCase().includes(query) &&
    card.image?.length > 0
  ).slice(0, 50);
}, [cards, allCards, searchQuery, searchMode]);

  // Check if card is saved
  const isCardSaved = (cardId) => savedCards.some((card) => card.id === cardId);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className='container py-4 max-w-screen-xl mx-auto'>
      <h1 className="text-xl text-center mb-3">
          {authenticated ? `Welcome, ${user?.displayName || user?.email || 'User'}!` : 'Welcome!'}
        </h1>
      <p className='text-center mb-4'> 
        {authenticated ? 'Glad to see you back.' : 'Please login first to see your collection.'}
      </p>
      
      <div className='mb-3 d-flex gap-2'>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        <button className='btn btn-primary' onClick={() => navigate('/saved')}>View Saved Cards</button>
        <div>
  <button 
    onClick={() => setSearchMode("set")}
    style={{ fontWeight: searchMode === "set" ? "bold" : "normal" }}
  >
    Current Set
  </button>

  <button 
    onClick={() => setSearchMode("all")}
    style={{ fontWeight: searchMode === "all" ? "bold" : "normal" }}
  >
    All Cards
  </button>
  </div>
      </div>
     {/* Set selection*/}
    {setsLoading ? ( <p>Loading sets... </p>) : (
        <SetSelection
          sets={newSets}
          selectedSetId={selectedSetId}
          setSelectedSetId={setSelectedSetId}
        />
      )}
      {/* Search bar */}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} searchParams={searchParams} selectedSetId={selectedSetId} setSearchParams={setSearchParams} />

      {/* Cards */}
      {cardsLoading ? (<SkeletonCards />) : (
        <CardList
          cards={filteredCards}
          selectedCardId={selectedCardId}
          isCardSaved={isCardSaved}

          onCardClick={(card) => {
            setSelectedCardId(card.id); //gele highlight
            toggleSaveCard(card); /// saved status groen via Firestore
          }}
        />
        )}
      </div>
  );
}
export default Home;

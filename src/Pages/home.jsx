import React, { useEffect, useState, useMemo, useRef } from 'react';
import {useFetchList} from '../hooks/useDataHook';
import SkeletonCards from '../loaders/SkeletonCards';
import SetSelection from '../components/SetSelecction';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../Context/authContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { VscCollection } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import { ProgressBar } from 'react-bootstrap';
import ScrollToTopButton from '../components/ScrollToTopButton';


const Home = () => {
  const containerRef = useRef(null);
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
  const { data: allCards, isLoading: setIsLoading } = useFetchList('/cards');
  const { data: cards, isLoading: cardsLoading } = useFetchList(selectedSetId ? `/cards?set.id=${selectedSetId}` : null);
    const debouncedSearch = useDebounce(searchQuery, 300);

    //progressBar
    const setProgress = useMemo(() => {
      if(!cards?.length || !savedCards?.length) return { owned: 0, total: 0 };
      
      const total = cards.length;
      const owned = cards.filter(card => savedCards.some(saved => saved.id === card.id)).length;

      return {owned, total};
    },[cards, savedCards]);

    const progressPercentage = setProgress.total > 0 ? Math.round(setProgress.owned / setProgress.total * 100) : 0;

      const progressVariant =
      progressPercentage < 30
    ? "danger"
    : progressPercentage < 70
    ? "warning"
    : "success";


useEffect(() => {
  if (!sets) return;

  const sorted = [...sets].reverse();

  if (!selectedSetId && sorted.length > 0) {
    setSelectedSetId(sorted[0].id);
  }
}, [sets, selectedSetId]);
  // Sort sets and pick first set if nothing is selected
  const newSets = useMemo(() => {
  if (!sets) return [];

  return [...sets].reverse();
}, [sets]);

useEffect(() => {
  const params = {};
  if (selectedSetId) params.set = selectedSetId;
  if (searchQuery) params.search = searchQuery;
  setSearchParams(params);
}, [selectedSetId, searchQuery, setSearchParams]);

  // Filter cards in memory
const filteredCards = useMemo(() => {
  const source = searchMode === "all" ? allCards : cards;

  if (!source) return [];
  const query = debouncedSearch?.trim().toLowerCase();
  
  if(!query) return source;

  return source.filter(card => card.name.toLowerCase().includes(query)
  );
}, [cards, allCards, searchMode, debouncedSearch]);

  // Check if card is saved
  const isCardSaved = (cardId) => savedCards.some((card) => card.id === cardId);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    
    
  <div ref={containerRef} className='container py-4 max-w-screen-xl mx-auto'style={{ height: "100vh", overflowY: "auto" }}>
      <h1 className="text-xl text-center mb-3">
          {authenticated ? `Welcome, ${user?.displayName || user?.email || 'User'}!` : 'Welcome!'}
        </h1>
      <p className='text-center mb-4'> 
        {authenticated ? 'Glad to see you back.' : 'Please login first to see your collection.'}
      </p>
           <div className="mb-3">
  <h5>
    {setProgress.owned} / {setProgress.total} cards collected <span className={`text-${progressVariant}`}>({progressPercentage}%)</span>
  </h5>


  <ProgressBar
    now={progressPercentage}
    label={`${progressPercentage}%`}
    animated
    striped
    variant={progressVariant}
    
  />
</div>
      
      <div className='mb-3 d-flex gap-2'>
        <button className='btn btn-danger' onClick={handleLogout}><CiLogout/></button>
        <button className='btn btn-secondary' onClick={() => navigate('/saved')}><VscCollection /></button>
        <div>
  <button className='btn btn-primary m-1'
    onClick={() => setSearchMode("set")}>
    Current Set
  </button>

  <button className='btn btn-primary m-1'
    onClick={() => setSearchMode("all")}>
    All Cards
  </button>
  </div>
</div>
<ScrollToTopButton containerRef={containerRef} />
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
            setSelectedCardId(card.id);
            toggleSaveCard(card); /// saved status groen via Firestore
            console.log({
  name: card.name,
  id: card.id,
  image: card.image
});
          }}
        />
        )}
      </div>
  );
};
export default Home;

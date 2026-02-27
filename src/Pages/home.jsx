import React, { useEffect, useState, useMemo } from 'react';
import {useFetchList} from '../Hooks/dataHooks';
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

    // Initial values from URL
  const initialSetId = searchParams.get('set') || '';
  const initialSearchQuery = searchParams.get('search') || '';

  const [selectedSetId, setSelectedSetId] = React.useState(initialSetId);
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);

  const { data: sets, isLoading: setsLoading } = useFetchList('/sets');
  const { data: cards, isLoading: cardsLoading } = useFetchList(selectedSetId ? `/cards?q=set.id:${selectedSetId}` : null);

  // Sort sets and pick first set if nothing is selected
const newSets = useMemo(() => {
  if (!sets?.data) return [];

  const sorted = [...sets.data].sort(
    (a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)
  );

  // Automatically select the first set only if nothing is selected yet
  if (!selectedSetId && sorted.length > 0) {
    setSelectedSetId(sorted[0].id);
  }
  return sorted;
}, [sets?.data, selectedSetId]);

useEffect(() => {
  console.log('sets data recieved:', sets)
  const params = {};
  if (selectedSetId) params.set = selectedSetId;
  if (searchQuery) params.search = searchQuery;
  setSearchParams(params);
}, [selectedSetId, searchQuery, setSearchParams, sets]);

  // Filter cards in memory
const filteredCards = React.useMemo(() => {
  if (!cards?.data) return [];
  return cards.data.filter(card => searchQuery ? card.name.toLowerCase().includes(searchQuery.toLowerCase()) : true);
}, [cards, searchQuery]);

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
      
      <div className='mb-3 d-flex gap-2 justify-content-center'>
        <button className='btn btn-danger' onClick={handleLogout}>Logout</button>
        <button className='btn btn-primary' onClick={() => navigate('/saved')}>View Saved Cards</button>
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
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Cards */}
      {cardsLoading ? (<SkeletonCards />) : (
        <CardList
          cards={filteredCards}
          onCardClick={toggleSaveCard}
          isCardSaved={isCardSaved}
        />
        )}
      </div>
  );
}
export default Home;

import React, { use, useEffect, useState, useMemo } from 'react';
import {useFetchList} from '../Hooks/dataHooks';
import SkeletonCards from '../loaders/SkeletonCards';

import SetSelection from '../components/SetSelecction';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../Context/authContext';
import { useNavigate, useSearchParams } from 'react-router-dom';


const Home = () => {
  const {authenticated, user} = useAuth();
  const {logout } = useAuth();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSetId = searchParams.get('set') || '';
  const initialSearchQuery = searchParams.get('search') || '';

  const {toggleSaveCard, savedCards} = useAuth();

  const [selectedSetId, setSelectedSetId] = React.useState(initialSetId);
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);


  const { data: sets, isLoading: setsLoading } = useFetchList('/sets');
  const { data: cards, isLoading: cardsLoading } = useFetchList(selectedSetId ? `/cards?q=set.id:${selectedSetId}` : null);
  

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

useEffect(() => {
  const params = {};
  if (selectedSetId) params.set = selectedSetId;
  if (searchQuery) params.search = searchQuery;
  

  setSearchParams(params);
}, [selectedSetId, searchQuery, setSearchParams]);


  // ✅ Filter cards in memory
const filteredCards = React.useMemo(() => {
  if (!cards?.data) return [];
  return cards.data.filter(card => searchQuery ? card.name.toLowerCase().includes(searchQuery.toLowerCase()) : true);
}, [cards, searchQuery]);

  const isCardSaved = (cardId) => {
  const found = savedCards.some(card => card.id === cardId);
  return found;
}
const newSets = useMemo(() => {
  return sets?.data ? [...sets.data].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)) : [];
}, [sets?.data]);

  return (
    <>
     <h1 className="text-xl text-center mb-6">
        {authenticated ? `Welcome, ${user?.displayName || user?.email || 'User'}!` : 'Welcome!'}
      </h1>
      {authenticated ? (
        <p className="text-center">Glad to see you back.</p>
      ) : (
        <p className="text-center">Please login first to see your collection.</p>
      )}
    
    <div className='mb-3'>
      <button className='mx-2' onClick={handleLogout}>Logout</button>
      <button onClick={() => navigate('/saved')}>View Saved Cards</button>
    </div>

    <div className="p-6 max-w-screen-xl mx-auto">
      {setsLoading ? (
        <p>Loading sets...</p>
      ) : (
          <SetSelection
          sets={newSets}
          selectedSetId={selectedSetId}
          setSelectedSetId={setSelectedSetId}
          />
      )}
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {cardsLoading ? (
        <SkeletonCards/>
      ) : (
        <CardList 
      cards={filteredCards} 
      onCardClick={toggleSaveCard} 
      isCardSaved={isCardSaved} 
      selectedCardId={selectedSetId}
    />
      )}
    </div>
        </>
  );
};

export default Home;

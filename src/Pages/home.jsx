import React, { use, useEffect, useState } from 'react';
import {useFetchList} from '../Hooks/dataHooks';
import SkeletonCards from '../loaders/SkeletonCards';

import SetSelection from '../components/SetSelecction';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../Context/authContext';
import { useNavigate, useSearchParams } from 'react-router-dom';


const Home = () => {
  const {authenticated, loading} = useAuth();
  const {logout } = useAuth();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const initialSetId = searchParams.get('set') || '';
  const initialSearchQuery = searchParams.get('search') || '';

  const {toggleSaveCard, savedCards} = useAuth();

  const [selectedSetId, setSelectedSetId] = React.useState(initialSetId);
  const [searchQuery, setSearchQuery] = React.useState(initialSearchQuery);


  const { data: sets, isLoading: setsLoading } = useFetchList('/sets');
  const { data: cards, isLoading: cardsLoading } = useFetchList(selectedSetId ? `/cards?q=set.id:${selectedSetId}` : '');

  const newSets = sets?.data ? [...sets.data].sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate)) : [];


  const handleLogout = () => {
    logout();
    navigate('/login');
  };

   useEffect(() => {
  if (newSets.length > 0 && !selectedSetId) {
    setSelectedSetId(newSets[0].id);  // from sorted array, newest first
  }
}, [newSets, selectedSetId]);

useEffect(() => {
    const setFromUrl = searchParams.get('set') || '';
    const searchFromUrl = searchParams.get('search') || '';

    if (setFromUrl !== selectedSetId) setSelectedSetId(setFromUrl);
    if (searchFromUrl !== searchQuery) setSearchQuery(searchFromUrl);
  }, [searchParams]);

  useEffect(() => {
    const params = {};
    if (selectedSetId) params.set = selectedSetId;
    if (searchQuery) params.search = searchQuery;
    setSearchParams(params);
  }, [selectedSetId, searchQuery, setSearchParams]);


  // Filter cards based on the search query
  const filteredCards = cards?.data.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isCardSaved = (cardId) => {
  const found = savedCards.some(card => card.id === cardId);
  // console.log(`Checking if card ${cardId} saved:`, found);
  return found;
}


  return (
    <>
    <h1 className="text-4xl font-bold text-center mb-6">{authenticated ? <p>You are logged in.</p> : <p>You are not logged in.</p>}</h1>
    <button onClick={handleLogout}>Logout</button>
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
    />
      )}
    </div>
        </>
  );
};

export default Home;

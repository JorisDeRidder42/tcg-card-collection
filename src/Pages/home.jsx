import React, { useState } from 'react';
import {useFetchList} from '../Hooks/dataHooks';
import SkeletonCards from '../loaders/SkeletonCards';

import SetSelection from '../components/SetSelecction';
import CardList from '../components/CardList';
import SearchBar from '../components/SearchBar';


const Home = () => {
  const [selectedSetId, setSelectedSetId] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const { data: sets, isLoading: setsLoading } = useFetchList('/sets');
  const { data: cards, isLoading: cardsLoading } = useFetchList(selectedSetId ? `/cards?q=set.id:${selectedSetId}` : '');

  const newSets = sets?.data?.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));

  // Filter cards based on the search query
  const filteredCards = cards?.data.filter((card) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
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
        <CardList cards={filteredCards} /> 
      )}
    </div>
  );
};

export default Home;

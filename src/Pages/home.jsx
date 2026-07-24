import React, { useEffect, useState, useMemo, useRef } from 'react';
import {useFetchList} from '../hooks/useDataHook';
import SkeletonCards from '../loaders/SkeletonCards';
import SetSelection from '../components/SetSelecction';
import CardList from '../components/Card/CardList';
import SearchBar from '../components/SearchBar';
import { useAuth } from '../Context/authContext';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { VscCollection } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import ScrollToTopButton from '../components/ScrollToTopButton';
import HomeActions from '../components/Home/HomeActions';
import HomeHeader from '../components/Home/HomeHeader';
import ProgressSection from '../components/Home/ProgressSection';
import useHome from '../hooks/useHome';

const Home = () => {
  const {authenticated, user, logout, toggleSaveCard, savedCards} = useAuth();
  const navigate = useNavigate();
  const home = useHome();
  return (
  <div className='container py-4 max-w-screen-xl mx-auto'>

    <HomeHeader authenticated={authenticated} user={user}/>

    <ProgressSection  progress={home.progress} />

    <HomeActions navigate={navigate} user={user} logout={home.handleLogout} searchMode={home.searchMode} setSearchMode={home.setSearchMode}/>

    <ScrollToTopButton/>

     {/* Set selection*/}
    {home.setsLoading ? ( <p>Loading sets... </p>) : (
        <SetSelection
          sets={home.newSets}
          selectedSetId={home.selectedSetId}
          setSelectedSetId={home.setSelectedSetId}
        />
      )}
      {/* Search bar */}
      <SearchBar searchQuery={home.searchQuery} setSearchQuery={home.setSearchQuery} searchParams={home.searchParams} selectedSetId={home.selectedSetId} setSearchParams={home.setSearchParams} />

      {/* Cards */}
      {home.cardsLoading ? (<SkeletonCards />) : (
        <CardList
          cards={home.filteredCards}
          isCardSaved={home.isCardSaved}
          onCardClick={toggleSaveCard}
          onCardDetailClick={(card) => navigate(`/card/${card.id}`) }
        />
        )}
      </div>
  );
};
export default Home;

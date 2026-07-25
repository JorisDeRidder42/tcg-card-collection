import React, { useEffect, useState, useMemo, useRef } from 'react';
import {useFetchList} from '../hooks/useDataHook';
import SkeletonCards from '../loaders/SkeletonCards';
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
import HomeDashboard from '../components/Home/HomeDashboard';

const Home = () => {
const { authenticated, user, toggleSaveCard, savedCards, logout, profile} = useAuth();
  const navigate = useNavigate();
  const home = useHome();
  return (
    <div className="container py-6 max-w-screen-xl mx-auto">
      {/* PROFIEL HEADER */}
      <HomeHeader authenticated={authenticated} user={user}  profile={profile} />
      {/* COLLECTIE PROGRESS */}
      {/* <ProgressSection 
        progress={home.progress}
      /> */}
      {/* ACTIES */}
      <HomeActions
        navigate={navigate}
        user={user}
        logout={home.handleLogout}
        searchMode={home.searchMode}
        setSearchMode={home.setSearchMode}
      />
      {/* SETS BLOKKEN */}
      <HomeDashboard sets={home.homeSets} onSelectSet={home.setSelectedSetId} setShowAllSets={home.setShowAllSets} showAllSets={home.showAllSets}/>

      {/* SET BLOKKEN
      <section className="mt-8">
        <h2 className="text-2xl font-bold mb-4">
          Pokémon Sets
        </h2>
        {
        home.setsLoading ?
        <p>
          Sets laden...
        </p>
        :
        <SetGrid
          sets={home.newSets}
          selectedSetId={home.selectedSetId}
          setSelectedSetId={home.setSelectedSetId}
        />
        }
      </section>
      {/* ZOEKEN */}
      {/* <section className="mt-10">
        <SearchBar
          searchQuery={home.searchQuery}
          setSearchQuery={home.setSearchQuery}
          searchParams={home.searchParams}
          selectedSetId={home.selectedSetId}
          setSearchParams={home.setSearchParams}
        />
      </section>
      {/* KAARTEN */}
      {/* <section className="mt-6">
      {
      home.cardsLoading ?
      <SkeletonCards />
      :
      <CardList
        cards={home.filteredCards}
        isCardSaved={home.isCardSaved}
        onCardClick={toggleSaveCard}
        onCardDetailClick={(card)=>navigate(`/card/${card.id}`)}
      />
      }
      </section> */}
    <ScrollToTopButton/>
    </div>
  );
};
export default Home;

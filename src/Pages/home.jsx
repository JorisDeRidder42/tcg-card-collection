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
      {/* KNOPPEN */}
      <HomeActions
        navigate={navigate}
        user={user}
        logout={home.handleLogout}
        searchMode={home.searchMode}
        setSearchMode={home.setSearchMode}
      />
      {/* SETS BLOKKEN */}
      <HomeDashboard 
        sets={home.homeSets} 
        setShowAllSets={home.setShowAllSets} 
        showAllSets={home.showAllSets}
        savedCards={home.savedCards}/>
    <ScrollToTopButton/>
    </div>
  );
};
export default Home;

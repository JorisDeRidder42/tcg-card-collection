import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFetchList } from './useDataHook';
import { useDebounce } from './useDebounce';
import { useAuth } from '../Context/authContext';

const MAX_SETS = 12;

const useHome = () => {
  const navigate = useNavigate();

  const { authenticated, user, logout, savedCards, toggleSaveCard } = useAuth();

  const [showAllSets, setShowAllSets] = useState(false);
  const [searchMode, setSearchMode] = useState('set');
  const [searchQuery, setSearchQuery] = useState('');

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: sets, isLoading: setsLoading } = useFetchList('/sets');

  const { data: allCards } = useFetchList('/cards');

  const homeSets = useMemo(() => {
    if (!sets) return [];

    const sortedSets = [...sets].reverse();

    return showAllSets ? sortedSets : sortedSets.slice(0, MAX_SETS);
  }, [sets, showAllSets]);

  const filteredCards = useMemo(() => {
    const source = searchMode === 'all' ? allCards : [];

    if (!source) return [];

    const query = debouncedSearch.trim().toLowerCase();

    if (!query) return source;

    return source.filter((card) => card.name.toLowerCase().includes(query));
  }, [allCards, searchMode, debouncedSearch]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isCardSaved = (id) => savedCards.some((card) => card.id === id);

  return {
    authenticated,
    user,

    setsLoading,

    homeSets,

    showAllSets,
    setShowAllSets,

    searchMode,
    setSearchMode,

    searchQuery,
    setSearchQuery,

    filteredCards,

    toggleSaveCard,
    savedCards,
    isCardSaved,

    handleLogout,
    navigate,
  };
};

export default useHome;

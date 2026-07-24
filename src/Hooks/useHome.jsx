import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFetchList } from "./useDataHook";
import { useDebounce } from "./useDebounce";
import { useAuth } from "../Context/authContext";

const useHome = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { authenticated, user, logout, toggleSaveCard, savedCards } = useAuth();

  const [searchMode, setSearchMode] = useState("set");
  const [selectedSetId, setSelectedSetId] = useState(
    searchParams.get("set") || ""
  );
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const debouncedSearch = useDebounce(searchQuery, 300);

  const { data: sets, isLoading: setsLoading } = useFetchList("/sets");
  const { data: allCards } = useFetchList("/cards");
  const { data: cards, isLoading: cardsLoading } = useFetchList(
    selectedSetId ? `/cards?set.id=${selectedSetId}` : null
  );

  useEffect(() => {
    if (!sets?.length || selectedSetId) return;

    setSelectedSetId([...sets].reverse()[0].id);
  }, [sets, selectedSetId]);

  useEffect(() => {
    const params = {};

    if (selectedSetId) params.set = selectedSetId;
    if (searchQuery) params.search = searchQuery;

    setSearchParams(params);
  }, [selectedSetId, searchQuery]);

  const newSets = useMemo(() => {
    return sets ? [...sets].reverse() : [];
  }, [sets]);

  const filteredCards = useMemo(() => {
    const source = searchMode === "all" ? allCards : cards;

    if (!source) return [];

    const query = debouncedSearch.trim().toLowerCase();

    if (!query) return source;

    return source.filter(card =>
      card.name.toLowerCase().includes(query)
    );
  }, [cards, allCards, searchMode, debouncedSearch]);

  const progress = useMemo(() => {
    if (!cards?.length)
      return {
        owned: 0,
        total: 0,
        percentage: 0,
        variant: "danger",
      };

    const owned = cards.filter(card =>
      savedCards.some(saved => saved.id === card.id)
    ).length;

    const total = cards.length;

    const percentage = Math.round((owned / total) * 100);

    return {
      owned,
      total,
      percentage,
      variant:
        percentage < 30
          ? "danger"
          : percentage < 70
          ? "warning"
          : "success",
    };
  }, [cards, savedCards]);

  const isCardSaved = id =>
    savedCards.some(card => card.id === id);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return {
    authenticated,
    user,

    setsLoading,
    cardsLoading,

    newSets,
    filteredCards,

    selectedSetId,
    setSelectedSetId,

    searchQuery,
    setSearchQuery,

    searchParams,
    setSearchParams,

    searchMode,
    setSearchMode,

    progress,

    isCardSaved,

    toggleSaveCard,

    navigate,

    handleLogout,
  };
};

export default useHome;
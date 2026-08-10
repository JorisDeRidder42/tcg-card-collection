import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { VscCollection } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";
import HomeActions from "../Home/HomeActions";
import { useAuth } from '../../Context/authContext';

const HomeHeader = () => {
  const navigate = useNavigate();
  const { authenticated, user, logout, profile,savedCards } = useAuth();

  if (!profile) {
    return <h2 className="text-light text-center py-4">Loading profile...</h2>;
  }

  return (
    <Card className="mt-5 text-light border-0 shadow-lg none-hover-card mb-4">
      <Card.Body className="p-4">
        <h1 className="fw-bold mb-3 fs-2" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
          Welkom terug {profile.displayName || 'Test'} 👋
        </h1>
        
        <p className="mb-2 opacity-80">
          🔥 Favorite Pokémon: <strong>{profile.favoritePokemon}</strong>
        </p>
        
        <p className="mb-3 opacity-80">
          📦 Favorite Set: <strong>{profile.favoriteSet}</strong>
        </p>
        
        <p className="mb-4 opacity-60">
          ⭐ Role: <strong>{profile.role}</strong>
        </p>
      </Card.Body>
      <HomeActions logout={logout} navigate={navigate} user={user} authenticated={authenticated} savedCards={savedCards}/>
    </Card>
  );
};

export default HomeHeader;
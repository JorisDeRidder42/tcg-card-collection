const HomeHeader = ({ profile}) => {
  if(!profile){
  return <p>Loading profile...</p>;
}
  return (
    <div className="home-header">
        <h1>
          Welkom terug {profile.displayName} 👋
        </h1>
        <p>🔥 Favorite Pokémon: {profile.favoritePokemon}</p>
        <p>📦 Favorite Set: {profile.favoriteSet}</p>
        <p>Role: {profile.role}</p>
    </div>
  );
};

export default HomeHeader;
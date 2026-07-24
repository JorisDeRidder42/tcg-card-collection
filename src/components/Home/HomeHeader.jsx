const HomeHeader = ({ authenticated, user }) => {
  return (
    <div className="home-header">
      <h1>
        {authenticated
          ? `Welcome, ${user?.displayName || "Trainer"}!`
          : "Pokemon Collection"}
      </h1>
    </div>
  );
};

export default HomeHeader;
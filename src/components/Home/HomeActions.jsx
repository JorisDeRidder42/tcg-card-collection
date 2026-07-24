import React from "react";
import { VscCollection } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";

const HomeActions = ({
  navigate,
  logout,
  searchMode,
  setSearchMode,
  user
}) => {

  return (
    <>

      <div className="home-actions">

        {/* Iedereen krijgt collectie */}
        <button
          className="btn btn-secondary flex-grow-1"
          onClick={() => navigate('/saved')}
        >
          <VscCollection /> Collection
        </button>


        {/* Alleen ingelogde users */}
        {user && (
          <button
            className="btn btn-danger"
            onClick={logout}
          >
            <CiLogout />
          </button>
        )}

      </div>


      <div className="mode-buttons">

        <button
          className={`btn ${
            searchMode === "set"
            ? "btn-primary"
            : "btn-outline-primary"
          }`}
          onClick={() => setSearchMode("set")}
        >
          Current Set
        </button>


        <button
          className={`btn ${
            searchMode === "all"
            ? "btn-primary"
            : "btn-outline-primary"
          }`}
          onClick={() => setSearchMode("all")}
        >
          All Cards
        </button>

      </div>


    </>
  );
};

export default HomeActions;
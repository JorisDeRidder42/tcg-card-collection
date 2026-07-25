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

      <div className="home-actions d-flex gap-2">

        {/* Iedereen krijgt collectie */}
        <button
          className="btn btn-secondary" onClick={() => navigate('/saved')}>
           Collection <VscCollection />
        </button>


        {/* Alleen ingelogde users */}
        {user && (
          <button
            className="btn btn-danger"
            onClick={logout}
          >
           Logout <CiLogout />
          </button>
        )}
        {/* <button
          className={`btn ${
            searchMode === "set"
            ? "btn-primary"
            : "btn-outline-primary"
          }`}
          onClick={() => setSearchMode("set")}
        >
          Current Set
        </button> */}
      </div>
        {/* <button
          className={`btn ${
            searchMode === "all"
            ? "btn-primary"
            : "btn-outline-primary"
          }`}
          onClick={() => setSearchMode("all")}
        >
          All Cards
        </button> */}
    </>
  );
};

export default HomeActions;
import React from "react";
import { Stack } from "react-bootstrap";
import { VscCollection } from "react-icons/vsc";
import { CiLogout } from "react-icons/ci";

const HomeActions = ({ navigate, logout, user, savedCards }) => {
  return (
    <Stack direction="horizontal" gap={3} className="px-4 pb-4 mb-4">
      {/* Collectie knop */}
      <button
        className="btn d-flex align-items-center gap-2 px-4 py-2 border-0 fw-semibold text-white shadow-sm"
        style={{ 
          background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
          borderRadius: '10px'
        }}
        onClick={() => navigate('/saved')}
      >
        <VscCollection size={18} /> Collection ({savedCards?.length || 0})
      </button>

      {/* Alleen ingelogde users */}
      {user && (
        <button
          className="btn d-flex align-items-center gap-2 px-4 py-2 border-0 fw-semibold text-white shadow-sm"
          style={{ 
            background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
            borderRadius: '10px'
          }}
          onClick={logout}
        >
          Logout <CiLogout size={18} />
        </button>
      )}
    </Stack>
  );
};

export default HomeActions;
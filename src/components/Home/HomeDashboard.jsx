import React from "react";
import { useNavigate } from "react-router-dom";

const SetDashboard = ({ sets, onSelectSet, showAllSets, setShowAllSets }) => {
const navigate = useNavigate(); 
const setColors = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#a855f7",
  "#f97316",
  "#eab308",
];

  if (!sets || sets.length === 0) {
    return (
      <div className="text-center py-6">
        <h2>Geen sets gevonden...</h2>
      </div>
    );
  }
  return (
    <section className="mt-8">
      <h2 className="text-2xl font-bold mb-4">
        Pokémon Sets
      </h2>
      <div className="set-container">
        {sets.map((set, index) => (
          <div
              key={set.id}
              onClick={() => navigate(`/sets/${set.id}`)}
              className="set-card"
              style={{
                background: `linear-gradient(
                  120deg,
                  ${setColors[index % setColors.length]},
                  white
                )`
              }}
            >
            {/* Set afbeelding/logo */}
            {set.logo ? (
              <img
                src={set.logo + '.png'}
                alt={set.name}
                className="sets-image mx-auto mb-4"
              />
            ) : (
              <h3 className="text-center text-lg font-bold mt-4 mb-4">
              {set.name}
            </h3>
            )}
            <h6 className="text-center text-gray-500">
              {set.total || set.printedTotal || 0} kaarten
            </h6>
            <span className="click-label">
              Bekijk set →
            </span>
          </div>
        ))}
      </div>
    
    {!showAllSets && (
  <div className="flex justify-center mt-8">
    <button
      onClick={() => setShowAllSets(true)}
      className="btn btn-primary btn-lg my-4"
    >
     Toon meer sets ↓
    </button>
  </div>
)}
    </section>
  );
};
export default SetDashboard;
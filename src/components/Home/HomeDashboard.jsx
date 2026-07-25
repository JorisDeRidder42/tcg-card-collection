import React from "react";
import { useNavigate } from "react-router-dom";
import ProgressSection  from "./ProgressSection";

const SetDashboard = ({ sets, savedCards,showAllSets, setShowAllSets }) => {
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
      <div className="bg-red-500 h-8 w-full rounded-full">
  Test
</div>
      <div className="set-container">
        {sets.map((set, index) => {
  const collected = savedCards?.filter(
  card => card.setId === set.id
).length || 0;

console.log('set', set.id, 'collected', collected);

  const total = set.cardCount?.official || set.cardCount?.total || 0;

  const percentage = total ? Math.round((collected / total) * 100) : 0;

  const variant = percentage < 30 ? "danger" : percentage < 70 ? "warning" : "success";
  return (
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
      {set.logo ? (
        <img
          src={set.logo + '.png'}
          alt={set.name}
          loading="lazy"
          className="sets-image mx-auto mb-4"
        />
      ) : (
        <h3 className="text-center text-lg font-bold mt-4 mb-4">
          {set.name}
        </h3>
      )}

        <ProgressSection 
          progress={{
            collected,
            total,
            variant,
            percentage
          }}
        />
    </div>
  );
})}
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
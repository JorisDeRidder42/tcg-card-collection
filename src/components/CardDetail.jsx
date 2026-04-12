import { useParams, useNavigate } from "react-router-dom";
import { useFetchList } from "../hooks/useDataHook";
import { useAuth } from "../Context/authContext";

const CardDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const {data: card } = useFetchList(`/cards/${id}`);
  const { savedCards, toggleSaveCard } = useAuth();

  console.log("card", card);

  if (!card) return <p>Card not found...</p>;

  const saved = savedCards?.some(c => c.id === card.id);

  return (
    <div className="detail-page">

      <button className="btn btn-primary back-btn" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="detail-card">

        <img
          src={card.image ? `${card.image}/high.png` : "/placeholder.svg"}
          alt={card.name}
          className="detail-image"
        />

        <h2>{card.name}</h2>

        <p className="set-name">{card.set?.name}</p>

        <button
          className={`save-detail-btn ${saved ? "saved" : ""}`}
          onClick={() => toggleSaveCard(card)}
        >
          {saved ? "★ Saved" : "☆ Save"}
        </button>

      </div>
    </div>
  );
};

export default CardDetail;
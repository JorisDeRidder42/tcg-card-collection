import React, { useState } from "react";

const Camera = ({ onCardDetected }) => {
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("http://localhost:5000/api/scan", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setLoading(false);

    if (data.card) {
      onCardDetected(data.card);
    }
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        capture="environment" // opent camera op gsm
        onChange={handleImageUpload}
      />
      {loading && <p>Scanning card...</p>}
    </div>
  );
};

export default Camera;
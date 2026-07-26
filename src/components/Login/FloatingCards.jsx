import { useEffect, useState } from "react";
import { useFetchList } from "../../hooks/useDataHook";
import charizard from "../../assets/fallbackcards/card-0.png";
import umbreon from "../../assets/fallbackcards/card-1.png";
import pikachu from "../../assets/fallbackcards/card-2.png";
import rayquaza from "../../assets/fallbackcards/card-3.jpg";
import mewtwo from "../../assets/fallbackcards/card-4.jpg";
import lugia from "../../assets/fallbackcards/card-5.png";
import gardevoir from "../../assets/fallbackcards/card-5.png";

const cards = [
  charizard,
  umbreon,
  rayquaza,
  mewtwo,
  pikachu,
  lugia,
  gardevoir
];

const FloatingCards = () => {
  return (
    <>
      {cards.map((card,index)=>(
        <div key={index} className={`floating-card card-${index}`}>
          <img
            src={card}
            alt="card images"
          />
        </div>
      ))}
    </>
  );
};


export default FloatingCards;
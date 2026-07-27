import { useEffect, useState } from "react";
import { useFetchList } from "../../hooks/useDataHook";
import charizard from "../../assets/fallbackcards/charizard.png";
import umbreon from "../../assets/fallbackcards/umbreon.png";
import pikachu from "../../assets/fallbackcards/pikachu.png";
import rayquaza from "../../assets/fallbackcards/raquaza.jpg";
import mewtwo from "../../assets/fallbackcards/mewtwo.jpg";
import lugia from "../../assets/fallbackcards/lugia.png";
import gardevoir from "../../assets/fallbackcards/gardevoir.png";
import rosa from "../../assets/fallbackcards/rosa.jpg";
import secretbox from "../../assets/fallbackcards/secret-box.jpg";
import ultrabal from "../../assets/fallbackcards/ultra-bal.jpg";

const cards = [
  charizard,
  umbreon,
  rayquaza,
  mewtwo,
  pikachu,
  lugia,
  gardevoir,
  rosa,
  secretbox,
  ultrabal
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
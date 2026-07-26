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

  const { data: cards } = useFetchList("/cards");


  const [displayCards, setDisplayCards] = useState([]);


  useEffect(() => {

    if (!cards?.length) return;

    const randomCards = [...cards]
      .sort(() => Math.random() - 0.5)
      .slice(0,12);

    setDisplayCards(randomCards);
  },[cards]);

  return (
    <>
      {displayCards.map((card,index)=>(
        <div key={card.id} className={`floating-card card-${index}`}>

          <img
            src={`${card.image}/high.png`}
            alt="card images"
          />
        </div>
      ))}
    </>
  );
};


export default FloatingCards;
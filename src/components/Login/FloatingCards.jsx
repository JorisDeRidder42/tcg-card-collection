import { useEffect, useState } from "react";
import { useFetchList } from "../../hooks/useDataHook";


const FloatingCards = () => {

  const { data: cards } = useFetchList("/cards");


  const [displayCards, setDisplayCards] = useState([]);


  useEffect(() => {

    if (!cards?.length) return;

    const randomCards = [...cards]
      .sort(() => Math.random() - 0.5)
      .slice(0,12);

    setDisplayCards(randomCards);
  }, [cards]);
  return (
    <>
      {displayCards.map((card,index)=>(
        <div key={card.id} className={`floating-card card-${index}`}>

          <img
            src={`${card.image}/high.png`}
            alt=""
          />
        </div>
      ))}
    </>
  );
};


export default FloatingCards;
import React from "react";


const PokemonCard = ({card, saved, onSave, onDetail}) => {

const image = card.image
 ? `${card.image}/low.png`
 : "/placeholder.svg";


return (

<div 
 className={`pokemon-card ${saved ? "saved" : ""}`}
 onClick={() => onDetail(card)}
>


<div className="image-wrapper">

<img
 className="pokemon-image"
 src={image}
 alt={card.name}
 loading="lazy"
 onError={(e)=> e.target.src="/placeholder.svg"}
/>


<button
  className={`collection-status ${saved ? "owned" : "missing"}`}
  onClick={(e)=>{
    e.stopPropagation();
    onCardClick(card);
  }}
>
  {saved ? "✓" : "✕"}
</button>

{saved &&
<div className="saved-check">
✓
</div>
}
</div>
<div className="pokemon-info">
<h6>{card.name}</h6>
<p>
{card.set?.name}
</p>
</div>
</div>
)
}
export default PokemonCard;
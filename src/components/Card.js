import React from 'react';


function Card({card, deleteCard, onCardClick}) {   

function handleClick() {  
onCardClick(card);
}  
  return (        
      <div className="card-item">
        <button className="card-item__trash" onClick={deleteCard}></button>
        <img  
        alt={card.about}
         src={card.link} 
         className="card-item__image"
          onClick={handleClick}/>
        <div className="card-item__data">
          <h2 className="card-item__title">{card.name}</h2>
          <div className="card-item__like-container">
            <button className="card-item__like" type="button" aria-label="Лайк"></button>
            <p className="card-item__like-amount">{card.likes.length}</p>
          </div>          
        </div>
      </div>     
  );
}
  
export default Card;
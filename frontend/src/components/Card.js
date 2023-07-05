import { useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";


function Card({ onCardClick, onCardDelete, card, onCardLike, onCardRemoveClick }) {
   const translationUserData = useContext(CurrentUserContext);

   const isOwn = card.owner === translationUserData._id;
   const isLiked = card.likes.some(i => i === translationUserData._id);

   const handleCardClick = () => {
      onCardClick(card);
   };

   const handleCardLikeClick = () => {
      onCardLike(card);
   };

   const handleDeleteClick = () => {
      onCardRemoveClick(card);
   };

   return (
      <li className="photo__element" >

         <img
            className="photo__img"
            onClick={handleCardClick}
            src={card.link}
            alt={card.name} >
         </img>

         <div className="photo__name">
            <h3 className="photo__title">{card.name}</h3>
            <div className="photo__like-container">
               <button
                  type="button"
                  aria-label="Лайк"
                  onClick={handleCardLikeClick}
                  className={`photo__like ${isLiked ? 'photo__like_active' : ""}`}>
               </button>
               <p className="photo__like-counter">{card.likes.length}</p>
            </div>
         </div>

         {isOwn &&
            <button
               type="button"
               aria-label="Удалить"
               onClick={handleDeleteClick}
               className="photo__delete">
            </button>}

      </li>
   );
}

export default Card;
import { useContext } from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Main({ onEditProfile, onAddPlace, onCardDelete, onCardRemoveClick, onEditAvatar, onCardLike, onCardClick, cardsData }) {
   const translationUserData = useContext(CurrentUserContext);

   return (
      <main className="content">
         <section className="profile">
            <div className="profile__info">
               <div className="profile__conteiner-avatar">

                  <img
                     alt="Аватарка"
                     className="profile__avatar"
                     src={translationUserData.avatar}>
                  </img>

                  <button
                     type="button"
                     onClick={onEditAvatar}
                     className="profile__avatar-edit">
                  </button>

               </div>
               <div className="profile__content">
                  <div className="profile__text">
                     <div className="profile__block-name">
                        <h1 className="profile__name">{translationUserData.name}</h1>

                        <button
                           type="button"
                           aria-label="Редактировать"
                           onClick={onEditProfile}
                           className="profile__button-edit">
                        </button>

                     </div>
                     <p className="profile__subname">{translationUserData.about}</p>
                  </div>
               </div>
            </div>

            <button
               type="button"
               aria-label="Добавить"
               onClick={onAddPlace}
               className="profile__button-add">
            </button>

         </section>
         <div className="photo">
            <ul className="photo__container">
               {cardsData.map((element) => {
                  return (
                     <Card
                        key={element._id}
                        onCardDelete={onCardDelete}
                        onCardLike={onCardLike}
                        onCardClick={onCardClick}
                        onCardRemoveClick={onCardRemoveClick}
                        card={element}
                     />
                  );
               })}
            </ul>
         </div>
      </main>
   );
}

export default Main;


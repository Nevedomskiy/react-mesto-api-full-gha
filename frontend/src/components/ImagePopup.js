function ImagePopup({ isOpen, card, onClose }) {
   return (
      <div
         className={`popup popup_type_photo ${isOpen ? 'popup_active' : ""}`}>
         < div className="popup__container popup__container_type_photo" >

            <img
               className="popup__img"
               alt={card.name}
               src={card.link}
            >
            </img>

            <h3 className="popup__name">
               {card.name}
            </h3>

            <button
               type="button"
               aria-label="Закрыть"
               onClick={onClose}
               className="btn-close"
            >
            </button>

         </div >
      </div >
   );
}

export default ImagePopup;
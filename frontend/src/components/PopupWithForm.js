function PopupWithForm({ buttonText, name, title, isOpen, onCardDelete, onClose, onSubmit, children }) {
   return (
      <div className={`popup popup_type_${name}${isOpen ? ' popup_active' : ''}`}>
         <div className="popup__container">
            <h3 className="popup__title">{`${title}`}</h3>
            <form
               name={name || ''}
               className="popup__form"
               onSubmit={onSubmit}
               noValidate
            >

               {children}

               <button
                  onClick={onCardDelete}
                  type="submit"
                  className="popup__submit-btn"
               >
                  {buttonText}
               </button>

            </form>

            <button
               onClick={onClose}
               type="button"
               aria-label="Закрыть"
               className="btn-close"
            >
            </button>

         </div>
      </div>
   );
}

export default PopupWithForm;
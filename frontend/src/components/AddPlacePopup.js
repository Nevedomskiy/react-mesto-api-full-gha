import { useState, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';


function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
   const [name, setName] = useState('');
   const [link, setLink] = useState('');

   useEffect(() => {
      setName('');
      setLink('');
   }, [isOpen]);

   function handleSubmit(e) {
      e.preventDefault();
      onAddPlace({
         name,
         link
      }
      )
   }

   return (
      <PopupWithForm
         buttonText={"Создать"}
         name={'place'}
         title={"Новое место"}
         onSubmit={handleSubmit}
         isOpen={isOpen}
         onClose={onClose}
      >

         <input
            id="place-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            type="text"
            minLength="2"
            maxLength="30"
            name="name"
            placeholder="Название"
            className="popup__input popup__input_type_name-place"
         >
         </input >

         <span
            id="place-name-error"
            className="popup__text-error"
         >
         </span>

         <input
            id="place-url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            type="url"
            name="link"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link-place"
         >
         </input>

         <span
            id="place-url-error"
            className="popup__text-error"
         >
         </span>

      </PopupWithForm>
   );
}

export default AddPlacePopup;

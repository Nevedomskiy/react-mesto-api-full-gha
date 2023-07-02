import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
   const currentUser = useContext(CurrentUserContext);
   const [name, setName] = useState('');
   const [description, setDescription] = useState('');

   useEffect(() => {
      setName(currentUser.name);
      setDescription(currentUser.about);
   }, [currentUser, isOpen]);

   function handleChangeName(e) {
      setName(e.target.value)
   }

   function handleChangeDescription(e) {
      setDescription(e.target.value)
   }

   function handleSubmit(e) {
      e.preventDefault();
      onUpdateUser({
         ...currentUser,
         name,
         about: description
      })
   }

   return (
      <PopupWithForm
         buttonText={"Сохранить"}
         name={'profile'}
         title={"Редактировать профиль"}
         isOpen={isOpen}
         onClose={onClose}
         onSubmit={handleSubmit}
      >

         <input
            id="profile-name"
            value={name || ''}
            onChange={handleChangeName}
            placeholder="Имя"
            required
            type="text"
            minLength="2"
            maxLength="40"
            name="name"
            className="popup__input popup__input_type_name-profile">
         </input>

         <span
            id="profile-name-error"
            className="popup__text-error">
         </span>

         <input
            id="profile-profession"
            value={description || ''}
            onChange={handleChangeDescription}
            placeholder="Вид деятельности"
            required type="text"
            minLength="2"
            maxLength="200"
            name="about"
            className="popup__input popup__input_type_profession-profile">
         </input>

         <span
            id="profile-profession-error"
            className="popup__text-error">
         </span>

      </PopupWithForm>
   );
}

export default EditProfilePopup;

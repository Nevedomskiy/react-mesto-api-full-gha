import { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm.js';


function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

   const avatarInputRef = useRef();

   useEffect(() => {
      avatarInputRef.current.value = "";
   }, [isOpen]);

   function handleSubmit(e) {
      e.preventDefault();
      onUpdateAvatar({
         avatar: avatarInputRef.current.value,
      });
   }

   return (
      <PopupWithForm
         buttonText={"Сохранить"}
         onSubmit={handleSubmit}
         name={'avatar'}
         title={"Обновить аватар"}
         onClose={onClose}
         isOpen={isOpen}
      >

         <input
            id="avatar-url"
            ref={avatarInputRef}
            required type="url"
            name="avatar"
            placeholder="Ссылка на картинку"
            className="popup__input popup__input_type_link-avatar">
         </input>

         <span
            id="avatar-url-error"
            className="popup__text-error">
         </span>

      </PopupWithForm>
   );
}

export default EditAvatarPopup;

import './InfoTooltip.css'

function InfoTooltip({ imageLink, name, text, isOpen, onClose }) {
   return (
      <div className={`popup popup_type_${name}${isOpen ? ' popup_active' : ''}`}>
         <div className="popup__container">
            <img src={imageLink} alt={text} className="popup-message-img"></img>

            <h3 className="popup-message-text">{text}</h3>

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

export default InfoTooltip;
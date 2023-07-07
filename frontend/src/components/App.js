import { useState, useEffect, useRef } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import '../index.css';
import imgSuccess from '../images/Union.svg';
import imgFail from '../images/Fail.svg';
import Header from './Header';
import { instApi } from '../utils/api.js';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm.js';
import EditProfilePopup from './EditProfilePopup';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import AddPlacePopup from './AddPlacePopup';
import EditAvatarPopup from '../components/EditAvatarPopup';
import Login from './Login';
import Register from './Register';
import ProtectedRouteElement from './ProtectedRoute';
import * as auth from './Auth';
import InfoTooltip from './InfoTooltip';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
  const [isCardPopupOpen, setCardPopupOpen] = useState(false);
  const [isSuccessPopupOpen, setSuccessPopupOpen] = useState(false);
  const [isFailPopupOpen, setFailPopupOpen] = useState(false);
  const [isСonsentPopupOpen, setСonsentPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const tempLogin = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      Promise.all(
        [
          instApi.getDataProfile(),
          instApi.getDataCards(),
          tempLogin.current()
        ])
        .then(([userData, cardData]) => {
          setСurrentUser(userData);
          setCards(cardData);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn, navigate]);

  const handleLogin = (email) => {
    setLoggedIn(true);
    setEmail(email)
  }

  const tokenCheck = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            handleLogin(res.email)
            navigate("/", { replace: true })
          }
        })
    }
  }

  tempLogin.current = tokenCheck;

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    instApi.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateUser(newDataUser) {
    instApi.patchDataProfile(newDataUser)
      .then((result) => {
        setСurrentUser(prev => {
          return {
            ...prev,
            name: result.name,
            about: result.about
          }
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(newAvatar) {
    instApi.patchAvatarProfile(newAvatar)
      .then((result) => {
        setСurrentUser(prev => {
          return {
            ...prev,
            avatar: result.avatar
          }
        });
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(newCard) {
    instApi.postNewCard(newCard)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete() {
    instApi.deleteCard(selectedCard._id)
      .then(() => {
        setCards(cards.filter(item =>
          item !== selectedCard
        ))
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true)
  }

  function handleRemoveCardClick(card) {
    setСonsentPopupOpen(true);
    setSelectedCard(card);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setCardPopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditProfilePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setSelectedCard({});
    setСonsentPopupOpen(false);
    setCardPopupOpen(false);
    setFailPopupOpen(false);
    setSuccessPopupOpen(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>



      <div className="bodywork">
        <div className="page">

          <Header email={email} />

          <Routes >
            <Route path="/sign-up" element={<Register handeleOpenPopupSuccess={setSuccessPopupOpen} handeleOpenPopupFail={setFailPopupOpen} />} />
            <Route path="/sign-in" element={<Login handleLogin={handleLogin} currentEmail={setEmail} handeleOpenPopupFail={setFailPopupOpen} />} />
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  loggedIn={loggedIn}
                  onEditProfile={handleEditProfileClick}
                  cardsData={cards}
                  onCardLike={handleCardLike}
                  onAddPlace={handleAddPlaceClick}
                  onEditAvatar={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardRemoveClick={handleRemoveCardClick}
                  element={Main}
                />
              }
            />
          </Routes>

          <Footer />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit} />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm
            buttonText={"Да"}
            name={'confirmation'}
            isOpen={isСonsentPopupOpen}
            onCardDelete={handleCardDelete}
            onClose={closeAllPopups}
            title={"Вы уверены?"}>
          </PopupWithForm>

          <InfoTooltip imageLink={imgSuccess} text={'Вы успешно зарегистрировались!'} name={'success'} isOpen={isSuccessPopupOpen} onClose={closeAllPopups} />

          <InfoTooltip imageLink={imgFail} text={'Что-то пошло не так! Попробуйте ещё раз.'} name={'fail'} isOpen={isFailPopupOpen} onClose={closeAllPopups} />

          <ImagePopup
            isOpen={isCardPopupOpen}
            card={selectedCard}
            onClose={closeAllPopups} />

        </div>
      </div >
    </CurrentUserContext.Provider>
  );
}

export default App;
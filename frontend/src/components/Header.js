import logoBig from '../images/logo142-33.svg';
import logoSmall from '../images/logo103-24.svg';
import { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import './Header.css'

function Header({ email }) {

   const navigate = useNavigate();
   const [activeBurger, setActiveBurger] = useState(false);

   function signOut() {
      localStorage.removeItem('jwt');
      navigate('/sign-in', { replace: true });
      handleClickBurger();
   }

   function handleClickBurger() {
      if (activeBurger === false) {
         setActiveBurger(true)
      }
      else {
         setActiveBurger(false)
      }
   }

   return (
      <header className={`header ${activeBurger ? ' header-active' : ''}`}>
         <picture className="header-logo-container">

            <source
               media="(max-width: 1023px)"
               srcSet={logoSmall} />

            <img
               src={logoBig}
               className="header-logo"
               alt="Логотип 'Место-Россия'" />

         </picture>

         <Routes>
            <Route path="/"
               element={
                  <div className='header-menu'>
                     <ul className={`header-list ${activeBurger ? ' header-list-active' : ''}`}>
                        <li className='header-element'>{email}</li>
                        <li className='header-element'><button to="/sign-up" onClick={signOut} className='header-button header-link'>Выйти</button></li>
                     </ul>

                     <button onClick={handleClickBurger} className={`burger header-button${activeBurger ? ' burger_active' : ''}`}>
                        <div className={`burger-line ${activeBurger ? ' burger-first-line' : ''}`}></div>
                        <div className={`burger-line ${activeBurger ? ' burger-second-line' : ''}`}></div>
                        <div className={`burger-line ${activeBurger ? ' burger-third-line' : ''}`}></div>
                     </button >

                  </div>

               }>

            </Route>
            <Route path="/sign-up" element={
               <ul className='header-list'><Link to="/sign-in" className='header-link'>Войти</Link></ul>
            }></Route>
            <Route path="/sign-in" element={<ul className='header-list'><Link to="/sign-up" className='header-link'>Регистрация</Link></ul>}></Route>
         </Routes >

      </header >
   );
}

export default Header;



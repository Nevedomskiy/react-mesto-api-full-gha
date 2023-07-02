import './FormEntrance.css'
import { Link } from 'react-router-dom';

function FormEntrance({ title, textBtn, handleSubmit, handleChange, formValue }) {
   return (
      <section className='entrance'>
         <div className='entrance-container'>
            <h2 className='entrance-title'>
               {title}
            </h2>
            <form
               name={'entrance'}
               className="entrance-form"
               onSubmit={handleSubmit}
               noValidate
            >
               <input
                  required
                  className='entrance-input'
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  value={formValue.email}
                  onChange={handleChange}
               />

               <input
                  required
                  className='entrance-input'
                  id="password"
                  name="password"
                  placeholder="Пароль"
                  type="password"
                  value={formValue.password}
                  onChange={handleChange}
               />

               <button
                  type="submit"
                  className="entrance-submit-btn"
               >
                  {textBtn}
               </button>
            </form>

            {(textBtn === "Зарегистрироваться") && <p className="entrance-text">Уже зарегистрированы? <Link to="/sign-in" className="register-link-login">Войти</Link></p>}


         </div>
      </section>
   );
}

export default FormEntrance;
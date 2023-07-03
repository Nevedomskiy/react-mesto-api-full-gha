import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormEntrance from './FormEntrance';
import * as auth from './Auth';
import './Register.css'

function Register({ handeleOpenPopupSuccess, handeleOpenPopupFail }) {

   const navigate = useNavigate();

   const [formValue, setFormValue] = useState({
      email: '',
      password: ''
   });

   const handleChange = (e) => {
      const { name, value } = e.target;

      setFormValue({
         ...formValue,
         [name]: value
      });
   }

   const handleSubmit = (e) => {
      e.preventDefault();

      auth.register(formValue.email, formValue.password)
         .then((res) => {
            handeleOpenPopupSuccess(true);
            navigate('/sign-in', { replace: true });
         })
         .catch((err) => {
            handeleOpenPopupFail(true);
            console.log(err);
         });;
   }

   return (
      <FormEntrance
         title={"Регистрация"}
         textBtn={'Зарегистрироваться'}
         formValue={formValue}
         handleChange={handleChange}
         handleSubmit={handleSubmit}
      />
   )
}

export default Register; 
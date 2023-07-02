import { useState } from 'react';
import FormEntrance from './FormEntrance';
import * as auth from './Auth';
import { useNavigate } from 'react-router-dom';

function Login({ handleLogin, currentEmail, handeleOpenPopupFail }) {

   const navigate = useNavigate();

   const [formValue, setFormValue] = useState({
      email: '',
      password: ''
   })

   const handleChange = (e) => {
      const { name, value } = e.target;

      setFormValue({
         ...formValue,
         [name]: value
      });
   }

   const handleSubmit = (e) => {
      e.preventDefault();
      if (!formValue.email || !formValue.password) {
         return;
      }
      auth.authorize(formValue.email, formValue.password)
         .then((data) => {
            if (data.token) {
               setFormValue({ email: '', password: '' });
               handleLogin(data.email);
               currentEmail(formValue.email)
               navigate('/', { replace: true });
            }
         })
         .catch(err => {
            handeleOpenPopupFail(true);
            console.log(err)
         });
   }

   return (
      <FormEntrance title={"Вход"} textBtn={'Войти'} handleChange={handleChange} formValue={formValue} handleSubmit={handleSubmit} ></FormEntrance>
   )
}

export default Login;
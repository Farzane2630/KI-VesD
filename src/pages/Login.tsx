import "./Login.scss"
import React from 'react';
import { useForm } from 'react-hook-form';

interface LoginForm {
   username: string;
   password: string;
}

interface LoginProps {
   loginInputs: {
      username: string, password: string
   }
}

const Login: React.FC<LoginProps> = () => {
   const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

   const handleLogin = (data: LoginForm) => {
      if (data.password === "KiVesd") {
         alert('registered')
      } else {
         alert('password is not correct!')
      }
   };

   return (
      <article>
      <div className="login-container">
         <h2 className="header">Login</h2>
         <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
            <label className="username-label" htmlFor="username">Username:</label>
            <input
               type="text"
               id="username"
               {...register('username', { required: 'Username is required' })}
            />
            {errors.username && <div className="error">{errors.username.message}</div>}

            <label className="password-label" htmlFor="password">Password:</label>
            <input
               type="password"
               id="password"
               {...register('password', { required: 'Password is required' })}
            />
            {errors.password && <div className="error">{errors.password.message}</div>}

            <button className="login-btn" type="submit">Login</button>
         </form>
      </div>
      </article>
   );
};

export default Login;

import "./Login.scss"
import React, { useState } from "react";
import { authenticateUser } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const [error, setError] = useState("");
   const navigate = useNavigate();

   const handleLogin = async () => {
      const token = await authenticateUser(username, password);

      if (token) {
         navigate("/dashboard");
      }
      else {
         setError('Username or Password in invalid!')
      }
   };
   return (
      <div className="login-container">
         <h2 className="login-header">Login</h2>
         {
            error && <span className="error" >{error}</span>
         }
         <input
            className="login-input"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
         />
         <input
            className="login-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
         />

         <button className="login-button" onClick={handleLogin}>
            Login
         </button>
      </div>
   );
};

export default Login;
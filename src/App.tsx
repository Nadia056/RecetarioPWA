import { useState } from 'react'

import './App.css'
import Swal from 'sweetalert2'
import logoUrl from './images/chef_icon.png'

const App = () => {
  const [logo] = useState(logoUrl);
  const apiUrl = import.meta.env.VITE_API_URL;

  const [isLogin, setIsLogin] = useState(true);

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_confirmation, setPasswordConfirm] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const user = { nombre, email, password,password_confirmation };

    try {
      const response = await fetch(`${apiUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {

        Swal.fire({
          title: "Usuario registrado",
          text: "Usuario registrado exitosamente",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
      
        setNombre('');
        setEmail('');
        setPassword('');
        setPasswordConfirm('');

      } else {
       
        Swal.fire({
          title: "Error",
          text: "Error al registrar el usuario",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
       
      }
    } catch (error) {
      console.error("Error:");
    }
  };

  const loginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const login = { email, password };
  
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(login),
      });
  
      if (response.ok) {
        const data = await response.json();
        const token = data.data.token.token;
  
        // Guardar el token en localStorage
        localStorage.setItem("authToken", token);
  
        Swal.fire({
          title: "Inicio de sesión exitoso",
          text: "Bienvenido a RecetApp",
          icon: "success",
          confirmButtonText: "Aceptar",
        });
  
        // Redirigir a la página de inicio
        window.location.href = "/home";
        setEmail('');
        setPassword('');
      } else {
        Swal.fire({
          title: "Error",
          text: "Credenciales inválidas",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        title: "Error",
        text: "Ocurrió un problema con el servidor",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
    }
  }
  ;

  return (
    <div className="app-container">
      <div className="form-container">
        <div className="logo">
          <img src={logo} alt="Chef Logo" className="logo-img" />
          <h1>RecetApp</h1>
          <p>Tu compañero culinario digital</p>
        </div>
        <div className="form-toggle">
          <button
            className={isLogin ? "active" : ""}
            onClick={() => setIsLogin(true)}
          >
            Iniciar sesión
          </button>
          <button
            className={!isLogin ? "active" : ""}
            onClick={() => setIsLogin(false)}
          >
            Registrarse
          </button>
        </div>
        {isLogin ? (
          <form className="form" onSubmit={loginSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
               id="email"
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input-field"
              />
            </div>
            <button type="submit" className="submit-btn">
              Iniciar sesión
            </button>
          </form>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                id="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Contraseña:</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirmar Contraseña:</label>
              <input
                id="passwordConfirm"
                type="password"
                value={password_confirmation}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                className="input-field"
              />
            </div>
            <button type="submit" className="submit-btn">
              Registrar
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default App;

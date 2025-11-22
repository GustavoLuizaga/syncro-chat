// App.tsx
import { useState } from "react"
import { Header } from "./components/Header"
import type { IUser } from "./types/user"
import RoutesConfig from "./routes/Routes"
import { useNavigate } from "react-router-dom"
import type { CredentialResponse } from "@react-oauth/google"
import { jwtDecode } from "jwt-decode"; // Para leer el token de Google aquí mismo

function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  // ESTA FUNCIÓN SIMULA TODO EL PROCESO BACKEND
  const handleLoginSuccess = async (credentialResponse: CredentialResponse) => {
    
    if (credentialResponse.credential) {
      const tokenGoogle = credentialResponse.credential;
      console.log("1. Google nos dio acceso. Token:", tokenGoogle);

      // --- INICIO SIMULACIÓN BACKEND ---
      // Aquí normalmente harías: axios.post('http://localhost:3000/auth', { token })
      
      console.log("2. Simulando envío al Backend (localhost:3000)...");
      
      // Decodificamos el token AQUÍ solo para simular que el backend nos devolvió los datos del usuario
      const decoded: { name: string; email: string } = jwtDecode(tokenGoogle);
      
      // Simulamos un retraso de red de 1 segundo
      await new Promise(resolve => setTimeout(resolve, 1000));

      console.log("3. Backend simulado respondió 'OK'");

      // Datos simulados que "volverían" del backend
      const simulatedUserFromBackend: IUser = {
        id: "user_123_simulado", // ID que vendría de tu BD
        name: decoded.name,      // Nombre real de tu cuenta Google
        email: decoded.email     // Email real de tu cuenta Google
      };

      const simulatedAppToken = "mi_token_falso_para_sockets"; 
      // --- FIN SIMULACIÓN ---

      // 4. Guardamos y redirigimos
      localStorage.setItem('token', simulatedAppToken);
      setUser(simulatedUserFromBackend);
      navigate("/chat"); // Asegúrate de tener esta ruta creada en RoutesConfig
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Header
        user={user}
        onLoginSuccess={handleLoginSuccess} // Pasamos la nueva función
        onLogout={handleLogout}
      />
      <main className="pt-16">
        <div className="max-w-7xl w-full mx-auto px-4 lg:px-8">
          <RoutesConfig />
        </div>
      </main>
    </>
  )
}

export default App
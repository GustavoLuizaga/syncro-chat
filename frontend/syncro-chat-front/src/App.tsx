import { useState } from "react"
import { Header } from "./components/Header"
import type { IUser } from "./types/user"
import RoutesConfig from "./routes/Routes"
import { useNavigate } from "react-router-dom"

function App() {

  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);

  const handleLogin = () => {
    //Implementar el login real aquí
    setUser({ id: "userId", name: "user name", email: "user@example.com" });
    navigate("/chat");
  };

  const handleLogout = () => {
    //Implementar el logout real aquí
    setUser(null);
    navigate("/");
  };

  return (
    <>
      <Header
        user={user}
        onLogin={handleLogin}
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

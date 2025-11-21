import { Header } from "./components/NavBar"


function App() {

  return (
    <>
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl w-full mx-auto px-4 lg:px-8">
          <span> contenido principal </span>
          { /* Main content */  }
        </div>
      </main>
    </>
  )
}

export default App

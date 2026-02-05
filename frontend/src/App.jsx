import Hero from './components/Hero'
import Navbar from './components/Navbar'
import About from './components/About'
import Portfolio from './components/Portfolio'
import Contato from './components/contato'  // Corrigi a importação, maiúsculo no nome do arquivo
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-black via-[#0f0c29] to-black text-white font-sans">
      <Navbar />
      <Hero />
      <About />
      <Portfolio />
      <Contato /> {/* Renderizando componente */}
      <Footer /> {/* Adiciona o rodapé aqui */}
    </div>
  )
}

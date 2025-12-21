import { useState, useEffect } from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)

      // Atualiza a seção ativa
      const sections = ['home', 'about', 'portfolio', 'contato']
      let currentSection = 'home'
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (const sectionId of sections) {
        const section = document.getElementById(sectionId)
        if (section) {
          const sectionTop = section.offsetTop
          if (scrollPosition >= sectionTop) {
            currentSection = sectionId
          }
        }
      }

      setActiveSection(currentSection)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Portfólio', href: '#portfolio' },
    { name: 'Contato', href: '#contato' },
  ]

  // Fecha o menu quando clicar em algum link
  const handleLinkClick = () => {
    setMenuOpen(false)
  }

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'backdrop-blur-md bg-[#0a0a0add] shadow-[0_0_15px_rgba(139,92,246,0.2)]'
          : 'bg-gradient-to-r from-[#0a0a0a] via-[#100a20] to-[#0a111a]'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 md:px-10 py-3 flex items-center justify-between">
        {/* Logo / Nome */}
        <div className="text-white text-2xl font-bold tracking-wide drop-shadow-[0_0_6px_rgba(139,92,246,0.6)]">
          Rafael<span className="text-purple-500"> Hedlund</span>
        </div>

        {/* Botão hambúrguer - só no mobile */}
        <button
          className="md:hidden text-white text-3xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
        </button>

        {/* Links desktop */}
        <ul className="hidden md:flex space-x-8 text-white/90 font-medium">
          {navItems.map(({ name, href }) => {
            const isActive = activeSection === href.substring(1)
            return (
              <li key={name}>
                <a
                  href={href}
                  className={`
                    relative
                    px-1
                    transition-colors duration-200
                    ${isActive ? 'text-purple-400' : 'hover:text-purple-400'}
                  `}
                >
                  {name}
                  <span
                    className={`
                      absolute left-0 bottom-0 h-[2px] w-full bg-purple-400
                      transition-all duration-300
                      ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
                      group-hover:opacity-100 group-hover:scale-x-100
                      origin-left
                    `}
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Menu mobile (slide down) */}
      <div
        className={`
          md:hidden bg-[#0a0a0add] backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.3)]
          transition-all duration-300 overflow-hidden
          ${menuOpen ? 'max-h-60 py-4' : 'max-h-0 py-0'}
        `}
      >
        <ul className="flex flex-col space-y-4 px-6 text-white font-medium">
          {navItems.map(({ name, href }) => {
            const isActive = activeSection === href.substring(1)
            return (
              <li key={name}>
                <a
                  href={href}
                  onClick={handleLinkClick}
                  className={`
                    block
                    relative
                    px-1
                    transition-colors duration-200
                    ${isActive ? 'text-purple-400' : 'hover:text-purple-400'}
                  `}
                >
                  {name}
                  <span
                    className={`
                      absolute left-0 bottom-0 h-[2px] w-full bg-purple-400
                      transition-all duration-300
                      ${isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
                      origin-left
                    `}
                  />
                </a>
              </li>
            )
          })}
        </ul>
      </div>

      {/* Estilos para o underline animado no hover */}
      <style>{`
        ul li a {
          position: relative;
          display: inline-block;
        }
        ul li a span {
          transform-origin: left;
        }
        ul li a:hover span {
          opacity: 1 !important;
          transform: scaleX(1) !important;
        }
      `}</style>
    </header>
  )
}

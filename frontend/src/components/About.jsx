import { useEffect, useRef, useState } from 'react'
import { FaCode, FaCertificate, FaGlobe, FaDownload } from 'react-icons/fa'

export default function About() {
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function handleScroll() {
      if (!sectionRef.current) return
      const top = sectionRef.current.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      if (top < windowHeight * 0.9) {
        setVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const cards = [
    {
      icon: <FaCode className="text-3xl text-purple-400 mb-4 mt-2" />,
      title: 'PROJETOS',
      value: '2',
      desc: 'Desenvolvimento full stack com foco em eficiência, qualidade e escrita de projetos sólidos.',
    },
    {
      icon: <FaCertificate className="text-3xl text-purple-400 mb-4 mt-2" />,
      title: 'EXPERIÊNCIA PROFISSIONAL',
      value: '1 Ano',
      desc: 'Desenvolvimento e manutenção de sites com JavaScript, PHP, WordPress e foco em performance visual.',
    },
    {
      icon: <FaGlobe className="text-3xl text-purple-400 mb-2 mt-2" />,
      title: 'EDUCAÇÃO',
      value: 'Universidade Anhanguera',
      desc: 'Bacharelado em Engenharia de Software – Concluido.',
    },
  ]

  const animationCards = [
    'translate-x-[-50px] opacity-0',
    'translate-y-[50px] opacity-0',
    'translate-x-[50px] opacity-0',
  ]

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700&display=swap"
        rel="stylesheet"
      />

      <section
        id="about"
        ref={sectionRef}
        className="min-h-screen pt-10 flex items-center"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-10 flex flex-col items-center text-center space-y-10">
          {/* Título */}
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight text-white drop-shadow-[0_0_8px_rgba(139,92,246,0.7)] transition-all duration-[1000ms]
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
            `}
            style={{ transitionProperty: 'opacity, transform' }}
          >
            Perfil Profissional
          </h2>

          {/* Parágrafo */}
          <p
            className={`text-white/90 max-w-3xl text-sm sm:text-base md:text-lg leading-relaxed transition-all duration-[1800ms]
              ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            `}
            style={{ transitionProperty: 'opacity, transform' }}
          >
         Olá, eu sou{' '}
        <span className="font-semibold text-purple-400">Rafael Hedlund</span>, Engenheiro de Software formado e Desenvolvedor Web, 
        com experiência em criação de sites dinâmicos, APIs REST, plugins personalizados e otimização de performance. 
        Trabalho com tecnologias como <span className="font-semibold text-purple-400">JavaScript, React, Node.js, 
        Express, Tailwind CSS, HTML, CSS, PHP, Python, C++, MySQL e MongoDB</span> e utilizo controle de versão com 
        <span className="font-semibold text-purple-400"> Git/GitHub</span>. Tenho foco em soluções eficientes, código claro e robusto, 
        arquitetura limpa e responsividade. Atualmente, desenvolvo projetos próprios e colaborativos, sempre buscando entregar aplicações funcionais, 
        escaláveis e com excelente usabilidade.
          </p>

          {/* Botão */}
          <a
            href="/curriculo.pdf"
            download
            className={`hover:bg-[#6921A5] px-5 sm:px-6 md:px-8 py-2 sm:py-3 border border-purple-600 text-purple-300 rounded-lg shadow-[0_0_5px_rgba(139,92,246,0.4)] hover:shadow-[0_0_12px_rgba(139,92,246,0.5)] inline-flex items-center gap-2 text-sm sm:text-base transition-all duration-[1800ms]
              ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}
            `}
            style={{
              fontFamily: "'Inter', sans-serif",
              textRendering: 'optimizeLegibility',
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
              transitionProperty: 'opacity, transform',
            }}
          >
            <FaDownload />
            Baixar Currículo
          </a>

          {/* Cards */}
          <div className="flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6 w-full max-w-4xl leading-relaxed">
            {cards.map(({ icon, title, value, desc }, i) => (
              <div
                key={title}
                className={`bg-black/40 hover:bg-black/60 rounded-2xl px-6 py-6 w-full max-w-sm shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] transition-all duration-[1800ms] flex flex-col items-center md:items-start justify-between min-h-[220px] cursor-pointer
                  ${
                    visible
                      ? 'opacity-100 translate-x-0 translate-y-0'
                      : animationCards[i]
                  }
                `}
                style={{
                  transitionProperty: 'opacity, transform',
                  transitionDelay: visible ? `${i * 400}ms` : '0ms',
                }}
              >
                {icon}
                <p className="text-xs sm:text-sm uppercase text-white/90 tracking-widest text-center md:text-left">{title}</p>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 text-center md:text-left">{value}</h3>
                <p className="text-sm sm:text-base text-white/50 mt-4 leading-relaxed text-center md:text-left">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import { useEffect, useRef, useState } from 'react'
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { FaCode, FaCertificate, FaGithub, FaTimes, FaExternalLinkAlt } from 'react-icons/fa'
import {
  SiReact,
  SiJavascript,
  SiNodedotjs,
  SiTailwindcss,
  SiPython,
  SiHtml5,
  SiCss3,
  SiCplusplus,
  SiMysql,
  SiGithub,
} from 'react-icons/si'

// Importa a imagem local da pasta src/assets
import algoritmoImg from '../assets/algoritmoImg.jpg'
import DesenvolvimentoWeb from '../assets/DesenvolvimentoWeb.jpg'
import Cplus from '../assets/Cplus.jpg'
import IntroduçãoPython from '../assets/IntroduçãoPython.jpg'
import crypto from '../assets/crypto.png'
// Importe seu vídeo (substitua pelo caminho correto)
import cryptoVideo from '../assets/crypto-dashboard-video.mp4'

const tabs = [
  { name: 'Projetos', icon: <FaCode /> },
  { name: 'Certificados', icon: <FaCertificate /> },
  { name: 'Tech Stack', icon: <SiReact /> },
]

export default function Portfolio() {
  const [activeTab, setActiveTab] = useState('Projetos')
  const sectionRef = useRef(null)
  const [visible, setVisible] = useState(false)

  // Estados para Lightbox
  const [open, setOpen] = useState(false)
  const [index, setIndex] = useState(0)
  
  // Estado para controlar a exibição dos detalhes do projeto
  const [projectDetails, setProjectDetails] = useState(null)

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

  const projects = [
    {
      title: 'Crypto Dashboard',
      description:
        'Desenvolvi um dashboard full stack para monitoramento de criptomoedas em tempo real, integrando frontend moderno (React + TailwindCSS) e backend escalável (Node.js + Express), com integração de APIs externas de forma eficiente e confiável',
      image: crypto, 
      liveLink: 'https://dashboard-crypto-jet.vercel.app/',
      details: '#',
      github: 'https://github.com/RafaelHedlund/Dashboard-Crypto?utm_source',
      video: cryptoVideo,
      fullDescription: `
        O Crypto Dashboard é uma aplicação full stack que permite aos usuários monitorar criptomoedas em tempo real. 
        Desenvolvido com React no frontend e Node.js no backend, o projeto oferece uma interface intuitiva e responsiva 
        para visualização de preços, análise de gráficos, e design responsivo para criptomoedas.
        
        Principais funcionalidades:
        • Visualização de preços em tempo real através de APIs especializadas
        • Gráficos interativos para análise de tendências
        • Design responsivo que se adapta a diferentes dispositivos
        
        Tecnologias utilizadas:
        Frontend: React, TailwindCSS, Chart.js, Axios
        Backend: Node.js, Express, APIs de criptomoedas
      `,
      images: [
        crypto,
      ]
    },
    {
      title: 'Em construção...',
      description:
        'Em construção...',
      image: 'https://via.placeholder.com/400x200',
      demo: '#',
      details: '#',
    },
    {
      title: 'Em construção...',
      description:
        'Em construção...',
      image: 'https://via.placeholder.com/400x200',
      demo: '#',
      details: '#',
    },
  ]

  const certificates = [
    { title: 'Algoritmos e Lógica', image: algoritmoImg },
    { title: 'Desenvolvimento Web', image: DesenvolvimentoWeb },
    { title: 'C++', image: Cplus },
    { title: 'Introdução à Analise de Dados com Python', image: IntroduçãoPython },
  ]

  const techStack = [
    { name: 'React', icon: <SiReact /> },
    { name: 'Node.js', icon: <SiNodedotjs /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    { name: 'JavaScript (ES6)', icon: <SiJavascript /> },
    { name: 'HTML', icon: <SiHtml5 /> },
    { name: 'CSS', icon: <SiCss3 /> },
    { name: 'Python', icon: <SiPython /> },
    { name: 'C++', icon: <SiCplusplus /> },
    { name: 'MySQL', icon: <SiMysql /> },
    { name: 'Git / GitHub', icon: <SiGithub /> },
  ]

  // Função para abrir os detalhes do projeto
  const openProjectDetails = (project) => {
    setProjectDetails(project)
  }

  // Função para fechar os detalhes do projeto
  const closeProjectDetails = () => {
    setProjectDetails(null)
  }

  const renderContent = () => {
    const animationClass = visible
      ? 'opacity-100 translate-y-0'
      : 'opacity-0 translate-y-6'
    const transitionBase =
      'transition-all duration-[1200ms] ease-in-out transform'

    switch (activeTab) {
      case 'Projetos':
        return (
          <>
            <div
              className={`grid md:grid-cols-3 gap-6 mt-8 ${transitionBase} ${animationClass}`}
            >
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-[#1c1c2b] rounded-xl p-4 shadow-lg hover:scale-105 hover:shadow-purple-600 transition duration-300 hover:border hover:border-purple-500 hover:shadow-[0_0_12px_4px_rgba(192,132,252,0.5)]"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="rounded mb-4 w-full object-cover"
                  />
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-4">{project.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          className="flex items-center gap-1 text-sm bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white px-3 py-1.5 rounded transition-all hover:scale-105 hover:shadow-[0_0_8px_rgba(192,132,252,0.6)]"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt className="text-xs" />
                          Ver Projeto
                        </a>
                      )}
                      <button
                        onClick={() => openProjectDetails(project)}
                        className="text-sm bg-[#2c2c3e] px-3 py-1.5 rounded hover:bg-[#3b3b51] hover:text-white transition-colors"
                      >
                        Detalhes →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal de Detalhes do Projeto */}
            {projectDetails && (
              <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4">
                <div className="bg-[#1c1c2b] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                  <div className="sticky top-0 bg-[#1c1c2b] p-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-2xl font-bold text-white">{projectDetails.title}</h3>
                    <button 
                      onClick={closeProjectDetails}
                      className="text-white hover:text-purple-400 text-xl"
                    >
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    {/* Vídeo do projeto */}
                    <div className="mb-6">
                      <video 
                        controls 
                        className="w-full rounded-lg"
                        poster={projectDetails.image}
                      >
                        <source src={projectDetails.video} type="video/mp4" />
                        Seu navegador não suporta o elemento de vídeo.
                      </video>
                    </div>
                    
                    {/* Descrição completa */}
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-white mb-3">Sobre o Projeto</h4>
                      <p className="text-gray-300 whitespace-pre-line">{projectDetails.fullDescription}</p>
                    </div>

                    {/* Botões de Ação */}
                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      {/* Botão GitHub */}
                      {projectDetails.github && (
                        <a
                          href={projectDetails.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-lg min-w-[180px] justify-center"
                        >
                          <FaGithub className="text-xl" />
                          Código no GitHub
                        </a>
                      )}
                      
                      {/* Botão Ver Projeto ao Vivo */}
                      {projectDetails.liveLink && (
                        <a
                          href={projectDetails.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-lg transition-all hover:scale-105 hover:shadow-[0_0_15px_rgba(192,132,252,0.7)] min-w-[180px] justify-center"
                        >
                          <FaExternalLinkAlt />
                          Ver Projeto ao Vivo
                        </a>
                      )}
                    </div>
                    
                    {/* Imagens do projeto (se houver) */}
                    {projectDetails.images && projectDetails.images.length > 0 && (
                      <div className="mb-6">
                        <h4 className="text-xl font-semibold text-white mb-3">Imagens do Projeto</h4>
                        <div className="grid grid-cols-2 gap-4">
                          {projectDetails.images.map((img, idx) => (
                            <img 
                              key={idx} 
                              src={img} 
                              alt={`${projectDetails.title} ${idx + 1}`}
                              className="rounded-lg cursor-pointer"
                              onClick={() => {
                                setIndex(idx)
                                setOpen(true)
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )

      case 'Certificados':
        return (
          <div
            className={`grid md:grid-cols-4 gap-6 mt-8 ${transitionBase} ${animationClass}`}
          >
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                className="bg-[#1c1c2b] p-4 rounded-xl text-center hover:scale-105 hover:border hover:border-purple-500 hover:shadow-[0_0_12px_4px_rgba(192,132,252,0.5)] transition cursor-pointer"
                onClick={() => {
                  setIndex(idx)
                  setOpen(true)
                }}
              >
                <img
                  src={cert.image}
                  alt={cert.title}
                  className="rounded mb-3 mx-auto w-full object-cover"
                />
                <h3 className="text-white font-medium">{cert.title}</h3>
              </div>
            ))}

            <Lightbox
              open={open}
              index={index}
              close={() => setOpen(false)}
              slides={certificates.map(cert => ({ src: cert.image }))}
            />
          </div>
        )

      case 'Tech Stack':
        return (
          <div
            className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 mt-8 text-white ${transitionBase} ${animationClass}`}
          >
            {techStack.map((tech, idx) => (
              <div
                key={idx}
                className="hover:scale-105 flex flex-col items-center bg-[#1c1c2b] rounded-lg p-4 hover:border hover:border-purple-500 hover:shadow-[0_0_12px_4px_rgba(192,132,252,0.5)] transition cursor-default"
                style={{ minWidth: '90px' }}
              >
                <div className="text-4xl text-purple-400 mb-2">{tech.icon}</div>
                <h4 className="font-semibold text-center text-sm">{tech.name}</h4>
              </div>
            ))}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <section
      id="portfolio"
      ref={sectionRef}
      className="py-40 px-4 sm:px-10 md:px-20 text-white transition-all duration-1000 ease-in-out"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          className={`text-5xl sm:text-6xl md:text-6xl font-extrabold text-center drop-shadow-[0_0_8px_rgba(139,92,246,0.7)] mb-10 transition-all duration-[1000ms] transform
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}
          `}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          Portfólio
        </h2>

        <p
          className={`text-center text-gray-300 max-w-xl mx-auto mb-10 transition-all duration-[1400ms] transform
            ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
          `}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          Este espaço apresenta projetos, certificações e competências desenvolvidas ao longo da minha trajetória profissional. 
          Cada item reflete o compromisso com a excelência técnica, a inovação constante e a entrega de soluções eficientes no setor de tecnologia.
        </p>

        <div
          className={`flex justify-center gap-4 mb-10 transition-all duration-[1600ms]
          ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
          style={{ transitionProperty: 'opacity, transform' }}
        >
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`
                flex items-center gap-2 rounded-md font-semibold
                px-4 py-2 text-sm
                md:px-6 md:py-3 md:text-base
                transition-all
                ${
                  activeTab === tab.name
                    ? 'bg-[#2b2b44] text-purple-400 border border-purple-600 shadow-[0_0_5px_rgba(139,92,246,0.4)]'
                    : 'bg-[#1c1c2b] text-gray-300 hover:text-white hover:bg-[#6921A5]'
                }
              `}
              onClick={() => setActiveTab(tab.name)}
            >
              <span className="text-lg">{tab.icon}</span> {tab.name}
            </button>
          ))}
        </div>

        {renderContent()}
      </div>
    </section>
  )
}
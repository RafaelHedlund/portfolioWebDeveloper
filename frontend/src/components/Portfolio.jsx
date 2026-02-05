import { useEffect, useRef, useState } from 'react'
import Lightbox from "yet-another-react-lightbox"
import "yet-another-react-lightbox/styles.css"
import { SiMongodb } from 'react-icons/si'
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
import MDashborad from '../assets/MDashboard.png'

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
      github: 'https://github.com/RafaelHedlund/Dashboard-Crypto?utm_source',
      video: '/crypto-dashboard-video.mp4', // Caminho absoluto para public
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
      images: [crypto]
    },
    {
      title: 'MicroSaaS de Produtividade com IA',
      description:
        'Desenvolvi um MicroSaaS full stack de produtividade com IA, integrando frontend moderno (React + TailwindCSS) e backend escalável (Node.js + Express + MongoDB), com autenticação JWT, dashboards analíticos e assistente de IA.',
      image: MDashborad,
      liveLink: 'https://micro-saas-ai.vercel.app/',
      github: 'https://github.com/RafaelHedlund/Micro-Saas', 
      video: '/msaas.mp4', // Caminho absoluto para public
      fullDescription: `
        Sobre o Projeto
        O MicroSaaS de Produtividade com IA é uma aplicação full stack desenvolvida para centralizar e otimizar a produtividade pessoal e profissional.

        Principais Funcionalidades:
        • Assistente de IA integrada para criação de tarefas e análise de gastos
        • Dashboard analítico com gráficos de performance
        • Autenticação segura com JWT
        • Interface moderna com Dark Mode

        Tecnologias Utilizadas:
        Frontend: React, TailwindCSS, Recharts
        Backend: Node.js, Express, MongoDB
        IA: OpenAI API
      `,
      images: [MDashborad]
    },
    {
      title: 'Em construção...',
      description: 'Em construção...',
      image: 'https://via.placeholder.com/400x200',
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
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'Git / GitHub', icon: <SiGithub /> },
  ]

  const openProjectDetails = (project) => setProjectDetails(project)
  const closeProjectDetails = () => setProjectDetails(null)

  const renderContent = () => {
    const animationClass = visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
    const transitionBase = 'transition-all duration-[1200ms] ease-in-out transform'

    switch (activeTab) {
      case 'Projetos':
        return (
          <>
            <div className={`grid md:grid-cols-3 gap-6 mt-8 ${transitionBase} ${animationClass}`}>
              {projects.map((project, idx) => (
                <div
                  key={idx}
                  className="bg-[#1c1c2b] rounded-xl p-4 shadow-lg hover:scale-105 hover:shadow-purple-600 transition duration-300 hover:border hover:border-purple-500 hover:shadow-[0_0_12px_4px_rgba(192,132,252,0.5)]"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="rounded mb-4 w-full h-48 object-cover"
                  />
                  <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                  <p className="text-sm text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 items-center">
                      {project.liveLink && (
                        <a
                          href={project.liveLink}
                          className="flex items-center gap-1 text-xs bg-gradient-to-r from-purple-700 to-purple-800 hover:from-purple-600 hover:to-purple-700 text-white px-3 py-1.5 rounded transition-all"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <FaExternalLinkAlt className="text-[10px]" />
                          Ver Projeto
                        </a>
                      )}
                      <button
                        onClick={() => openProjectDetails(project)}
                        className="text-xs bg-[#2c2c3e] px-3 py-1.5 rounded hover:bg-[#3b3b51] transition-colors text-gray-200"
                      >
                        Detalhes →
                      </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal de Detalhes */}
            {projectDetails && (
              <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
                <div className="bg-[#1c1c2b] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-800">
                  <div className="sticky top-0 bg-[#1c1c2b] p-4 border-b border-gray-700 flex justify-between items-center z-10">
                    <h3 className="text-2xl font-bold text-white">{projectDetails.title}</h3>
                    <button onClick={closeProjectDetails} className="text-white hover:text-purple-400 text-xl">
                      <FaTimes />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    {projectDetails.video && (
                      <div className="mb-6">
                        <video controls className="w-full rounded-lg shadow-2xl" poster={projectDetails.image}>
                          <source src={projectDetails.video} type="video/mp4" />
                        </video>
                      </div>
                    )}
                    
                    <div className="mb-8">
                      <h4 className="text-xl font-semibold text-purple-400 mb-3">Sobre o Projeto</h4>
                      <p className="text-gray-300 whitespace-pre-line leading-relaxed">{projectDetails.fullDescription}</p>
                    </div>

                    <div className="flex flex-wrap gap-4 justify-center mb-8">
                      {projectDetails.github && (
                        <a
                          href={projectDetails.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-gray-800 hover:bg-gray-700 text-white px-6 py-3 rounded-lg transition-all hover:scale-105 min-w-[180px] justify-center"
                        >
                          <FaGithub className="text-xl" />
                          Código no GitHub
                        </a>
                      )}
                      
                      {projectDetails.liveLink && (
                        <a
                          href={projectDetails.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-lg transition-all hover:scale-105 shadow-lg min-w-[180px] justify-center"
                        >
                          <FaExternalLinkAlt />
                          Ver Projeto ao Vivo
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )

      case 'Certificados':
        return (
          <div className={`grid md:grid-cols-4 gap-6 mt-8 ${transitionBase} ${animationClass}`}>
            {certificates.map((cert, idx) => (
              <div
                key={idx}
                className="bg-[#1c1c2b] p-4 rounded-xl text-center hover:scale-105 hover:border hover:border-purple-500 transition cursor-pointer"
                onClick={() => { setIndex(idx); setOpen(true); }}
              >
                <img src={cert.image} alt={cert.title} className="rounded mb-3 mx-auto w-full h-32 object-cover" />
                <h3 className="text-white font-medium text-sm">{cert.title}</h3>
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
          <div className={`grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 mt-8 text-white ${transitionBase} ${animationClass}`}>
            {techStack.map((tech, idx) => (
              <div key={idx} className="flex flex-col items-center bg-[#1c1c2b] rounded-lg p-4 hover:border hover:border-purple-500 transition">
                <div className="text-4xl text-purple-400 mb-2">{tech.icon}</div>
                <h4 className="font-semibold text-center text-sm">{tech.name}</h4>
              </div>
            ))}
          </div>
        )
      default: return null
    }
  }

  return (
    <section id="portfolio" ref={sectionRef} className="py-40 px-4 sm:px-10 md:px-20 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className={`text-5xl md:text-6xl font-extrabold text-center mb-10 transition-all duration-1000 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Portfólio
        </h2>

        <p className={`text-center text-gray-300 max-w-xl mx-auto mb-10 transition-all duration-1000 delay-200 ${visible ? 'opacity-100' : 'opacity-0'}`}>
          Exploração técnica e soluções full stack. Aqui estão alguns dos meus projetos principais e conquistas acadêmicas.
        </p>

        <div className="flex justify-center gap-4 mb-10">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              className={`flex items-center gap-2 rounded-md font-semibold px-4 py-2 text-sm transition-all ${
                  activeTab === tab.name 
                  ? 'bg-[#2b2b44] text-purple-400 border border-purple-600' 
                  : 'bg-[#1c1c2b] text-gray-300 hover:bg-[#6921A5] hover:text-white'
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.icon} {tab.name}
            </button>
          ))}
        </div>
        {renderContent()}
      </div>
    </section>
  )
}

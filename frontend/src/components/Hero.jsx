import React, { useEffect, useState } from 'react'
import { FaGithub, FaLinkedin, FaInstagram } from 'react-icons/fa'
import Lottie from 'lottie-react'
import animationData from '../assets/animation.json'
import { motion } from 'framer-motion'

// Typewriter
const Typewriter = ({ texts = [], speed = 80, pause = 1000 }) => {
  const [displayedText, setDisplayedText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [textIndex, setTextIndex] = useState(0)

  useEffect(() => {
    const currentText = texts[textIndex % texts.length]
    let timeoutId

    if (!isDeleting) {
      if (displayedText.length < currentText.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length + 1))
        }, speed)
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true)
        }, pause)
      }
    } else {
      if (displayedText.length > 0) {
        timeoutId = setTimeout(() => {
          setDisplayedText(currentText.slice(0, displayedText.length - 1))
        }, speed / 2)
      } else {
        setIsDeleting(false)
        setTextIndex((prev) => (prev + 1) % texts.length)
      }
    }

    return () => clearTimeout(timeoutId)
  }, [displayedText, isDeleting, textIndex, texts, speed, pause])

  return (
    <span className="border-r-2 border-purple-600 animate-blink-caret font-mono">
      {displayedText}
    </span>
  )
}

const typewriterTexts = [
  'Engenheiro de Software | Desenvolvimento Web',
  'Focado no aprendizado contínuo em tecnologias modernas',
  'Focado em performance e qualidade de código',
]

const skills = [
  'React', 'Node.js', 'JavaScript','PHP','Express.js', 'Tailwind',
  'HTML', 'CSS', 'Python', 'MySQL','MongoDB','Git / Github',
]

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.30,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
}

const Hero = () => {
  return (
    <section id='home' className="min-h-screen pt-[72px] flex items-center">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-16">

        {/* Coluna Esquerda */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left w-full md:w-1/2 space-y-5 md:space-y-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.button
            className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-purple-900 text-purple-100 text-xs font shadow-[0_0_8px_rgba(139,92,246,0.7)] hover:shadow-[0_0_16px_rgba(139,92,246,0.9)] transition-shadow duration-300"
            variants={itemVariants}
          >
            👋 Hello there!
          </motion.button>

          <motion.h1
            className="text-5xl sm:text-6xl md:text-7xl font-extrabold leading-tight text-white"
            variants={itemVariants}
          >
            <span className="block">Web</span>
            <span className="block text-purple-600 drop-shadow-[0_0_8px_rgba(139,92,246,0.7)]">
              Developer
            </span>
          </motion.h1>

          <motion.div
            className="text-white/90 text-lg h-8"
            variants={itemVariants}
          >
            <Typewriter texts={typewriterTexts} />
          </motion.div>

          <motion.p
            className="text-white/80 leading-relaxed text-sm md:text-base max-w-prose"
            variants={itemVariants}
          >
            Engenheiro de Software formado, focado em desenvolvimento web e na construção de soluções eficientes e funcionais. 
            Meu objetivo é criar aplicações claras, robustas e práticas, que entreguem valor real para quem as utiliza
          </motion.p>

          {/* Skills */}
          <motion.div className="flex flex-col gap-3 w-full" variants={itemVariants}>
            {Array.from({ length: Math.ceil(skills.length / 5) }).map((_, row) => (
              <div key={row} className="flex flex-wrap justify-center md:justify-start gap-2">
                {skills.slice(row * 5, row * 5 + 5).map((skill) => (
                  <span
                    key={skill}
                    className="bg-black/40 text-white/80 px-4 py-2 rounded-full border border-purple-700 text-xs md:text-sm text-center whitespace-nowrap min-w-[100px] hover:bg-purple-900/30 transition-all"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ))}
          </motion.div>

          {/* Botões */}
          <motion.div
            className="flex gap-4 md:gap-6 justify-center md:justify-start mt-6"
            variants={itemVariants}
          >
            <a
              href="#portfolio"
              className="px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-purple-900 to-purple-800 text-white font-semibold rounded-lg shadow-[0_0_8px_rgba(139,92,246,0.5)] hover:shadow-[0_0_16px_rgba(139,92,246,0.7)] transition-all duration-300 inline-flex items-center gap-2 text-sm md:text-base"
            >
              Projetos ↗
            </a>
            <a
              href="#contato"
              className="hover:bg-[#6921A5] px-6 md:px-8 py-2 md:py-3 border border-purple-600 text-purple-300 rounded-lg shadow-[0_0_5px_rgba(139,92,246,0.4)] hover:shadow-[0_0_12px_rgba(139,92,246,0.5)] transition-all duration-300 inline-flex items-center gap-2 text-sm md:text-base"
            >
              Contato ✉
            </a>
          </motion.div>

          {/* Redes sociais */}
          <motion.div
            className="flex gap-5 md:gap-6 mt-6 md:mt-8 text-2xl md:text-3xl text-purple-500 justify-center md:justify-start"
            variants={itemVariants}
          >
            <a href="https://github.com/RafaelHedlund" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-all duration-300">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/rafaelhedlund/" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-all duration-300">
              <FaLinkedin />
            </a>
            <a href="https://www.instagram.com/rafa_hedlund/?locale=(URL%3AKTT.bet)%F0%9F%8E%81Plush%2BCrazy%2BEntertainment%2BOfficial%2BAPP.zbjk&hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-purple-400 transition-all duration-300">
              <FaInstagram />
            </a>
          </motion.div>
        </motion.div>

        {/* Coluna Direita (Lottie) */}
        <motion.div
          className="w-full md:w-1/2 flex justify-center items-center mt-10 md:mt-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1, ease: 'easeOut' }}
        >
          <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[600px] h-full flex items-center justify-center">
            <Lottie
              animationData={animationData}
              loop={true}
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '500px',
                filter: 'drop-shadow(0 0 12px rgba(139, 92, 246, 0.5))',
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero

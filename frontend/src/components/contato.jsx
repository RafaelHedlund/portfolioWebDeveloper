import { useState, useEffect } from 'react'
import {
  HiOutlineUser,
  HiOutlineChatAlt2,
} from 'react-icons/hi'
import { MdAlternateEmail, MdSend } from 'react-icons/md'
import { FaCheckCircle } from 'react-icons/fa'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import Lottie from 'lottie-react'
import animationData from '../assets/animation2.json'
import emailjs from '@emailjs/browser'

function isValidEmail(email) {
  // Regex simples para validar email decente
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

// Limite máximo razoável para cada campo
const MAX_NAME_LENGTH = 50
const MAX_EMAIL_LENGTH = 100
const MAX_MESSAGE_LENGTH = 1000

// Função para sanitizar texto, removendo tags HTML e caracteres perigosos simples
function sanitizeInput(str) {
  // Remove tags HTML básicas
  return str.replace(/<[^>]*>?/gm, '').trim()
}

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    captchaAnswer: '',
  })
  const [honeypot, setHoneypot] = useState('')
  const [isSending, setIsSending] = useState(false)
  const [isSent, setIsSent] = useState(false)
  const [emailError, setEmailError] = useState(false)
  const [lengthError, setLengthError] = useState('') // erro por limite de caracteres
  const [captchaError, setCaptchaError] = useState(false)

  const [captchaNumbers, setCaptchaNumbers] = useState([0, 0])

  useEffect(() => {
    const a = Math.floor(Math.random() * 5) + 1
    const b = Math.floor(Math.random() * 5) + 1
    setCaptchaNumbers([a, b])
  }, [isSent])

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'honeypot') {
      setHoneypot(value)
    } else {
      // Limitar tamanho dos campos ao digitar
      if (name === 'name' && value.length > MAX_NAME_LENGTH) {
        setLengthError(`Nome deve ter no máximo ${MAX_NAME_LENGTH} caracteres.`)
        return
      }
      if (name === 'email' && value.length > MAX_EMAIL_LENGTH) {
        setLengthError(`Email deve ter no máximo ${MAX_EMAIL_LENGTH} caracteres.`)
        return
      }
      if (name === 'message' && value.length > MAX_MESSAGE_LENGTH) {
        setLengthError(`Mensagem deve ter no máximo ${MAX_MESSAGE_LENGTH} caracteres.`)
        return
      }
      // Limpa erros se estiver digitando certo
      if (emailError && name === 'email') setEmailError(false)
      if (lengthError) setLengthError('')
      if (captchaError && name === 'captchaAnswer') setCaptchaError(false)

      setFormData((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Honeypot spam
    if (honeypot) {
      alert('Spam detectado.')
      return
    }

    // Campos obrigatórios
    if (!formData.name || !formData.email || !formData.message) {
      alert('Por favor, preencha todos os campos.')
      return
    }

    // Limites finais antes do envio
    if (formData.name.length > MAX_NAME_LENGTH) {
      alert(`Nome deve ter no máximo ${MAX_NAME_LENGTH} caracteres.`)
      return
    }
    if (formData.email.length > MAX_EMAIL_LENGTH) {
      alert(`Email deve ter no máximo ${MAX_EMAIL_LENGTH} caracteres.`)
      return
    }
    if (formData.message.length > MAX_MESSAGE_LENGTH) {
      alert(`Mensagem deve ter no máximo ${MAX_MESSAGE_LENGTH} caracteres.`)
      return
    }

    // Validação email
    if (!isValidEmail(formData.email)) {
      setEmailError(true)
      return
    }

    // Validação captcha
    const correctAnswer = captchaNumbers[0] + captchaNumbers[1]
    if (parseInt(formData.captchaAnswer, 10) !== correctAnswer) {
      setCaptchaError(true)
      return
    }

    setIsSending(true)

    // Sanitiza inputs para evitar código malicioso
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      message: sanitizeInput(formData.message),
    }

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    emailjs
      .send(serviceID, templateID, sanitizedData, publicKey)
      .then(() => {
        setIsSent(true)
        setFormData({ name: '', email: '', message: '', captchaAnswer: '' })
        setIsSending(false)

        setTimeout(() => {
          setIsSent(false)
        }, 2000)
      })
      .catch((error) => {
        console.error('Erro ao enviar:', error)
        alert('Ocorreu um erro ao enviar. Tente novamente.')
        setIsSending(false)
      })
  }

  return (
    <section
      id="contato"
      className="w-full px-4 py-12 mt-10 flex justify-center items-center"
    >
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="transform -translate-x-4 flex justify-center items-center px-4">
          <Lottie
            animationData={animationData}
            loop={true}
            className="w-full max-w-[220px] sm:max-w-[280px] md:max-w-[320px]"
          />
        </div>

        <div
          className="bg-gradient-to-br from-[#0d0d11] via-[#4b367d99] to-[#2e225499]
              rounded-xl p-8 shadow-lg text-white
              transition-transform duration-300
              hover:scale-105 hover:border hover:border-purple-500 hover:shadow-[0_0_12px_4px_rgba(192,132,252,0.5)]"
        >
          <h2 className="text-white/90 text-4xl font-extrabold text-purple-600 mb-4 text-center drop-shadow-md">
            Entre em Contato
          </h2>
          <p className="text-center text-gray-400 text-sm mb-6">
            Caso tenha alguma dúvida ou queira entrar em contato, por favor envie uma mensagem. Responderei o mais breve possível.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* HONEYPOT */}
            <input
              type="text"
              name="honeypot"
              value={honeypot}
              onChange={handleChange}
              autoComplete="off"
              tabIndex={-1}
              style={{ display: 'none' }}
            />

            {/* Nome */}
            <div className="flex items-center bg-[#222232] rounded-md px-4 py-3 border border-purple-600 focus-within:border-purple-400 transition-colors duration-300">
              <HiOutlineUser className="text-purple-400 mr-3 text-xl" />
              <input
                name="name"
                type="text"
                placeholder="Seu Nome"
                value={formData.name}
                onChange={handleChange}
                maxLength={MAX_NAME_LENGTH}
                required
                className="bg-transparent outline-none placeholder-gray-400 text-gray-200 w-full"
              />
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <div className="flex items-center bg-[#222232] rounded-md px-4 py-3 border border-purple-600 focus-within:border-purple-400 transition-colors duration-300">
                <MdAlternateEmail className="text-purple-400 mr-3 text-xl" />
                <input
                  name="email"
                  type="email"
                  placeholder="Seu Email"
                  value={formData.email}
                  onChange={handleChange}
                  maxLength={MAX_EMAIL_LENGTH}
                  required
                  className="bg-transparent outline-none placeholder-gray-400 text-gray-200 w-full"
                />
              </div>

              {/* Mensagem de erro do email */}
              {emailError && (
                <div className="flex items-center gap-2 mt-1 text-red-600 text-sm font-semibold select-none">
                  <AiOutlineCloseCircle
                    className="text-red-600 bg-white rounded-full"
                    size={20}
                  />
                  <span>Por favor, insira um email válido.</span>
                </div>
              )}

              {/* Mensagem de erro de limite de caracteres */}
              {lengthError && (
                <div className="flex items-center gap-2 mt-1 text-red-600 text-sm font-semibold select-none">
                  <AiOutlineCloseCircle
                    className="text-red-600 bg-white rounded-full"
                    size={20}
                  />
                  <span>{lengthError}</span>
                </div>
              )}
            </div>

            {/* Mensagem */}
            <div className="flex items-start bg-[#222232] rounded-md px-4 py-3 border border-purple-600 focus-within:border-purple-400 transition-colors duration-300">
              <HiOutlineChatAlt2 className="text-purple-400 mr-3 mt-2 text-xl" />
              <textarea
                name="message"
                rows={4}
                placeholder="Sua Mensagem"
                value={formData.message}
                onChange={handleChange}
                maxLength={MAX_MESSAGE_LENGTH}
                required
                className="bg-transparent outline-none placeholder-gray-400 text-gray-200 w-full resize-none"
              />
            </div>

            {/* Mini Captcha */}
            <div className="flex items-center bg-[#222232] rounded-md px-4 py-3 border border-purple-600 focus-within:border-purple-400 transition-colors duration-300">
              <label
                htmlFor="captchaAnswer"
                className="text-purple-400 mr-3 select-none text-lg"
              >
                Quanto é {captchaNumbers[0]} + {captchaNumbers[1]}?
              </label>
              <input
                name="captchaAnswer"
                type="number"
                placeholder="Resposta"
                value={formData.captchaAnswer}
                onChange={handleChange}
                required
                className={`bg-transparent outline-none placeholder-gray-400 text-gray-200 w-full max-w-[100px] ${
                  captchaError ? 'border border-red-600' : ''
                }`}
              />
            </div>

            {/* Erro captcha */}
            {captchaError && (
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm font-semibold select-none">
                <AiOutlineCloseCircle
                  className="text-red-600 bg-white rounded-full"
                  size={20}
                />
                <span>Resposta do captcha incorreta. Tente novamente.</span>
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={isSending || isSent}
              className={`w-full py-3 rounded-md flex items-center justify-center gap-2
                  transition-colors duration-300
                  ${
                    isSent
                      ? 'bg-green-600 text-white cursor-default'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:brightness-110 cursor-pointer shadow-[0_0_5px_rgba(139,92,246,0.4)] hover:shadow-[0_0_12px_rgba(139,92,246,0.5)]'
                  }
                `}
            >
              {!isSent ? (
                <>
                  <MdSend className="text-xl" />
                  {isSending ? 'Enviando...' : 'Enviar Mensagem'}
                </>
              ) : (
                <span className="flex items-center gap-2">
                  <FaCheckCircle className="text-white text-xl" />
                  Enviado
                </span>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

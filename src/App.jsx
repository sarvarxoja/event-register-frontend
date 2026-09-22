import { useState } from 'react'
import './App.css'
import { content } from './data/content'
import Header from './components/Header'
import HeroSection from './components/HeroSection'
import ProgramSection from './components/ProgramSection'
import RegistrationForm from './components/RegistrationForm'
import Footer from './components/Footer'

const titles = {
  uz: "Soliq Maslahatchilari Forumi — Ro'yxatdan o'tish",
  ru: 'Форум налоговых консультантов — Регистрация',
}

function App() {
  const [lang, setLang] = useState('uz')
  const t = content[lang]

  document.title = titles[lang]

  return (
    <div>
      <Header lang={lang} setLang={setLang} t={t} />
      <HeroSection t={t} />
      <ProgramSection t={t} />
      <RegistrationForm t={t} />
      <Footer t={t} />
    </div>
  )
}

export default App

import { LanguageProvider } from './i18n'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { Hero } from './components/sections/Hero'
import { Numbers } from './components/sections/Numbers'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Research } from './components/sections/Research'
import { Skills } from './components/sections/Skills'
import { Contact } from './components/sections/Contact'

function App() {
  return (
    <LanguageProvider>
      <Navbar />
      <main className="pt-14">
        <Hero />
        <Numbers />
        <About />
        <Projects />
        <Research />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App

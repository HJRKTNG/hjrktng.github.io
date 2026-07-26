import { LanguageProvider } from './i18n'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { MachineHero } from './components/machine/MachineHero'
import { MachineStage } from './components/machine/MachineStage'
import { TestBench } from './components/machine/TestBench'
import { SpecSheet } from './components/sections/SpecSheet'
import { ContactPlate } from './components/sections/ContactPlate'
import { stages } from './data/machine'

function App() {
  const [gates, conduit, escapement, splitter, origin] = stages

  return (
    <LanguageProvider>
      <Navbar />
      <main>
        <MachineHero />

        {/* 01 — 時間差ゲート列 */}
        <MachineStage stage={gates} />
        {/* 実際に動く試験台 */}
        <TestBench />

        {/* 02 — 導管 */}
        <MachineStage stage={conduit} />

        {/* 03 — 脱進機 */}
        <MachineStage stage={escapement} />

        {/* 04 — 光学分岐 */}
        <MachineStage stage={splitter} />

        {/* 05 — 原点 */}
        <MachineStage stage={origin} />

        <SpecSheet />
        <ContactPlate />
      </main>
      <Footer />
    </LanguageProvider>
  )
}

export default App

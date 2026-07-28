import { LanguageProvider } from './i18n'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { MachineColumn } from './components/machine/MachineColumn'
import { HeroSection } from './components/machine/HeroSection'
import { UnitSection } from './components/machine/UnitSection'
import { TestBench } from './components/machine/TestBench'
import { DepthGauge } from './components/machine/DepthGauge'
import { FilmGrain } from './components/machine/FilmGrain'
import { SpecSheet } from './components/sections/SpecSheet'
import { ContactPlate } from './components/sections/ContactPlate'
import { stages } from './data/machine'

function App() {
  const [gates, conduit, escapement, splitter, origin] = stages

  return (
    <LanguageProvider>
      <Navbar />
      <main>
        {/* ── 機構区間: 1本のカラムを降りていく ── */}
        <div id="machine-region" className="relative">
          <MachineColumn regionId="machine-region" />
          <DepthGauge regionId="machine-region" />

          <div className="relative z-10">
            <HeroSection />
            <UnitSection stage={gates} />
            <TestBench />
            <UnitSection stage={conduit} />
            <UnitSection stage={escapement} />
            <UnitSection stage={splitter} />
            <UnitSection stage={origin} />
          </div>
        </div>

        {/* ── 仕様書区間 ── */}
        <div className="relative z-10">
          <SpecSheet />
          <ContactPlate />
        </div>
      </main>
      <Footer />
      <FilmGrain />
    </LanguageProvider>
  )
}

export default App

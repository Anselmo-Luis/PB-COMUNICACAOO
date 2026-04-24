import { lazy, Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import TrustLogos from './components/sections/TrustLogos'

const Benefits = lazy(() => import('./components/sections/Benefits'))
const Process = lazy(() => import('./components/sections/Process'))
const Features = lazy(() => import('./components/sections/Features'))
const Services = lazy(() => import('./components/sections/Services'))
const Portfolio = lazy(() => import('./components/sections/Portfolio'))
const FAQ = lazy(() => import('./components/sections/FAQ'))
const CTA = lazy(() => import('./components/sections/CTA'))
const ContactForm = lazy(() => import('./components/sections/ContactForm'))
const LocationMapSection = lazy(() => import('./components/sections/LocationMapSection'))
const Footer = lazy(() => import('./components/layout/Footer'))

function App() {
  return (
    <>
      <a href="#content" className="skip-link">
        Pular para o conteúdo
      </a>
      <Navbar />
      <main id="content">
        <Hero />
        <TrustLogos />
        <Suspense fallback={null}>
          <Benefits />
          <Process />
          <Features />
          <Services />
          <Portfolio />
          <FAQ />
          <CTA />
          <ContactForm />
          <LocationMapSection />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App

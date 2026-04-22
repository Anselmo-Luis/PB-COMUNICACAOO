import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import TrustLogos from './components/sections/TrustLogos'
import Benefits from './components/sections/Benefits'
import Process from './components/sections/Process'
import Features from './components/sections/Features'
import Services from './components/sections/Services'
import Portfolio from './components/sections/Portfolio'
import Testimonials from './components/sections/Testimonials'
import FAQ from './components/sections/FAQ'
import CTA from './components/sections/CTA'
import ContactForm from './components/sections/ContactForm'
import LocationMapSection from './components/sections/LocationMapSection'
import Footer from './components/layout/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main id="content">
        <Hero />
        <TrustLogos />
        <Benefits />
        <Process />
        <Features />
        <Services />
        <Portfolio />
        <Testimonials />
        <FAQ />
        <CTA />
        <ContactForm />
        <LocationMapSection />
      </main>
      <Footer />
    </>
  )
}

export default App

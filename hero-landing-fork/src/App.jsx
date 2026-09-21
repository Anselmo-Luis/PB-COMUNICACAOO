import { lazy, Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Hero from './components/sections/Hero'
import TrustLogos from './components/sections/TrustLogos'

const Benefits = lazy(() => import('./components/sections/Benefits'))
const Process = lazy(() => import('./components/sections/Process'))
const MaterialsVideo = lazy(() => import('./components/sections/MaterialsVideo'))
const Services = lazy(() => import('./components/sections/Services'))
const Portfolio = lazy(() => import('./components/sections/Portfolio'))
const FAQ = lazy(() => import('./components/sections/FAQ'))
const CTA = lazy(() => import('./components/sections/CTA'))
const ContactForm = lazy(() => import('./components/sections/ContactForm'))
const LocationMapSection = lazy(() => import('./components/sections/LocationMapSection'))
const Footer = lazy(() => import('./components/layout/Footer'))

function LazySection({ children }) {
  return <Suspense fallback={null}>{children}</Suspense>
}

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
        <LazySection><Benefits /></LazySection>
        <LazySection><Process /></LazySection>
        <LazySection><MaterialsVideo /></LazySection>
        <LazySection><Services /></LazySection>
        <LazySection><Portfolio /></LazySection>
        <LazySection><FAQ /></LazySection>
        <LazySection><CTA /></LazySection>
        <LazySection><ContactForm /></LazySection>
        <LazySection><LocationMapSection /></LazySection>
      </main>
      <LazySection><Footer /></LazySection>
    </>
  )
}

export default App

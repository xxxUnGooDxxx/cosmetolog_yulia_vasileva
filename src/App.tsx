import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Services from './components/Services'
import Procedures from './components/Procedures'
import Pricing from './components/Pricing'
import Works from './components/Works'
import Education from './components/Education'
import Reviews from './components/Reviews'
import Steps from './components/Steps'
import Faq from './components/Faq'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Procedures />
        <Pricing />
        <Works />
        <Education />
        <Reviews />
        <Steps />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

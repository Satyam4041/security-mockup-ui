import AnnouncementBar from '@/components/AnnouncementBar'
import Awards from '@/components/Awards'
import FinalCTA from '@/components/FinalCTA'
import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import Platform from '@/components/Platform'
import Pricing from '@/components/Pricing'
import Problem from '@/components/Problem'
import Services from '@/components/Services'
import Showcase from '@/components/Showcase'
import Stats from '@/components/Stats'
import Testimonials from '@/components/Testimonials'
import TrustBar from '@/components/TrustBar'

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <main id="main">
        <Hero />
        <TrustBar />
        <Problem />
        <Platform />
        <Showcase />
        <Stats />
        <Services />
        <Awards />
        <Testimonials />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  )
}

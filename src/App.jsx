import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Team from './components/Team.jsx';
import Projects from './components/Projects.jsx';
import ServicesTestimonialsBlog from './components/ServicesTestimonialsBlog.jsx';
import Pricing from './components/Pricing.jsx';
import MsmeSection from './components/MsmeSection.jsx';
import IndustrySection from './components/IndustrySection.jsx';
import TrustSection from './components/TrustSection.jsx';
import FaqSection from './components/FaqSection.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

const AdminPanel = lazy(() => import('./components/AdminPanel.jsx'));

function Portfolio() {
  return (
    <div className="min-h-screen overflow-hidden bg-midnight text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Team />
        <Projects />
        <ServicesTestimonialsBlog />
        <IndustrySection />
        <TrustSection />
        <Pricing />
        <MsmeSection />
        <FaqSection />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route
        path="/admin"
        element={
          <Suspense fallback={<div className="min-h-screen bg-midnight" />}>
            <AdminPanel />
          </Suspense>
        }
      />
      <Route path="/*" element={<Portfolio />} />
    </Routes>
  );
}

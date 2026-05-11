import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Team from './components/Team.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Education from './components/Education.jsx';
import Certifications from './components/Certifications.jsx';
import Internship from './components/Internship.jsx';
import Packages from './components/Packages.jsx';
import GoogleRating from './components/GoogleRating.jsx';
import Contact from './components/Contact.jsx';
import Footer from './components/Footer.jsx';

function Portfolio() {
  return (
    <div className="min-h-screen overflow-hidden bg-midnight text-slate-100">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Team />
        <Skills />
        <Projects />
        <Education />
        <Internship />
        <Certifications />
        <Packages />
        <GoogleRating />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/*" element={<Portfolio />} />
    </Routes>
  );
}

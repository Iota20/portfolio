import { useEffect, useState } from 'react';

import './App.css'
import Hero from './components/Hero'
import About from './components/AboutSection/About'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("Hero");

    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowNav(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      }
    );

    if (hero) observer.observe(hero);

    return () => observer.disconnect();
  }, []);
  
  return (
    <main className="app-shell">
      <nav className={`fixed left-0 top-0 z-50 flex w-full justify-center bg-gray-700/90 py-2 shadow-[0_3px_8px_rgba(0,0,0,0.28)] backdrop-blur-sm transition-opacity duration-300 ${
          showNav
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}>
          <a className="mx-2 px-4 py-2 text-slate-100 no-underline hover:text-white" href="#about">About Me</a>
          <a className="mx-2 px-4 py-2 text-slate-100 no-underline hover:text-white" href="#projects">Projects</a>
          <a className="mx-2 px-4 py-2 text-slate-100 no-underline hover:text-white" href="#contact">Contact</a>
        </nav>

      <Hero />
      <About />
      <Projects />
      <Experience />
      <Contact />
      <Footer />
    </main>
  )
}

export default App

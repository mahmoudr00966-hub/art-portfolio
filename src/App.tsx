import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import HeroScene from './components/HeroScene'
import './App.css'

function App() {
  const content = useRef<HTMLDivElement>(null)

  // One entrance animation when the page loads.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const ctx = gsap.context(() => {
      gsap.from('.hero-line', {
        y: 48,
        opacity: 0,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.14,
        delay: 0.25,
      })
    }, content.current ?? undefined)

    return () => ctx.revert()
  }, [])

  return (
    <>
      <header className="hero">
        <div className="hero-canvas">
          <HeroScene />
        </div>

        <div className="hero-content" ref={content}>
          <h1 className="hero-title hero-line">Mahmoud Reda</h1>
          <p className="hero-sub hero-line">
            3D artist building characters, environments and props.
          </p>
          <a className="hero-button hero-line" href="#work">
            View my work
          </a>
        </div>
      </header>

      <main id="work" className="work">
        <h2>Work</h2>
        <p>Your first piece goes here.</p>
      </main>
    </>
  )
}

export default App

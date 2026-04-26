import { useEffect, useState } from 'react'
import './Loader.css'

export default function Loader({ onDone }) {
  const [hiding, setHiding] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => setHiding(true), 2700)
    const doneTimer = setTimeout(() => onDone(), 3200)
    return () => { clearTimeout(fadeTimer); clearTimeout(doneTimer) }
  }, [onDone])

  return (
    <div className={`loader-screen ${hiding ? 'loader-hide' : ''}`}>
      <div className="loader-body">
        <div className="loader-electric-wrap">

          {/* Electric wave ring — SVG turbulence makes the circle look like live current */}
          <svg className="loader-ring" viewBox="0 0 140 140">
            <defs>
              <filter id="electric-wave" x="-25%" y="-25%" width="150%" height="150%">
                <feTurbulence
                  type="turbulence"
                  baseFrequency="0.025 0.06"
                  numOctaves="3"
                  seed="4"
                  result="noise"
                >
                  <animate
                    attributeName="baseFrequency"
                    values="0.02 0.05;0.05 0.09;0.02 0.05"
                    dur="0.6s"
                    repeatCount="indefinite"
                  />
                  <animate
                    attributeName="seed"
                    values="4;9;2;7;4"
                    dur="0.9s"
                    repeatCount="indefinite"
                  />
                </feTurbulence>
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale="4"
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Static track */}
            <circle className="loader-ring-track" cx="70" cy="70" r="56" />

            {/* Electric-wave arc — draws in while turbulence distorts it */}
            <g filter="url(#electric-wave)">
              <circle className="loader-ring-arc" cx="70" cy="70" r="56" />
            </g>

            {/* Bright leading dot that rides the arc */}
            <circle className="loader-ring-dot" cx="70" cy="14" r="3.5" />
          </svg>

          {/* Logo powers on with electric flicker */}
          <img
            src="/images/icons/bruchmann_logo.png"
            alt="Bruchmann"
            className="loader-logo"
          />
        </div>

        {/* Electric stutter progress bar */}
        <div className="loader-bar-track">
          <div className="loader-bar-fill" />
          <div className="loader-bar-pulse" />
        </div>
      </div>
    </div>
  )
}

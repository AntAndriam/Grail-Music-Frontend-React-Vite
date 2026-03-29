import React from 'react'
import "../css/LandingPage.css";


const WaveformBar = ({ delay }) => (
  <span className="waveform-bar" style={{ animationDelay: `${delay}s` }} />
);


export default function Waveform() {
  return (
  <div className="waveform">
    {[0, 0.1, 0.2, 0.05, 0.15, 0.25, 0.08, 0.18].map((d, i) => (
      <WaveformBar key={i} delay={d} />
    ))}
  </div>
)
}

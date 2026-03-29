import { useState, useEffect } from "react";
import "../css/LandingPage.css";
import { useNavigate } from "react-router-dom";
import Waveform from "./WaveForm";

const Logo = () => (
  <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="36" height="36" rx="8" fill="#4338CA" />
    <circle cx="18" cy="18" r="7" stroke="#E0E7FF" strokeWidth="2" fill="none" />
    <circle cx="18" cy="18" r="2.5" fill="#E0E7FF" />
    <path d="M18 5 L18 2" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M18 34 L18 31" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M5 18 L2 18" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M34 18 L31 18" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M9.22 9.22 L7.1 7.1" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M28.9 28.9 L26.78 26.78" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M26.78 9.22 L28.9 7.1" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
    <path d="M7.1 28.9 L9.22 26.78" stroke="#E0E7FF" strokeWidth="2" strokeLinecap="round" />
  </svg>
);



const tracks = [
  { title: "Void Sessions", artist: "GXRXN", duration: "3:42", plays: "18K" },
  { title: "Nuit Polaire", artist: "Sombre Éclat", duration: "4:11", plays: "9.4K" },
  { title: "basement tape #7", artist: "lo-fi prophet", duration: "2:57", plays: "41K" },
  { title: "Cemento Armado", artist: "KRUEL", duration: "3:18", plays: "6.1K" },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="landing">
      <div className="bg">

      </div>
      <div className="root">
        {/*  Grillage pour le style */}
        <div className="noise-overlay" />

        {/* NAVBAR */}
        <nav className={`navbar${scrolled ? " navbar--scrolled" : ""}`}>
          <div className="nav-inner">
            <a href="#" className="nav-logo">
              <Logo />
              <span className="nav-logo-text">Grail</span>
            </a>

            <button
              className="nav-burger"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label="Menu"
            >
              <span className={`burger-line${menuOpen ? " open" : ""}`} />
              <span className={`burger-line${menuOpen ? " open" : ""}`} />
              <span className={`burger-line${menuOpen ? " open" : ""}`} />
            </button>

            <ul className={`nav-links${menuOpen ? " nav-links--open" : ""}`}>
              <li><a href="#about" onClick={() => setMenuOpen(false)}>About</a></li>
              <li><a href="#features" onClick={() => setMenuOpen(false)}>Features</a></li>
              <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
              <li><a href="#policy" onClick={() => setMenuOpen(false)}>Policy</a></li>
            </ul>

            <div className="nav-actions">
              <button className="btn btn--ghost" onClick={() => { navigate('/login') }}>Log in</button>
              <button className="btn btn--primary" onClick={() => { navigate('/sign') }}>Sign up</button>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="hero">

          <div className="hero-content">
            {/* <div className="hero-eyebrow">
              <Waveform />
            </div> */}

            <h1 className="hero-title">
              Music doesn't<br />
              <span className="hero-title--accent">bleeds through</span><br />
              the noise.
            </h1>

            <p className="hero-sub">
              Découvrez l'underground rap, les voix oubliées des caves et des parkings.
              Streamez sans algorithme, sans compromis.
            </p>

            <div className="hero-cta">
              <button className="btn btn--primary btn--large">Get Started — Free</button>
              <button className="btn btn--outline btn--large">Explore Artists</button>
            </div>

            <p className="hero-note">No credit card required · 50M+ underground tracks</p>
          </div>

        </section>

        <section className="tracks-section" id="features">
          <div className="section-inner">
            <div className="section-header">
              <span className="section-tag">TRENDING UNDERGROUND</span>
              <h2 className="section-title">On tourne en ce moment</h2>
            </div>

            <ul className="track-list">
              {tracks.map((t, i) => (
                <li
                  key={i}
                  className={`track-item${activeTrack === i ? " track-item--active" : ""}`}
                  onClick={() => setActiveTrack(i === activeTrack ? null : i)}
                >
                  <span className="track-index">
                    {activeTrack === i ? <Waveform /> : String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="track-info">
                    <span className="track-title">{t.title}</span>
                    <span className="track-artist">{t.artist}</span>
                  </div>
                  <span className="track-plays">{t.plays}</span>
                  <span className="track-duration">{t.duration}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ABOUT SECTION */}
        <section className="about-section" id="about">
          <div className="section-inner about-grid">
            <div className="about-text">
              <span className="section-tag">ABOUT VLTG</span>
              <h2 className="section-title">Construit pour ceux<br />qui cherchent plus loin.</h2>
              <p className="about-body">
                VLTG n'est pas une playlist générée par une IA. C'est une scène : des MC de
                Montreuil, des beatmakers de Detroit, des ingés son de nuit. On croit que la
                musique qui compte n'est pas sur les charts.
              </p>
              <a href="#contact" className="btn btn--primary">Rejoindre la scène</a>
            </div>
            <div className="about-stats">
              {[
                { n: "50M+", l: "Tracks" },
                { n: "120K", l: "Artistes" },
                { n: "4.2M", l: "Auditeurs" },
                { n: "0", l: "Algorithme" },
              ].map((s) => (
                <div className="stat-card" key={s.l}>
                  <span className="stat-n">{s.n}</span>
                  <span className="stat-l">{s.l}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer" id="contact">
          <div className="footer-inner">
            <div className="footer-brand">
              <Logo />
              <span className="nav-logo-text">VLTG</span>
            </div>
            <div className="footer-links">
              <a href="#about">About</a>
              <a href="#contact">Contact</a>
              <a href="#policy">Privacy Policy</a>
              <a href="#policy">Terms</a>
            </div>
            <p className="footer-copy">© 2025 VLTG. Tous droits réservés.</p>
          </div>
        </footer>
      </div>
    </div>
  );
}

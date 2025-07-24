import { useEffect, useState } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const scrollPercentage = (scrollPosition / windowHeight) * 100;
      setScrolled(scrollPercentage > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        {/* Left: Logo */}
        <div className="navbar-brand">
          <div className="logo-icon">
            <div className="sun-icon"></div>
            <div className="cloud-icon"></div>
          </div>
          <span className="brand-text">MausamNow</span>
        </div>

        {/* Right: Nav Links + Bell + Subscribe */}
        <div className="navbar-right">
          <div className="navbar-links-wrapper">
              <a href="#" className="nav-link active">Weather</a>
              <a href="#" className="nav-link">Careers</a>
              <a href="#" className="nav-link">Products</a>
              <a href="#" className="nav-link">Company</a>

            <div className="notification-bell">
              <svg className="bell-icon" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
              </svg>
              <span className="notification-dot"></span>
            </div>

            <button className="subscribe-btn">Subscribe</button>
          </div>

          {/* Optional mobile toggle */}
          <button className="mobile-toggle">
            <svg className="menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>


      </div>
    </nav>
  );
};

export default Navbar;

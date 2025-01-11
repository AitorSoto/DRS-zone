import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰
        </button>
        <nav className={`nav ${isOpen ? "open" : ""}`}>
          <ul>
            <li>
              <Link to="/" className="f1-font" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/drivers" className="f1-font" onClick={closeMenu}>
                Drivers
              </Link>
            </li>
            <li>
              <Link to="/circuits" className="f1-font" onClick={closeMenu}>
                Circuits
              </Link>
            </li>
            <li>
              <Link to="/constructors" className="f1-font" onClick={closeMenu}>
                Constructors
              </Link>
            </li>
            <li>
              <Link to="/seasons" className="f1-font" onClick={closeMenu}>
                Seasons
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

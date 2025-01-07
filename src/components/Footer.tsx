import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import "./Footer.css";

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} DRS Zone. All rights reserved.</p>
        <nav className="footer-nav">
          <ul className="footer-icons">
            <li>
              <a
                href="https://www.linkedin.com/in/aitorsotojimenez"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                href="https://github.com/aitorsoto"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;

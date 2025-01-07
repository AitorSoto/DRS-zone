import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./layout.css";
import Footer from "./Footer";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link to="/" className="f1-font">
                Home
              </Link>
            </li>
            <li>
              <Link to="/drivers" className="f1-font">
                Drivers
              </Link>
            </li>
          </ul>
        </nav>
      </header>
      <motion.main
        className="main-content"
        initial={{ opacity: 0, x: 300 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -300 }}
        transition={{ duration: 0.25 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default Layout;

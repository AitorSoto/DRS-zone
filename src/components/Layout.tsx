import React from "react";
import { motion } from "framer-motion";
import "./layout.css";
import Footer from "./Footer";
import Header from "./Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
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

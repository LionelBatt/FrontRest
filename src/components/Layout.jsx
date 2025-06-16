import { Outlet } from "react-router-dom";
import React, { useState, useEffect, useRef } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const hoverTimeoutRef = useRef(null);

  // Nettoyer le timeout quand le composant est démonté
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  const handleMenuClick = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleMenuMouseEnter = () => {
    console.log('Mouse enter on globe button'); // Debug
    // Annuler le timeout de fermeture s'il existe
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setSidebarOpen(true);
  };

  const handleMenuMouseLeave = () => {
    console.log('Mouse leave globe button'); // Debug
    // Démarrer un timeout pour fermer la sidebar après un délai
    hoverTimeoutRef.current = setTimeout(() => {
      console.log('Closing sidebar after button leave timeout'); // Debug
      setSidebarOpen(false);
    }, 500); // 500ms de délai avant fermeture
  };

  const handleSidebarMouseEnter = () => {
    console.log('Mouse enter on sidebar'); // Debug
    // Annuler le timeout de fermeture quand on survole la sidebar
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleSidebarMouseLeave = () => {
    console.log('Mouse leave sidebar'); // Debug
    // Démarrer un timeout pour fermer la sidebar après un délai
    hoverTimeoutRef.current = setTimeout(() => {
      console.log('Closing sidebar after timeout'); // Debug
      setSidebarOpen(false);
    }, 500); // 500ms de délai avant fermeture
  };

  const handleCloseSidebar = () => {
    console.log('Manual close sidebar'); // Debug
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setSidebarOpen(false);
  };

  return (
    <>
      <Header 
        onMenuClick={handleMenuClick}
        onMenuMouseEnter={handleMenuMouseEnter}
        onMenuMouseLeave={handleMenuMouseLeave}
      />
      <Sidebar
        isOpen={sidebarOpen}
        onClose={handleCloseSidebar}
        onMouseEnter={handleSidebarMouseEnter}
        onMouseLeave={handleSidebarMouseLeave}
      />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
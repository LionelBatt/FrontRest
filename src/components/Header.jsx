import { Link } from "react-router-dom";
import { Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import '../styles/glassmorphism.css';

const Header = ({ onMenuClick, onMenuMouseEnter, onMenuMouseLeave }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Vérifier si l'utilisateur est connecté au chargement du composant
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    // Vérifier au chargement
    checkLoginStatus();

    // Écouter les événements personnalisés
    const handleLoginChange = () => {
      checkLoginStatus();
    };

    window.addEventListener('loginStatusChanged', handleLoginChange);
    window.addEventListener('storage', handleLoginChange);

    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginChange);
      window.removeEventListener('storage', handleLoginChange);
    };
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      fetch("http://15.188.48.92:8080/travel/auth/signout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(data => {
        console.log("Déconnexion réussie :", data);
      })
      .catch(err => console.error("Erreur lors de la déconnexion :", err))
      .finally(() => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        console.log("Token supprimé et utilisateur déconnecté");
        
        // Déclencher l'événement personnalisé
        window.dispatchEvent(new Event('loginStatusChanged'));
        
        window.location.href = "/";
      });
    }
  };
  return (
    <header>
      <nav className="navbar navbar-expand-md fixed-top glass-navbar">
        <div className="container-fluid">

          {/* Bouton Globe avec couleur noire */}
          <button
            onClick={onMenuClick}
            onMouseEnter={() => {
              console.log('Globe button mouse enter');
              if (onMenuMouseEnter) onMenuMouseEnter();
            }}
            onMouseLeave={() => {
              console.log('Globe button mouse leave');
              if (onMenuMouseLeave) onMenuMouseLeave();
            }}
            className="glass-btn glass-border-radius-lg me-3 d-flex align-items-center justify-content-center"
            style={{ 
              padding: '0.6rem',
              fontSize: '1.2rem',
              color: 'black', /* Couleur noire explicite */
            }}
            title="Destinations"
          >
            <Globe size={20} /> 
          </button>

          <Link 
            to="/" 
            className="navbar-brand"
            style={{
              fontWeight: '600',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.3)',
              textDecoration: 'none',
              color: 'black', /* Texte en noir comme demandé */
            }}
          >
            Agence de Voyage ✈
          </Link>

          {/* Bouton Bootstrap avec style glassmorphism */}
          <button
            className="navbar-toggler glass-btn glass-border-radius"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span 
              className="navbar-toggler-icon"
              style={{
                filter: 'brightness(0)', /* Hamburger en noir */
              }}
            ></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <form className="d-flex ms-auto gap-2">
              <Link 
                to="/search" 
                className="btn glass-btn-success glass-border-radius-lg glass-text-white" 
                role="button"
                style={{
                  fontWeight: '500',
                  padding: '0.5rem 1rem',
                  textDecoration: 'none',
                }}
              >
                Rechercher
              </Link>
              
              {isLoggedIn ? (
                <button 
                  onClick={handleLogout}
                  className="btn glass-btn-danger glass-border-radius-lg glass-text-white" 
                  style={{
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    backgroundColor: 'rgba(220, 53, 69, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: 'none',
                  }}
                >
                  Se déconnecter
                </button>
              ) : (
                <Link 
                  to="/login" 
                  className="btn glass-btn-primary glass-border-radius-lg glass-text-white" 
                  role="button"
                  style={{
                    fontWeight: '500',
                    padding: '0.5rem 1rem',
                    textDecoration: 'none',
                  }}
                >
                  Se connecter
                </Link>
              )}
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
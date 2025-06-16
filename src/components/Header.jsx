import { Link } from "react-router-dom";
import { Globe } from 'lucide-react';
import '../styles/glassmorphism.css';

const Header = ({ onMenuClick, onMenuMouseEnter, onMenuMouseLeave }) => {
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
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
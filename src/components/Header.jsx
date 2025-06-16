import { Link } from "react-router-dom";
import { Globe } from 'lucide-react';

const Header = ({ onMenuClick, onMenuMouseEnter, onMenuMouseLeave }) => {
  return (
    <header>
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">

          {/* Bouton Globe (ouvre la sidebar) */}
          <button
            onClick={onMenuClick}
            onMouseEnter={() => {
              console.log('Globe button mouse enter'); // Debug
              if (onMenuMouseEnter) onMenuMouseEnter();
            }}
            onMouseLeave={() => {
              console.log('Globe button mouse leave'); // Debug  
              if (onMenuMouseLeave) onMenuMouseLeave();
            }}
            className="btn btn-outline-light me-3 d-flex align-items-center justify-content-center"
            style={{ border: 'none', padding: '0.5rem', fontSize: '1.2rem' }}
            title="Destinations"
          >
            <Globe size={20} /> 
          </button>

          <Link to="/" className="navbar-brand">
            Agence de Voyage ✈
          </Link>

          {/* Bouton Bootstrap classique pour collapse (utile mobile) */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {/* Changer les IDs pour éviter les collisions */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="menuAmerique" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Amérique
                </a>
                <ul className="dropdown-menu" aria-labelledby="menuAmerique">
                  <li><a className="dropdown-item" href="#">New-york</a></li>
                  <li><a className="dropdown-item" href="#">Montreal</a></li>
                  <li><a className="dropdown-item" href="#">Rio</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="menuEurope" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Europe
                </a>
                <ul className="dropdown-menu" aria-labelledby="menuEurope">
                  <li><a className="dropdown-item" href="#">Paris</a></li>
                  <li><a className="dropdown-item" href="#">Rome</a></li>
                  <li><a className="dropdown-item" href="#">Madrid</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="menuAsie" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Asie
                </a>
                <ul className="dropdown-menu" aria-labelledby="menuAsie">
                  <li><a className="dropdown-item" href="#">Beijing</a></li>
                  <li><a className="dropdown-item" href="#">Seoul</a></li>
                  <li><a className="dropdown-item" href="fiche-Tokyo.html">Tokyo</a></li>
                </ul>
              </li>
            </ul>

            <form className="d-flex">
              <Link to="/search" className="btn btn-success me-2" role="button">Rechercher</Link>
              <Link to="/login" className="btn btn-primary me-2" role="button">Se connecter</Link>
              <Link to="/param" className="btn btn-danger" role="button">Param</Link>
            </form>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
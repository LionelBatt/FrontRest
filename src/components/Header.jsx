import { Link, useNavigate } from "react-router-dom";
import { Globe, ShoppingCart } from 'lucide-react';
import { useState, useEffect } from 'react';
import CartService from '../services/CartService';
import '../styles/glassmorphism.css';

const Header = ({ onMenuClick, onMenuMouseEnter, onMenuMouseLeave }) => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [cartSummary, setCartSummary] = useState(null);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      setIsLoggedIn(!!token);
    };

    const updateCartCount = () => {
      setCartItemCount(CartService.getCartItemCount());
      setCartSummary(CartService.getCartSummary());
    };

    checkLoginStatus();
    updateCartCount();

    const handleLoginChange = () => {
      checkLoginStatus();
    };

    const handleCartUpdate = () => {
      updateCartCount();
    };

    window.addEventListener('loginStatusChanged', handleLoginChange);
    window.addEventListener('storage', handleLoginChange);
    window.addEventListener('cartUpdated', handleCartUpdate);

    return () => {
      window.removeEventListener('loginStatusChanged', handleLoginChange);
      window.removeEventListener('storage', handleLoginChange);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    
    if (token) {
      fetch("http://localhost:8080/travel/auth/signout", {
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
        
        window.dispatchEvent(new Event('loginStatusChanged'));
        
        window.location.href = "/";
      });
    }
  };

  const handleCartClick = () => {
    console.log('Clic sur le panier - isLoggedIn:', isLoggedIn);
    
    if (!isLoggedIn) {
      console.log('Utilisateur non connecté - Affichage modal');
      setShowCartModal(true);
      return;
    }

    console.log('Redirection vers /cart');
    // Toujours rediriger vers le panier, même s'il est vide
    // L'utilisateur peut vouloir voir l'état de son panier
    navigate('/cart');
  };

  const handleCloseCartModal = () => {
    setShowCartModal(false);
  };

  const handleLoginRedirect = () => {
    setShowCartModal(false);
    navigate('/login');
  };

  const handleClearCart = () => {
    CartService.clearCart();
    console.log('Panier vidé');
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
            <form className="d-flex ms-auto gap-2 align-items-center">
              {/* Icône panier avec pastille et menu déroulant */}
              <div className="dropdown">
                <button
                  className="btn glass-btn glass-border-radius-lg d-flex align-items-center justify-content-center position-relative"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  style={{
                    padding: '0.6rem',
                    fontSize: '1.2rem',
                    color: 'black',
                  }}
                  title="Panier"
                >
                  <ShoppingCart size={20} />
                  {cartItemCount > 0 && (
                    <span
                      className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                      style={{
                        fontSize: '0.7rem',
                        padding: '0.2rem 0.4rem',
                        marginLeft: '-0.5rem',
                        marginTop: '-0.2rem'
                      }}
                    >
                      {cartItemCount}
                    </span>
                  )}
                </button>
                
                <ul className="dropdown-menu dropdown-menu-end" style={{ minWidth: '250px' }}>
                  {cartItemCount > 0 ? (
                    <>
                      <li>
                        <h6 className="dropdown-header">
                          <i className="fas fa-shopping-cart me-2"></i>
                          Votre panier ({cartItemCount} article{cartItemCount > 1 ? 's' : ''})
                        </h6>
                      </li>
                      {cartSummary && (
                        <li>
                          <div className="dropdown-item-text">
                            <small className="text-muted">Destination:</small><br />
                            <strong>{cartSummary.destination}</strong><br />
                            <small className="text-muted">
                              {cartSummary.optionsCount} option{cartSummary.optionsCount > 1 ? 's' : ''} • {cartSummary.totalPrice}€
                            </small>
                          </div>
                        </li>
                      )}
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <button 
                          className="dropdown-item"
                          onClick={handleCartClick}
                        >
                          <i className="fas fa-eye me-2"></i>
                          Voir le panier
                        </button>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item text-danger"
                          onClick={handleClearCart}
                        >
                          <i className="fas fa-trash me-2"></i>
                          Vider le panier
                        </button>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <h6 className="dropdown-header">
                          <i className="fas fa-shopping-cart me-2"></i>
                          Panier vide
                        </h6>
                      </li>
                      <li><hr className="dropdown-divider" /></li>
                      <li>
                        <span className="dropdown-item-text text-muted">
                          <i className="fas fa-info-circle me-2"></i>
                          Aucun article dans le panier
                        </span>
                      </li>
                      <li>
                        <button 
                          className="dropdown-item"
                          onClick={() => navigate('/')}
                        >
                          <i className="fas fa-search me-2"></i>
                          Découvrir nos voyages
                        </button>
                      </li>
                    </>
                  )}
                </ul>
              </div>

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
                <>
                  <Link 
                    to="/account" 
                    className="btn glass-btn-info glass-border-radius-lg glass-text-white" 
                    role="button"
                    style={{
                      fontWeight: '500',
                      padding: '0.5rem 1rem',
                      textDecoration: 'none',
                    }}
                  >
                    Mon compte
                  </Link>
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
                </>
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

      {/* Modal de connexion pour panier */}
      {showCartModal && (
        <div className="modal show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  <ShoppingCart className="me-2" size={20} />
                  Connexion requise
                </h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={handleCloseCartModal}
                ></button>
              </div>
              <div className="modal-body text-center">
                <div className="mb-3">
                  <i className="fas fa-lock fa-3x text-primary mb-3"></i>
                  <h6>Vous devez être connecté pour accéder à votre panier</h6>
                  <p className="text-muted">
                    Connectez-vous pour finaliser votre réservation et accéder à toutes nos fonctionnalités.
                  </p>
                </div>
                {CartService.hasCart() && (
                  <div className="alert alert-info">
                    <i className="fas fa-info-circle me-2"></i>
                    Vous avez des articles dans votre panier. Connectez-vous pour les retrouver !
                  </div>
                )}
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCloseCartModal}
                >
                  Annuler
                </button>
                <button 
                  type="button" 
                  className="btn btn-primary" 
                  onClick={handleLoginRedirect}
                >
                  Se connecter
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
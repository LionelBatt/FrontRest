import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/glassmorphism.css';

const NotFound = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="container-fluid min-vh-100 d-flex align-items-center justify-content-center" 
             style={{
                 position: 'relative',
                 overflow: 'hidden'
             }}>
            
            <div className="error-container glass-base" style={{
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '20px',
                padding: '3rem',
                textAlign: 'center',
                maxWidth: '600px',
                width: '90%',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                position: 'relative',
                zIndex: 2
            }}>
                
                {/* Glassmorphism decoration */}
                <div style={{
                    position: 'absolute',
                    top: '-20px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '80px',
                    height: '4px',
                    background: 'linear-gradient(90deg, var(--bs-primary), var(--bs-info))',
                    borderRadius: '2px',
                    opacity: '0.8'
                }}></div>

                <div className="error-title" style={{
                    fontSize: '8rem',
                    fontWeight: '900',
                    color: 'black',
                    marginBottom: '1rem',
                    lineHeight: '1'
                }}>
                    404
                </div>

                <div className="error-message" style={{
                    fontSize: '1.5rem',
                    color: 'black',
                    marginBottom: '2rem',
                    fontWeight: '300'
                }}>
                    Oops! La page que vous cherchez n'existe pas.
                </div>

                <div className="error-description" style={{
                    fontSize: '1rem',
                    color: 'black',
                    marginBottom: '2.5rem',
                    lineHeight: '1.6'
                }}>
                    Il semble que vous vous soyez perdu dans l'espace numérique. 
                    Ne vous inquiétez pas, nous allons vous ramener en sécurité !
                </div>

                <div className="error-actions d-flex flex-column flex-md-row gap-3 justify-content-center">
                    <button 
                        onClick={handleGoHome}
                        className="btn glass-btn-primary px-4 py-2"
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            borderRadius: '12px',
                            minWidth: '180px'
                        }}
                    >
                        <i className="fas fa-home me-2"></i>
                        Retour à l'accueil
                    </button>

                    <button 
                        onClick={handleGoBack}
                        className="btn glass-btn-info px-4 py-2"
                        style={{
                            fontSize: '1.1rem',
                            fontWeight: '500',
                            borderRadius: '12px',
                            minWidth: '180px'
                        }}
                    >
                        <i className="fas fa-arrow-left me-2"></i>
                        Page précédente
                    </button>
                </div>

                {/* Additional glass decoration */}
                <div className="mt-4">
                    <div className="glass-divider"></div>
                    <p style={{
                        color: 'rgba(0, 0, 0, 0.6)',
                        fontSize: '0.9rem',
                        margin: '1rem 0 0 0'
                    }}>
                        Code d'erreur: 404 | Page introuvable
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFound;

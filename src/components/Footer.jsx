
import React from 'react';
import { ArrowUp, Heart, Mail, Phone, MapPin, Globe, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import '../styles/glassmorphism.css';

function Footer() {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    const currentYear = new Date().getFullYear();

    return (
        <footer className="glass-footer mt-5">
            <div className="container">
                {/* Section principale du footer */}
                <div className="row py-5">
                    {/* Colonne 1: À propos */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="glass-footer-section">
                            <h5 className="glass-footer-title d-flex align-items-center gap-2 mb-3">
                                <Globe size={24} className="text-primary" />
                                Agence de Voyage ✈
                            </h5>
                            <p className="glass-footer-text mb-3">
                                Découvrez le monde avec nous. Nous créons des expériences de voyage 
                                inoubliables à travers tous les continents, avec un service personnalisé 
                                et des destinations authentiques.
                            </p>
                            <div className="d-flex gap-3">
                                <button className="glass-social-btn" title="Facebook">
                                    <Facebook size={18} />
                                </button>
                                <button className="glass-social-btn" title="Twitter">
                                    <Twitter size={18} />
                                </button>
                                <button className="glass-social-btn" title="Instagram">
                                    <Instagram size={18} />
                                </button>
                                <button className="glass-social-btn" title="LinkedIn">
                                    <Linkedin size={18} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Colonne 2: Liens rapides */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <div className="glass-footer-section">
                            <h6 className="glass-footer-subtitle mb-3">Navigation</h6>
                            <ul className="glass-footer-links">
                                <li><a href="/" className="glass-footer-link">Accueil</a></li>
                                <li><a href="/search" className="glass-footer-link">Rechercher</a></li>
                                <li><a href="/trip/1" className="glass-footer-link">Démonstration</a></li>
                                <li><a href="/account" className="glass-footer-link">Mon Compte</a></li>
                                <li><a href="/login" className="glass-footer-link">Connexion</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Colonne 3: Destinations populaires */}
                    <div className="col-lg-2 col-md-6 mb-4">
                        <div className="glass-footer-section">
                            <h6 className="glass-footer-subtitle mb-3">Destinations</h6>
                            <ul className="glass-footer-links">
                                <li><a href="/search?continent=EUROPE" className="glass-footer-link">Europe</a></li>
                                <li><a href="/search?continent=ASIE" className="glass-footer-link">Asie</a></li>
                                <li><a href="/search?continent=AFRIQUE" className="glass-footer-link">Afrique</a></li>
                                <li><a href="/search?continent=AMERIQUE_DU_NORD" className="glass-footer-link">Amérique du Nord</a></li>
                                <li><a href="/search?continent=OCEANIE" className="glass-footer-link">Océanie</a></li>
                            </ul>
                        </div>
                    </div>

                    {/* Colonne 4: Contact */}
                    <div className="col-lg-4 col-md-6 mb-4">
                        <div className="glass-footer-section">
                            <h6 className="glass-footer-subtitle mb-3">Contact</h6>
                            <div className="glass-contact-info">
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <MapPin size={16} className="text-info flex-shrink-0" />
                                    <span className="glass-footer-text small">
                                        123 Avenue des Voyages, 75001 Paris, France
                                    </span>
                                </div>
                                <div className="d-flex align-items-center gap-2 mb-2">
                                    <Phone size={16} className="text-success flex-shrink-0" />
                                    <a href="tel:+33123456789" className="glass-footer-link small">
                                        +33 1 23 45 67 89
                                    </a>
                                </div>
                                <div className="d-flex align-items-center gap-2 mb-3">
                                    <Mail size={16} className="text-warning flex-shrink-0" />
                                    <a href="mailto:contact@agence-voyage.fr" className="glass-footer-link small">
                                        contact@agence-voyage.fr
                                    </a>
                                </div>
                                
                                {/* Newsletter */}
                                <div className="glass-newsletter mt-3">
                                    <h6 className="glass-footer-subtitle mb-2">Newsletter</h6>
                                    <div className="d-flex gap-2">
                                        <input 
                                            type="email" 
                                            placeholder="Votre email" 
                                            className="form-control glass-input flex-1"
                                            style={{ fontSize: '0.875rem' }}
                                        />
                                        <button className="btn glass-btn-primary glass-border-radius px-3">
                                            <Mail size={16} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Séparateur avec effet glassmorphism */}
                <div className="glass-divider"></div>

                {/* Section copyright */}
                <div className="row py-4 align-items-center">
                    <div className="col-md-8">
                        <div className="d-flex flex-wrap align-items-center gap-4">
                            <p className="glass-footer-text mb-0 d-flex align-items-center gap-1">
                                &copy; {currentYear} Agence de Voyage 
                                <Heart size={16} className="text-danger mx-1" />
                                Fait avec passion
                            </p>
                            <div className="d-flex gap-3">
                                <a href="/privacy" className="glass-footer-link small">Confidentialité</a>
                                <span className="glass-footer-text small">•</span>
                                <a href="/terms" className="glass-footer-link small">Conditions d'utilisation</a>
                                <span className="glass-footer-text small">•</span>
                                <a href="/cookies" className="glass-footer-link small">Cookies</a>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4 text-md-end">
                        <button 
                            onClick={scrollToTop}
                            className="glass-scroll-top-btn d-inline-flex align-items-center gap-2"
                            title="Remonter en haut"
                        >
                            <ArrowUp size={16} />
                            <span className="d-none d-sm-inline">Remonter</span>
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
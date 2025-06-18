import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import '../styles/glassmorphism.css';

const HeaderAdmin = ({ onMenuClick, onMenuMouseEnter, onMenuMouseLeave }) => {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const location = useLocation();
    const currentPath = location.pathname;



    useEffect(() => {
        const checkLoginStatus = () => {
            const token = localStorage.getItem("token");
            setIsLoggedIn(!!token);
        };

        checkLoginStatus();

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

                    window.location.href = "/admin-login";
                });
        }
    };

    const navItems = [
        { label: "Voyages", path: "/admin/crudT" },
        { label: "Commandes", path: "/admin/crudO" },
        { label: "Utilisateurs", path: "/admin/crudU" },
    ];

    return (
        <header>
            <nav className="navbar navbar-expand-md fixed-top" style={{
                backdropFilter: "blur(10px)",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                padding: "0.5rem 1rem",
                boxShadow: "0 2px 10px rgba(0,0,0,0.2)"
            }}>
                <div className="container-fluid d-flex justify-content-between align-items-center">

                    {/* Liens au centre */}
                    <div className="mx-auto d-flex gap-3">
                        {navItems.map(({ label, path }) => (
                            <Link
                                key={path}
                                to={path}
                                className={`btn ${currentPath === path ? "btn-light" : "btn-outline-light"
                                    } rounded-pill fw-semibold px-4 py-2`}
                            >
                                {label}
                            </Link>
                        ))}
                    </div>

                    {/* Bouton Logout à droite */}
                    <div className="ms-auto">
                        <button
                            onClick={handleLogout}
                            className="btn btn-danger rounded-pill fw-semibold px-4 py-2"
                            style={{
                                backgroundColor: "rgba(220, 53, 69, 0.85)",
                                border: "none",
                                transition: "background-color 0.3s ease",
                            }}
                            onMouseOver={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(220, 53, 69, 1)")
                            }
                            onMouseOut={(e) =>
                                (e.currentTarget.style.backgroundColor = "rgba(220, 53, 69, 0.85)")
                            }
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default HeaderAdmin;
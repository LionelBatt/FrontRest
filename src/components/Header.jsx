import { Link } from "react-router-dom";


function Header() {

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand" >
                        Agence de Voyage ✈
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarCollapse">
                        <ul className="navbar-nav me-auto mb-2 mb-md-0">
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Amerique
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">New-york</a></li>
                                    <li><a className="dropdown-item" href="#">Montreal</a></li>
                                    <li><a className="dropdown-item" href="#">Rio</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Europe
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Paris</a></li>
                                    <li><a className="dropdown-item" href="#">Rome</a></li>
                                    <li><a className="dropdown-item" href="#">Madrid</a></li>
                                </ul>
                            </li>
                            <li className="nav-item dropdown">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Asie
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a className="dropdown-item" href="#">Beijing</a></li>
                                    <li><a className="dropdown-item" href="#">Seoul</a></li>
                                    <li><a className="dropdown-item" href="fiche-Tokyo.html">Tokyo</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex">
                            <Link to="/search" className="btn btn-success me-2" role="button">
                                Rechercher
                            </Link>
                            <Link to="/login" className="btn btn-primary me-2" role="button">
                                Se connecter
                            </Link>
                            <Link to="/param" className="btn btn-danger" role="button">
                                Param
                            </Link>
                        </form>
                    </div>
                </div>
            </nav>

        </header>
    )
}

export default Header;
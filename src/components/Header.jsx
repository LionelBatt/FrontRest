import { Link } from "react-router-dom";


function Header() {

    return (
        <header>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
                <div class="container-fluid">
                    <Link to="/" className="navbar-brand" >
                        Agence de Voyage ✈
                    </Link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav me-auto mb-2 mb-md-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Amerique
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">New-york</a></li>
                                    <li><a class="dropdown-item" href="#">Montreal</a></li>
                                    <li><a class="dropdown-item" href="#">Rio</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Europe
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Paris</a></li>
                                    <li><a class="dropdown-item" href="#">Rome</a></li>
                                    <li><a class="dropdown-item" href="#">Madrid</a></li>
                                </ul>
                            </li>
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Asie
                                </a>
                                <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><a class="dropdown-item" href="#">Beijing</a></li>
                                    <li><a class="dropdown-item" href="#">Seoul</a></li>
                                    <li><a class="dropdown-item" href="fiche-Tokyo.html">Tokyo</a></li>
                                </ul>
                            </li>
                        </ul>
                        <form class="d-flex">
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
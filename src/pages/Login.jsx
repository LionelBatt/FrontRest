import { useState } from "react";
import Home from "../pages/Home";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [inputs, setInputs] = useState({});
    const [user, setUser] = useState();
    const navigate = useNavigate();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        fetch("http://localhost:8080/travel/auth/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username: inputs.login,
                password: inputs.pwd
            })
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Stockage du token
                    localStorage.setItem("token", data.data);

                    console.log("Connexion réussie :", data);
                } else {
                    alert("Erreur de connexion : " + data.message || data.error);
                }
            })
            .catch(err => console.error("Erreur lors de la connexion :", err));

        // Envoyer les info user vers la page Home
        navigate(`/home}`);
    }
    return (
        <div className="container mt-3" style={{ textAlign: "center" }}>
            <br />
            <br />
            <br />
            <div className="mx-auto" style={{ maxWidth: "400px" }}>
                <h2>Identifiez-vous</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3 mt-3">
                        <label for="login">Login:</label>
                        <input
                            type="text"
                            className="form-control w-100"
                            id="login"
                            placeholder="Enter login"
                            name="login"
                            size="1"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label for="pwd">Password:</label>
                        <input
                            type="password"
                            className="form-control w-100"
                            id="pwd"
                            placeholder="Enter password"
                            name="pwd"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Link to="/resetpwd" >
                            Mots de passe oublié ?
                        </Link>
                    </div>
                    <br />
                    <div className="form-check">

                        <input
                            className="form-check-input"
                            type="checkbox"
                            name="remember"
                            onChange={handleChange}
                        />
                        <label className="form-check-label">Remember me
                        </label>
                    </div>
                    <br />
                    <button type="submit" className="btn btn-primary">Connexion</button>
                </form>

                <br />

                <div>
                    <Link to="/createacc" >
                        Pas de compte ? Inscrivez-vous
                    </Link>
                </div>
            </div>
        </div>

    )
}


export default Login;
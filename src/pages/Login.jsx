import { useState } from "react";
import Home from "../components/Home";


const Login = () => {
    const [inputs, setInputs] = useState({});
    const [user, setUser] = useState();
    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({ ...values, [name]: value }))
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(inputs);

        // fetch("http://localhost:8080/travel/login", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json"
        //     },
        //     body: JSON.stringify({
        //         username: inputs.login,
        //         password: inputs.pwd
        //     })
        // })
            // .then(res => res.json())
            // .then(data => {
            //     if (data.success) {
            //         // Stockage du token
            //         localStorage.setItem("token", data.token);

            //         // Stocke l'utilisateur (ex: dans un state global, context, etc.)
            //         setUser(data.data);

            //         console.log("Connexion réussie :", data);
            //     } else {
            //         alert("Erreur de connexion : " + data.message || data.error);
            //     }
            // })
            // .catch(err => console.error("Erreur lors de la connexion :", err));
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
        <>
            <Home />
        </>
    }
    return (
        <div class="container mt-3" style="center">
            <br />
            <br />
            <br />
            <div class="mx-auto" style="max-width: 400px;">
                <h2>Identifiez-vous</h2>
                <form onSubmit={handleSubmit}>
                    <div class="mb-3 mt-3">
                        <label for="login">Login:</label>
                        <input
                            type="text"
                            class="form-control w-100"
                            id="login"
                            placeholder="Enter login"
                            name="login"
                            size="1"
                            onChange={handleChange}
                        />
                    </div>
                    <div class="mb-3">
                        <label for="pwd">Password:</label>
                        <input
                            type="password"
                            class="form-control w-100"
                            id="pwd"
                            placeholder="Enter password"
                            name="pswd"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <Link to="/resetpwd" >
                            Mots de passe oublié ?
                        </Link>
                    </div>
                    <br />
                    <div class="form-check mb-3">
                        <label class="form-check-label">
                            <input
                                class="form-check-input"
                                type="checkbox"
                                name="remember"
                                onChange={handleChange}
                            > Remember me</input>
                        </label>
                    </div>
                    <br />
                    <button type="submit" class="btn btn-primary">Connexion</button>
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
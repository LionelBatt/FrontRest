

const SetPwd = () => {


    return (
        <div className="container mt-3">
            <div className="mx-auto" style={{maxwidth: "600px"}}>
                <br></br> <br></br> <br></br>
                <h2>Définir votre nouveau mots de passe</h2>
                <form action="index.html">
                    <div className="mb-3">
                        <label for="pwd1">Saisissez votre nouveau mots de passe:</label> <input
                            type="password" className="form-control" id="pwd1"
                            placeholder="Enter password" name="pswd1"></input>
                    </div>
                    <div className="mb-3">
                        <label for="pwd2">Confirmez votre nouveau mots de passe:</label> <input
                            type="password" className="form-control" id="pwd2"
                            placeholder="Confirm password" name="pswd2"></input>
                    </div>
                    <a href="index.html" className="btn btn-primary">Continuer</a>
                </form>
            </div>
        </div>

    )
}

export default SetPwd;


const ResetPwd = () => {


    return (
        <div className="container mt-3">
            <div className="mx-auto" style={{maxwidth: "600px"}}>
                <br></br>
                <br></br>
                <br></br>
                <h2>Retrouver votre compte</h2>
                <form action="/home.html">
                    <div className="mb-3 mt-3">
                        <label for="email">Saisissez votre email.</label>
                        <input type="email" className="form-control w-100" id="email" placeholder="Enter email" name="email">
                            Nous vous enverrons un code par email pour confirmer votre identit�.</input>
                    </div>
                    <a href="code_check.html" className="btn btn-primary">Continuer</a>
                </form>
            </div>
        </div>
    )
}

export default ResetPwd;
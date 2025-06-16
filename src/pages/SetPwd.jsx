

const SetPwd = () => {


    return (
        <div class="container mt-3">
            <div class="mx-auto" style="max-width: 600px;">
                <br></br> <br></br> <br></br>
                <h2>D�finir votre nouveau mots de passe</h2>
                <form action="index.html">
                    <div class="mb-3">
                        <label for="pwd1">Saisissez votre nouveau mots de passe:</label> <input
                            type="password" class="form-control" id="pwd1"
                            placeholder="Enter password" name="pswd1"></input>
                    </div>
                    <div class="mb-3">
                        <label for="pwd2">Confirmez votre nouveau mots de passe:</label> <input
                            type="password" class="form-control" id="pwd2"
                            placeholder="Confirm password" name="pswd2"></input>
                    </div>
                    <a href="index.html" class="btn btn-primary">Continuer</a>
                </form>
            </div>
        </div>

    )
}

export default SetPwd;
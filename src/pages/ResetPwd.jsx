

const ResetPwd = () => {


    return (
        <div class="container mt-3">
            <div class="mx-auto" style="max-width: 600px;">
                <br></br>
                <br></br>
                <br></br>
                <h2>Retrouver votre compte</h2>
                <form action="/home.html">
                    <div class="mb-3 mt-3">
                        <label for="email">Saisissez votre email.</label>
                        <input type="email" class="form-control w-100" id="email" placeholder="Enter email" name="email">
                            Nous vous enverrons un code par email pour confirmer votre identit�.</input>
                    </div>
                    <a href="code_check.html" class="btn btn-primary">Continuer</a>
                </form>
            </div>
        </div>
    )
}

export default ResetPwd;
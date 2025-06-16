


const VerifCode = () => {


    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <div className="container mt-3">
                <div className="mx-auto" style={{maxwidth: "600px"}}>
                    <br></br> <br></br> <br></br>
                    <h2>Saisisez le code re�u par email</h2>
                    <form action="/home.html">
                        <div className="mb-3 mt-3">
                            <label for="code">Code � 6 chiffres.</label> <input type="number"
                                className="form-control" id="code" placeholder="Enter code"
                                name="code"></input>
                        </div>
                        <a href="set_pwd.html" className="btn btn-primary">Continuer</a>
                    </form>
                </div>
            </div>
        </>
    )
}

export default VerifCode;
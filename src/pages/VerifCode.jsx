import { useNavigate } from "react-router-dom";


const VerifCode = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        navigate(`/resetpwd`);
    }

    return (
        <>
            <div className="container d-flex flex-column justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <h2 className="text-center mb-4">Saisisez le code reçu par email</h2>
                <div className="d-flex justify-content-center align-items-center"></div>
                <div className="border rounded p-4 shadow d-flex flex-column align-items-center" style={{ maxWidth: "400px", width: "100%" }}>
                    <form onSubmit={handleSubmit} className="w-100 d-flex flex-column align-items-center">
                        <div className="mb-3 w-100 text-center">
                            <label htmlFor="code" className="form-label">Code à 6 chiffres.</label>
                            <input
                                type="number"
                                className="form-control text-center"
                                id="code"
                                placeholder="Enter code"
                                name="code"
                                style={{ maxWidth: "200px", margin: "0 auto" }}
                            />
                        </div>
                            <div className="d-grid mb-3 w-25 ">
                                <button type="submit" className="btn btn-primary">Continuer</button>
                            </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default VerifCode;
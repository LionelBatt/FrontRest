import { useNavigate } from "react-router-dom";


const ResetPwd = () => {
    const navigate = useNavigate();
    const handleSubmit = (event) => {
        navigate(`/verification`);
    }

    return (
        <div className="container mt-4 d-flex align-items-center">
            <div className="mx-auto w-50">
                <br></br>
                <br></br>
                <br></br>
                <h2>Retrouver votre compte</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 mt-4">
                        <label for="email">Saisissez votre email.</label>
                        <input
                            type="email"
                            className="form-control w-100"
                            id="email"
                            placeholder="Enter email"
                            name="email"
                        />
                        <small className="form-text text-muted">
                        Nous vous enverrons un code par email pour confirmer votre identité.
                        </small>
                    </div>
                    <div className="d-flex justify-content-center">
                        <div className="d-grid mb-3 w-25 ">
                            <button type="submit" className="btn btn-primary">Continuer</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ResetPwd;
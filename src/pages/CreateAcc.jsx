

const CreateAcc = () => {

    return (
        <>
            <br></br>
            <br></br>
            <br></br>
            <div class="container mt-4">
                <div class="mx-auto" style="max-width: 600px;">
                    <h1>Création du compte</h1>
                    <h2>Veuillez saisir vos informations personnelles.</h2>
                    <p></p>
                    <div>
                        <input type="radio" id="Mr" name="label" value="Mr"></input> <label
                            for="Mr">Mr.</label> <input type="radio" id="Mme" name="label"
                                value="Mme"></input> <label for="Mme">Mme.</label> <input
                                    type="radio" id="Mlle" name="label" value="Mlle"></input> <label
                                        for="Mlle">Mlle.</label>
                    </div>
                    <br></br>
                    <div class="mb-3">
                        <label for="login">Login:</label> <input type="text"
                            class="form-control" id="login" placeholder="Enter login"
                            name="login"></input>
                    </div>
                    <div class="mb-3">
                        <label for="pwd">Password:</label> <input type="password"
                            class="form-control" id="pwd" placeholder="Enter password"
                            name="pswd"></input>
                    </div>
                    <div class="mb-3">
                        <label for="nom">Nom:</label> <input type="text"
                            class="form-control" id="nom" placeholder="Enter name" name="nom"></input>
                    </div>
                    <div class="mb-3">
                        <label for="prenom">Prenom:</label> <input type="text"
                            class="form-control" id="prenom" placeholder="Enter surname"
                            name="prenom"></input>
                    </div>
                    <label class="form-label">Date de naissance :</label>
                    <div class="d-flex gap-2">

                        {/* <!-- Jour --> */}
                        <select class="form-select w-auto" title="Jour de naissance">
                            <option selected disabled>Jour</option>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                            <option>6</option>
                            <option>7</option>
                            <option>8</option>
                            <option>9</option>
                            <option>10</option>
                            <option>11</option>
                            <option>12</option>
                            <option>13</option>
                            <option>14</option>
                            <option>15</option>
                            <option>16</option>
                            <option>17</option>
                            <option>18</option>
                            <option>19</option>
                            <option>20</option>
                            <option>21</option>
                            <option>22</option>
                            <option>23</option>
                            <option>24</option>
                            <option>25</option>
                            <option>26</option>
                            <option>27</option>
                            <option>28</option>
                            <option>29</option>
                            <option>30</option>
                            <option>31</option>
                        </select>

                        {/* <!-- Mois --> */}
                        <select class="form-select w-auto" title="Année de naissance">
                            <option selected disabled>Mois</option>
                            <option>Janvier</option>
                            <option>Février</option>
                            <option>Mars</option>
                            <option>Avril</option>
                            <option>Mai</option>
                            <option>Juin</option>
                            <option>Juillet</option>
                            <option>Août</option>
                            <option>Septembre</option>
                            <option>Octobre</option>
                            <option>Novembre</option>
                            <option>Décembre</option>
                        </select>

                        {/* <!-- Ann�e --> */}
                        <select class="form-select w-auto" title="Année de naissance">
                            <option selected disabled>Année</option>
                            <option>1980</option>
                            <option>1981</option>
                            <option>1982</option>
                            <option>1983</option>
                            <option>1984</option>
                            <option>1985</option>
                            <option>1986</option>
                            <option>1987</option>
                            <option>1988</option>
                            <option>1989</option>
                            <option>1990</option>
                            <option>1991</option>
                            <option>1992</option>
                            <option>1993</option>
                            <option>1994</option>
                            <option>1995</option>
                            <option>1996</option>
                            <option>1997</option>
                            <option>1998</option>
                            <option>1999</option>
                            <option>2000</option>
                            <option>2001</option>
                            <option>2002</option>
                            <option>2003</option>
                            <option>2004</option>
                            <option>2005</option>
                        </select>

                    </div>
                    <div class="mb-3">
                        <label for="tel">Numéro de téléphone:</label> <input type="tel"
                            class="form-control" id="tel" placeholder="Enter phone number"
                            name="tel"></input>
                    </div>
                    <div class="mb-3">
                        <label for="email">Email:</label> <input type="email"
                            class="form-control" id="email" placeholder="Enter email"
                            name="email"></input>
                    </div>
                    <div class="form-check mb-3">
                        <label class="form-check-label"> <input
                            class="form-check-input" type="checkbox" name="newsletter"></input>
                            Me tenir au courant des dernières offres grâce à la Newsletter.
                        </label>
                    </div>
                    <br></br> <a href="index.html" class="btn btn-primary">Insciption</a>
                    <hr></hr>
                </div>
            </div>
        </>

    )
}

export default CreateAcc;
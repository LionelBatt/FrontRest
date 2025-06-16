

const ResearchResult = () => {
    const location = useLocation();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const [selectedContinent, setSelectedContinent] = useState(params.get("continent"));
        const [selectedCountry, setSelectedCountry] = useState(params.get("country"));
        const [selectedCity, setSelectedCity] = useState(params.get("city"));
        const [selectedMinPrice, setSelectedMinPrice] = useState(params.get("minprice"));
        const [selectedMaxPrice, setSelectedMaxPrice] = useState(params.get("maxprice"));
        const [selectedOpt1, setSelectedOpt1] = useState(params.get("opt1"));
        const [selectedOpt2, setSelectedOpt2] = useState(params.get("opt2"));
        const [selectedOpt3, setSelectedOpt3] = useState(params.get("opt3"));
        const [minimumDuration, setMinimumDuration] = useState(params.get("mindur"));
        const [maximumDuration, setMaximumDuration] = useState(params.get("maxdur"));

        let apiUrl = `http://localhost:8080/travel/search/`;

        if (selectedContinent) apiUrl += `${selectedContinent}/`;
        if (selectedCountry) apiUrl += `${selectedCountry}/`;
        if (selectedCity) apiUrl += `${selectedCity}/`;
        if (minimumDuration) apiUrl += `${minimumDuration}/`;
        if (maximumDuration) apiUrl += `${maximumDuration}/`;
        if (selectedOpt1) apiUrl += `${selectedOpt1}/`;
        if (selectedOpt2) apiUrl += `${selectedOpt2}/`;
        if (selectedOpt3) apiUrl += `${selectedOpt3}/`;
        if (selectedMinPrice) apiUrl += `${selectedMinPrice}/`;
        if (selectedMaxPrice) apiUrl += `${selectedMaxPrice}/`;

        // Enlève le dernier /
        apiUrl = apiUrl.slice(0, -1);

        fetch(apiUrl)
            .then(res => res.json())
            .then(data => {
                setTrips(data.data || []);
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, [location.search]);

    if (loading) return <p>Chargement...</p>;
    if (!trips.length) return <p>Aucun résultat trouvé.</p>;
    return (
        <>
            <br />
            <br />
            <br />
            <div class="container">
                <h1 class="text-center mb-5 text-primary">Résultat de Recherche</h1>

                <ul>
                    {trips.map(trip => (
                        <li key={trip.id}>{trip.name}</li>
                    ))}
                </ul>

                {/* <!-- Tokyo --> */}
                <div class="row city-row align-items-center">
                    <div class="col-md-4">
                        <img
                            src="https://cdn.kimkim.com/files/a/images/6077051d16379eab327d03204d2c5d91cda44b25/original-c0d3cfb1770d1639002f327240fc2338.jpg"
                            class="city-img"
                            alt="Tokyo"
                        />
                    </div>
                    <div class="col-md-8">
                        <h4>
                            <a href="fiche-Tokyo.html">Tokyo</a>
                        </h4>
                        <p>Capitale du Japon, Tokyo est un centre vibrant de culture
                            moderne, de technologie et de tradition japonaise.</p>
                    </div>
                </div>
            </div>
            <br />
            <br />
            <br />
            <br />
        </>
    )
}

export default ResearchResult
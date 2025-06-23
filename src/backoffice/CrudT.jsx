import { useState, useEffect } from 'react';


const continents = [
    "EUROPE", "ASIE", "AMERIQUE_DU_NORD", "AMERIQUE_DU_SUD", "AFRIQUE", "OCEANIE"
];


const countries = [
    "FRANCE", "ITALY", "SPAIN", "GREECE", "PORTUGAL", "UNITED_KINGDOM",
    "NETHERLANDS", "GERMANY", "JAPAN", "THAILAND", "INDIA", "CHINA",
    "VIETNAM", "SOUTH_KOREA", "SINGAPORE", "USA", "CANADA", "BRAZIL",
    "ARGENTINA", "PERU", "CHILE", "MOROCCO", "EGYPT", "SOUTH_AFRICA",
    "KENYA", "TUNISIA", "AUSTRALIA", "NEW_ZEALAND", "FIJI"
];

const cities = [
    "PARIS", "LYON", "MARSEILLE", "STRASBOURG", "LISBON", "ROME",
    "BARCELONA", "MADRID", "VALENCE", "SANTORINI", "LONDON",
    "AMSTERDAM", "BERLIN", "TOKYO", "BANGKOK", "DELHI", "BEIJING",
    "HANOI", "SEOUL", "SINGAPORE", "NEW_YORK", "LOS_ANGELES",
    "MONTREAL", "VANCOUVER", "RIO_DE_JANEIRO", "BUENOS_AIRES",
    "CUSCO", "SANTIAGO", "MARRAKECH", "TUNIS", "CAIRO", "NAIROBI",
    "CAPE_TOWN", "SYDNEY", "AUCKLAND", "SUVA"
];

function CrudT() {
    const [trips, setTrips] = useState([]);
    const [tripId, setTripId] = useState("");
    const [tripData, setTripData] = useState({
        destinationCountry: "",
        destinationContinent: "",
        destinationCity: "",
        minimumDuration: "",
        description: "",
        unitPrice: ""
    });

    const [token, setToken] = useState("");

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);


    const BASE_URL = "http://13.36.39.58:8080/travel/trips";

    const loadAll = async () => {
        try {
            const res = await fetch(BASE_URL);
            const data = await res.json();
            if (data.success) {
                setTrips(data.data);
                console.log("Success : ", data)
            }else console.error('Erreur 500:', data)
        } catch (e) {
            console.error('Erreur:', e);
        }
    };

    const create = async () => {
        const formData = new FormData();
        Object.entries(tripData).forEach(([key, val]) =>
            formData.append(key, val)
        );

        const res = await fetch(BASE_URL, {
            method: "POST",
            body: formData
        });

        const data = await res.json();
        if (data.success) {
            alert("Voyage créé avec succès !");
            setTripData({
                destinationCountry: "",
                destinationContinent: "",
                destinationCity: "",
                minimumDuration: "",
                description: "",
                unitPrice: ""
            });
            loadAll();
        } else {
            alert(data.message || "Erreur à la création.");
        }
    };

    const findById = async () => {
        const res = await fetch(`${BASE_URL}/${tripId}`);
        const data = await res.json();
        if (data.success) setTripData(data.data);
        else alert("Voyage introuvable");
    };

    const update = async () => {
        const res = await fetch(`${BASE_URL}/${tripId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
             },
            body: JSON.stringify(tripData)
        });
        const data = await res.json();
        if (data.success) {
            alert("Mise à jour réussie !");
            loadAll();
        } else {
            alert("Erreur lors de la mise à jour");
        }
    };

    const remove = async () => {
        const res = await fetch(`${BASE_URL}/${tripId}`, {
            method: "DELETE",
            headers: {
                    'Authorization': `Bearer ${token}`
                }
        });
        const data = await res.json();
        alert(data.message || "Supprimé");
        loadAll();
    };

    useEffect(() => {
        if (token) {
            loadAll();
        }
    }, [token]);

    return (
        <><br /><br /><br /><br /><br />
            <div className="w-full flex justify-center px-4">
                <div className="w-full max-w-5xl bg-white rounded-2xl shadow-lg p-6">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                        Gestion des Voyages
                    </h2>
                    <br />
                    <div className="d-flex justify-content-center grid grid-cols-1 md:grid-cols-2 gap-1 mb-6">
                        <select
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={tripData.destinationCountry}
                            onChange={(e) =>
                                setTripData({ ...tripData, destinationCountry: e.target.value })
                            }
                        >
                            <option value="">-- Choisir un pays --</option>
                            {countries.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>

                        <select
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={tripData.destinationContinent}
                            onChange={(e) =>
                                setTripData({ ...tripData, destinationContinent: e.target.value })
                            }
                        >
                            <option value="">-- Choisir un continent --</option>
                            {continents.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>

                        <select
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={tripData.destinationCity}
                            onChange={(e) =>
                                setTripData({ ...tripData, destinationCity: e.target.value })
                            }
                        >
                            <option value="">-- Choisir une ville --</option>
                            {cities.map((c) => (
                                <option key={c}>{c}</option>
                            ))}
                        </select>

                        <input
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="number"
                            placeholder="Durée minimum (jours)"
                            value={tripData.minimumDuration}
                            onChange={(e) =>
                                setTripData({ ...tripData, minimumDuration: e.target.value })
                            }
                        />

                        <input
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Description"
                            value={tripData.description}
                            onChange={(e) =>
                                setTripData({ ...tripData, description: e.target.value })
                            }
                        />

                        <input
                            type="number"
                            placeholder="Prix unitaire (€)"
                            value={tripData.unitPrice}
                            onChange={(e) =>
                                setTripData({ ...tripData, unitPrice: e.target.value })
                            }
                        />

                        <input
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            type="text"
                            placeholder="ID pour rechercher / modifier / supprimer"
                            value={tripId}
                            onChange={(e) => setTripId(e.target.value)}
                        />
                    </div>
                    <br />
                    <div className="flex flex-wrap d-flex justify-content-center gap-4 mb-6">
                        <button
                            onClick={create}
                            className="bg-black hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200"
                        >
                            Créer
                        </button>
                        <button
                            onClick={findById}
                            className="bg-black hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200"
                        >
                            Chercher
                        </button>
                        <button
                            onClick={update}
                            className="bg-black hover:bg-gray-700 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200"
                        >
                            Mettre à jour
                        </button>
                        <button
                            onClick={remove}
                            className="bg-black hover:bg-red-800 text-white font-semibold px-5 py-2 rounded-lg shadow transition-all duration-200"
                        >
                            Supprimer
                        </button>
                    </div>
                    <br />
                    <div className="d-flex justify-content-center overflow-x-auto">
                        <table className="w-full border text-sm">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="border p-2">ID</th>
                                    <th className="border p-2">Ville</th>
                                    <th className="border p-2">Pays</th>
                                    <th className="border p-2">Continent</th>
                                    <th className="border p-2">Durée</th>
                                    <th className="border p-2">Prix</th>
                                    <th className="border p-2">Description</th>
                                </tr>
                            </thead>
                            <tbody>
                                {trips.map((t) => (
                                    <tr key={t.id}>
                                        <td className="border p-2">{t.id}</td>
                                        <td className="border p-2">{t.destinationCity}</td>
                                        <td className="border p-2">{t.destinationCountry}</td>
                                        <td className="border p-2">{t.destinationContinent}</td>
                                        <td className="border p-2">{t.minimumDuration}</td>
                                        <td className="border p-2">{t.unitPrice} €</td>
                                        <td className="border p-2">{t.description}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CrudT;
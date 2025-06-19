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

  const BASE_URL = "http://13.38.218.50:8080/travel/trips";

  const loadAll = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    if (data.success) setTrips(data.data);
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
      headers: { "Content-Type": "application/json" },
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
      method: "DELETE"
    });
    const data = await res.json();
    alert(data.message || "Supprimé");
    loadAll();
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">CRUD Voyages</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <select
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
          type="number"
          placeholder="Durée minimum (jours)"
          value={tripData.minimumDuration}
          onChange={(e) =>
            setTripData({ ...tripData, minimumDuration: e.target.value })
          }
        />

        <input
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
          type="text"
          placeholder="ID pour rechercher / modifier / supprimer"
          value={tripId}
          onChange={(e) => setTripId(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={create}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Créer
        </button>
        <button
          onClick={findById}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          FindById
        </button>
        <button
          onClick={update}
          className="bg-yellow-500 text-white px-4 py-1 rounded"
        >
          Update
        </button>
        <button
          onClick={remove}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Delete
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Liste des Voyages</h3>
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
  );
}

export default CrudT;

{/* import { useState, useEffect } from 'react';


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

  const BASE_URL = "http://13.38.218.50:8080/travel/trips";

  const loadAll = async () => {
    const res = await fetch(BASE_URL);
    const data = await res.json();
    if (data.success) setTrips(data.data);
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
      headers: { "Content-Type": "application/json" },
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
      method: "DELETE"
    });
    const data = await res.json();
    alert(data.message || "Supprimé");
    loadAll();
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">CRUD Voyages</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <select
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
          type="number"
          placeholder="Durée minimum (jours)"
          value={tripData.minimumDuration}
          onChange={(e) =>
            setTripData({ ...tripData, minimumDuration: e.target.value })
          }
        />

        <input
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
          type="text"
          placeholder="ID pour rechercher / modifier / supprimer"
          value={tripId}
          onChange={(e) => setTripId(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={create}
          className="bg-green-600 text-white px-4 py-1 rounded"
        >
          Créer
        </button>
        <button
          onClick={findById}
          className="bg-blue-600 text-white px-4 py-1 rounded"
        >
          FindById
        </button>
        <button
          onClick={update}
          className="bg-yellow-500 text-white px-4 py-1 rounded"
        >
          Update
        </button>
        <button
          onClick={remove}
          className="bg-red-600 text-white px-4 py-1 rounded"
        >
          Delete
        </button>
      </div>

      <h3 className="text-lg font-semibold mb-2">Liste des Voyages</h3>
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
  );
}

export default CrudT;S*/}
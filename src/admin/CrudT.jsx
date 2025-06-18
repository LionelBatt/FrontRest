import React, { useEffect, useState } from "react";
import axios from "axios";


{/*export default function CrudT() {
  const [trips, setTrips] = useState([]);
  const [newTrip, setNewTrip] = useState({
    name: "",
    description: "",
    destination: "",
    price: 0,
    startDate: "",
    endDate: ""
  });
  const [searchId, setSearchId] = useState("");
  const [foundTrip, setFoundTrip] = useState(null);
  const [updateId, setUpdateId] = useState("");
  const [updateTrip, setUpdateTrip] = useState({
    name: "",
    description: "",
    destination: "",
    price: 0,
    startDate: "",
    endDate: ""
  });
  const [deleteId, setDeleteId] = useState("");

  const fetchTrips = async () => {
    try {
      const response = await CacheService.fetchWithCache(
        `search_${text}`,
        `http://localhost:8080/travel/trips`,
        5
      );
      setTrips(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des voyages:", error);
    }
  };

  const createTrip = async () => {
    try {
      await axios.post("http://localhost:8080/travel/trips", newTrip);
      setNewTrip({ name: "", description: "", destination: "", price: 0, startDate: "", endDate: "" });
      fetchTrips();
    } catch (error) {
      console.error("Erreur lors de la création du voyage:", error);
    }
  };

  const findTripById = async () => {
    try {
      const response = await axios.get(`http://localhost:8080/travel/trips/${searchId}`);
      setFoundTrip(response.data);
    } catch (error) {
      console.error("Voyage non trouvé:", error);
      setFoundTrip(null);
    }
  };

  const updateTripById = async () => {
    try {
      await axios.put(`http://localhost:8080/travel/trips/${updateId}`, updateTrip);
      fetchTrips();
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
    }
  };

  const deleteTripById = async () => {
    try {
      await axios.delete(`http://localhost:8080/travel/trips/${deleteId}`);
      fetchTrips();
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  return (
    <div className="p-4 space-y-6">
      <Card className="p-4">
        <h2 className="text-xl font-bold mb-4">Créer un nouveau voyage</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Nom</Label><Input value={newTrip.name} onChange={(e) => setNewTrip({ ...newTrip, name: e.target.value })} /></div>
          <div><Label>Description</Label><Input value={newTrip.description} onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })} /></div>
          <div><Label>Destination</Label><Input value={newTrip.destination} onChange={(e) => setNewTrip({ ...newTrip, destination: e.target.value })} /></div>
          <div><Label>Prix</Label><Input type="number" value={newTrip.price} onChange={(e) => setNewTrip({ ...newTrip, price: e.target.value })} /></div>
          <div><Label>Date de début</Label><Input type="date" value={newTrip.startDate} onChange={(e) => setNewTrip({ ...newTrip, startDate: e.target.value })} /></div>
          <div><Label>Date de fin</Label><Input type="date" value={newTrip.endDate} onChange={(e) => setNewTrip({ ...newTrip, endDate: e.target.value })} /></div>
        </div>
        <Button onClick={createTrip} className="mt-4">Créer un Voyage</Button>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Rechercher un voyage par ID</h2>
        <div className="flex gap-2">
          <Input placeholder="ID" value={searchId} onChange={(e) => setSearchId(e.target.value)} />
          <Button onClick={findTripById}>Trouver un Voyage</Button>
        </div>
        {foundTrip && (
          <div className="mt-4 text-sm">
            <strong>ID:</strong> {foundTrip.id}<br/>
            <strong>Nom:</strong> {foundTrip.name}<br/>
            <strong>Description:</strong> {foundTrip.description}<br/>
            <strong>Destination:</strong> {foundTrip.destination}<br/>
            <strong>Prix:</strong> {foundTrip.price}<br/>
            <strong>Début:</strong> {foundTrip.startDate}<br/>
            <strong>Fin:</strong> {foundTrip.endDate}<br/>
          </div>
        )}
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Mettre à jour un voyage</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>ID</Label><Input value={updateId} onChange={(e) => setUpdateId(e.target.value)} /></div>
          <div><Label>Nom</Label><Input value={updateTrip.name} onChange={(e) => setUpdateTrip({ ...updateTrip, name: e.target.value })} /></div>
          <div><Label>Description</Label><Input value={updateTrip.description} onChange={(e) => setUpdateTrip({ ...updateTrip, description: e.target.value })} /></div>
          <div><Label>Destination</Label><Input value={updateTrip.destination} onChange={(e) => setUpdateTrip({ ...updateTrip, destination: e.target.value })} /></div>
          <div><Label>Prix</Label><Input type="number" value={updateTrip.price} onChange={(e) => setUpdateTrip({ ...updateTrip, price: e.target.value })} /></div>
          <div><Label>Date de début</Label><Input type="date" value={updateTrip.startDate} onChange={(e) => setUpdateTrip({ ...updateTrip, startDate: e.target.value })} /></div>
          <div><Label>Date de fin</Label><Input type="date" value={updateTrip.endDate} onChange={(e) => setUpdateTrip({ ...updateTrip, endDate: e.target.value })} /></div>
        </div>
        <Button onClick={updateTripById} className="mt-4">Mettre à jour un Voyage</Button>
      </Card>

      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-2">Supprimer un voyage</h2>
        <div className="flex gap-2">
          <Input placeholder="ID" value={deleteId} onChange={(e) => setDeleteId(e.target.value)} />
          <Button onClick={deleteTripById}>Supprimer un Voyage</Button>
        </div>
      </Card>

      <Card>
        <CardContent className="overflow-x-auto">
          <h2 className="text-xl font-bold mb-4">Liste des voyages</h2>
          <table className="w-full border text-sm">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Nom</th>
                <th className="p-2 border">Description</th>
                <th className="p-2 border">Destination</th>
                <th className="p-2 border">Prix</th>
                <th className="p-2 border">Début</th>
                <th className="p-2 border">Fin</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id}>
                  <td className="p-2 border">{trip.id}</td>
                  <td className="p-2 border">{trip.name}</td>
                  <td className="p-2 border">{trip.description}</td>
                  <td className="p-2 border">{trip.destination}</td>
                  <td className="p-2 border">{trip.price}</td>
                  <td className="p-2 border">{trip.startDate}</td>
                  <td className="p-2 border">{trip.endDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
*/}


const countries = ["FRANCE", "PORTUGAL", "ITALY"];
const continents = ["EUROPE", "ASIA", "AMERICA"];
const cities = ["PARIS", "LYON", "ROME"];


function CrudT() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentView, setCurrentView] = useState('list');
  const [selectedTrip, setSelectedTrip] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [editingTrip, setEditingTrip] = useState(null);
  
  const [newTrip, setNewTrip] = useState({
    destinationCountry: "FRANCE",
    destinationContinent: "EUROPE",
    destinationCity: "PARIS",
    minimumDuration: 7,
    description: "",
    unitPrice: 0,
  });

  // Charger tous les voyages
  const loadTrips = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:8080/trips");
      if (response.data.success) {
        setTrips(response.data.data);
      } else {
        alert("Erreur: " + response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors du chargement des voyages:", error);
      alert("Erreur lors du chargement des voyages");
    } finally {
      setLoading(false);
    }
  };

  // Charger les voyages au montage du composant
  useEffect(() => {
    loadTrips();
  }, []);

  // Rechercher un voyage par ID
  const findTripById = async () => {
    if (!searchId) {
      alert("Veuillez entrer un ID");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/trips/${searchId}`);
      if (response.data.success) {
        setSelectedTrip(response.data.data);
        setCurrentView('detail');
      } else {
        alert("Voyage non trouvé: " + response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
      alert("Voyage non trouvé");
    } finally {
      setLoading(false);
    }
  };

  // Créer un nouveau voyage avec FormData
  const createTrip = async () => {
    try {
      const formData = new FormData();
      formData.append('destinationCountry', newTrip.destinationCountry);
      formData.append('destinationContinent', newTrip.destinationContinent);
      formData.append('destinationCity', newTrip.destinationCity);
      formData.append('minimumDuration', newTrip.minimumDuration.toString());
      formData.append('description', newTrip.description);
      formData.append('unitPrice', newTrip.unitPrice.toString());

      const response = await axios.post("http://localhost:8080/trips", formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        alert("Voyage créé avec succès !");
        setNewTrip({
          destinationCountry: "FRANCE",
          destinationContinent: "EUROPE",
          destinationCity: "PARIS",
          minimumDuration: 7,
          description: "",
          unitPrice: 0,
        });
        setCurrentView('list');
        loadTrips();
      } else {
        alert("Erreur: " + response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la création du voyage:", error);
      alert("Erreur lors de la création du voyage. Vérifiez vos permissions.");
    }
  };

  // Mettre à jour un voyage
  const updateTrip = async (trip) => {
    try {
      const response = await axios.put(`http://localhost:8080/trips/${trip.id}`, trip);
      if (response.data.success) {
        alert("Voyage mis à jour avec succès !");
        setEditingTrip(null);
        loadTrips();
      } else {
        alert("Erreur: " + response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour:", error);
      alert("Erreur lors de la mise à jour. Vérifiez vos permissions.");
    }
  };

  // Supprimer un voyage
  const deleteTrip = async (id) => {
    if (!window.confirm("Êtes-vous sûr de vouloir supprimer ce voyage ?")) {
      return;
    }
    try {
      const response = await axios.delete(`http://localhost:8080/trips/${id}`);
      if (response.data.success) {
        alert("Voyage supprimé avec succès !");
        loadTrips();
      } else {
        alert("Erreur: " + response.data.message);
      }
    } catch (error) {
      console.error("Erreur lors de la suppression:", error);
      alert("Erreur lors de la suppression. Vérifiez vos permissions.");
    }
  };

  // Commencer l'édition d'un voyage
  const startEdit = (trip) => {
    setEditingTrip({...trip});
  };

  // Sauvegarder les modifications
  const saveEdit = () => {
    if (editingTrip) {
      updateTrip(editingTrip);
    }
  };

  // Annuler l'édition
  const cancelEdit = () => {
    setEditingTrip(null);
  };

  // Rendu de la liste des voyages
  const renderTripsList = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6 flex flex-wrap gap-4 items-center">
        <h1 className="text-2xl font-bold text-gray-800">Gestion des Voyages</h1>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="ID du voyage"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={findTripById}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            FindById
          </button>
        </div>
        <button
          onClick={() => setCurrentView('create')}
          className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Create
        </button>
        <button
          onClick={loadTrips}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
        >
          Actualiser
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Chargement...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Pays</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Continent</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Ville</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Durée (jours)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Prix (€)</th>
                <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trips.map((trip) => (
                <tr key={trip.id} className="hover:bg-gray-50">
                  {editingTrip && editingTrip.id === trip.id ? (
                    <>
                      <td className="border border-gray-300 px-4 py-2">{trip.id}</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={editingTrip.destinationCountry}
                          onChange={(e) => setEditingTrip({...editingTrip, destinationCountry: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        >
                          {countries.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={editingTrip.destinationContinent}
                          onChange={(e) => setEditingTrip({...editingTrip, destinationContinent: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        >
                          {continents.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <select
                          value={editingTrip.destinationCity}
                          onChange={(e) => setEditingTrip({...editingTrip, destinationCity: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        >
                          {cities.map((c) => (
                            <option key={c} value={c}>{c}</option>
                          ))}
                        </select>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          value={editingTrip.minimumDuration}
                          onChange={(e) => setEditingTrip({...editingTrip, minimumDuration: parseInt(e.target.value, 10)})}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="text"
                          value={editingTrip.description}
                          onChange={(e) => setEditingTrip({...editingTrip, description: e.target.value})}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <input
                          type="number"
                          value={editingTrip.unitPrice}
                          onChange={(e) => setEditingTrip({...editingTrip, unitPrice: parseInt(e.target.value, 10)})}
                          className="w-full px-2 py-1 border border-gray-300 rounded"
                        />
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={saveEdit}
                            className="px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                          >
                            ✓
                          </button>
                          <button
                            onClick={cancelEdit}
                            className="px-3 py-1 bg-gray-500 text-white rounded text-sm hover:bg-gray-600"
                          >
                            ✗
                          </button>
                        </div>
                      </td>
                    </>
                  ) : (
                    <>
                      <td className="border border-gray-300 px-4 py-2 font-medium">{trip.id}</td>
                      <td className="border border-gray-300 px-4 py-2">{trip.destinationCountry}</td>
                      <td className="border border-gray-300 px-4 py-2">{trip.destinationContinent}</td>
                      <td className="border border-gray-300 px-4 py-2">{trip.destinationCity}</td>
                      <td className="border border-gray-300 px-4 py-2">{trip.minimumDuration}</td>
                      <td className="border border-gray-300 px-4 py-2">{trip.description}</td>
                      <td className="border border-gray-300 px-4 py-2 font-medium">{trip.unitPrice}€</td>
                      <td className="border border-gray-300 px-4 py-2">
                        <div className="flex gap-2">
                          <button
                            onClick={() => startEdit(trip)}
                            className="px-3 py-1 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
                          >
                            Update
                          </button>
                          <button
                            onClick={() => deleteTrip(trip.id)}
                            className="px-3 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
          {trips.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              Aucun voyage trouvé
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Rendu du formulaire de création
  const renderCreateForm = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => setCurrentView('list')}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          ← Retour à la liste
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Créer un nouveau voyage</h2>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Pays :</label>
          <select
            value={newTrip.destinationCountry}
            onChange={(e) => setNewTrip({ ...newTrip, destinationCountry: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Continent :</label>
          <select
            value={newTrip.destinationContinent}
            onChange={(e) => setNewTrip({ ...newTrip, destinationContinent: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {continents.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Ville :</label>
          <select
            value={newTrip.destinationCity}
            onChange={(e) => setNewTrip({ ...newTrip, destinationCity: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Durée minimum (jours) :</label>
          <input
            type="number"
            value={newTrip.minimumDuration}
            onChange={(e) => setNewTrip({ ...newTrip, minimumDuration: parseInt(e.target.value, 10) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description :</label>
          <textarea
            value={newTrip.description}
            onChange={(e) => setNewTrip({ ...newTrip, description: e.target.value })}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prix unitaire (€) :</label>
          <input
            type="number"
            value={newTrip.unitPrice}
            onChange={(e) => setNewTrip({ ...newTrip, unitPrice: parseInt(e.target.value, 10) || 0 })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={createTrip}
          className="w-full px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          Créer le Voyage
        </button>
      </div>
    </div>
  );

  // Rendu des détails d'un voyage
  const renderTripDetail = () => (
    <div className="p-6 bg-white rounded-lg shadow-lg max-w-2xl mx-auto">
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={() => setCurrentView('list')}
          className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
        >
          ← Retour à la liste
        </button>
        <h2 className="text-2xl font-bold text-gray-800">Détails du voyage #{selectedTrip?.id}</h2>
      </div>

      {selectedTrip && (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">ID :</label>
              <p className="text-lg font-semibold">{selectedTrip.id}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Prix :</label>
              <p className="text-lg font-semibold text-green-600">{selectedTrip.unitPrice}€</p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Pays :</label>
              <p className="text-lg">{selectedTrip.destinationCountry}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Continent :</label>
              <p className="text-lg">{selectedTrip.destinationContinent}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ville :</label>
              <p className="text-lg">{selectedTrip.destinationCity}</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Durée minimum :</label>
            <p className="text-lg">{selectedTrip.minimumDuration} jours</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description :</label>
            <p className="text-lg bg-gray-50 p-4 rounded-md">{selectedTrip.description}</p>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={() => startEdit(selectedTrip)}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Modifier
            </button>
            <button
              onClick={() => deleteTrip(selectedTrip.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );

  // Rendu principal
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        {currentView === 'list' && renderTripsList()}
        {currentView === 'create' && renderCreateForm()}
        {currentView === 'detail' && renderTripDetail()}
      </div>
    </div>
  );
}
export default CrudT;

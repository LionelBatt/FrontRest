import { useEffect, useState } from 'react';

function CrudU() {
    const [users, setUsers] = useState([]);
    const [userId, setUserId] = useState("");
    const [userData, setUserData] = useState({
        userId: "",
        username: "",
        name: "",
        surname: "",
        password: "",
        phoneNumber: "",
        address: "",
        email: "",
        role: "USER",
    });

    const [token, setToken] = useState("");

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);

    const loadAll = async () => {
        try {
            console.log(token)
            const res = await fetch("http://localhost:8080/travel/users", {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) setUsers(data.data);
        } catch (e) {
            console.error('Erreur:', e);
        }
    };

    const create = async () => {
        const password = window.prompt("Veuillez saisir un mot de passe pour le nouvel utilisateur :");

        if (!password) {
            alert("Création annulée : mot de passe requis.");
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/travel/auth/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...userData, password }), // On ajoute le mot de passe ici
            });

            const data = await res.json();
            if (data.success) {
                alert("Utilisateur créé !");
                loadAll();
            } else {
                alert(`Erreur : ${data.message || "Création échouée"}`);
            }
        } catch (e) {
            console.error('Erreur:', e);
            alert("Erreur réseau lors de la création.");
        }
    };

    const findById = async () => {
        try {
            console.log("token : " + token)
            const res = await fetch(`http://localhost:8080/travel/users/${userId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            if (data.success) setUserData(data.data);
            else alert("Introuvable");
            console.log(data);
        } catch (e) {
            console.error('Erreur:', e);
        }
    };

    const update = async () => {
        try {
            const res = await fetch(`http://localhost:8080/travel/users/${userId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    ...userData,
                    userId: parseInt(userId),
                }),
            });
            const data = await res.json();
            if (data.success) {
                alert("Mise à jour OK");
                loadAll();
            }
        } catch (e) {
            console.error('Erreur:', e);
        }
    };

    const remove = async () => {
        try {
            const res = await fetch(`http://localhost:8080/travel/users/${userId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const data = await res.json();
            alert(data.message);
            loadAll();
        } catch (e) {
            console.error('Erreur:', e);
        }
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
                        Gestion des Utilisateurs
                    </h2>
                    <br />
                    <div className="d-flex justify-content-center grid grid-cols-1 md:grid-cols-2 gap-1 mb-6">
                        <input
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Identifiant"
                            value={userData.username}
                            onChange={(e) => setUserData({ ...userData, username: e.target.value })}
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Nom"
                            value={userData.name}
                            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Prénom"
                            value={userData.surname}
                            onChange={(e) => setUserData({ ...userData, surname: e.target.value })}
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Email"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Tel."
                            value={userData.phoneNumber}
                            onChange={(e) => setUserData({ ...userData, phoneNumber: e.target.value })}
                        />
                        <input
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Adresse"
                            value={userData.address}
                            onChange={(e) => setUserData({ ...userData, address: e.target.value })}
                        />
                        <select
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={userData.role}
                            onChange={(e) => setUserData({ ...userData, role: e.target.value })}
                        >
                            <option>USER</option>
                            <option>ADMIN</option>
                        </select>
                        <input
                            className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="ID à chercher / modifier"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
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
                        <table className="min-w-full border border-gray-200 text-sm text-gray-800 text-center">
                            <thead className="bg-gray-100 font-medium">
                                <tr>
                                    <th className="px-4 py-2 border-b">ID</th>
                                    <th className="px-4 py-2 border-b">Identifiant</th>
                                    <th className="px-4 py-2 border-b">Nom</th>
                                    <th className="px-4 py-2 border-b">Prenom</th>
                                    <th className="px-4 py-2 border-b">Email</th>
                                    <th className="px-4 py-2 border-b">Numéro de Téléphone</th>
                                    <th className="px-4 py-2 border-b">Adresse</th>
                                    <th className="px-4 py-2 border-b">Rôle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((u) => (
                                    <tr key={u.userId} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 border-b">{u.userId}</td>
                                        <td className="px-4 py-2 border-b">{u.username}</td>
                                        <td className="px-4 py-2 border-b">{u.name}</td>
                                        <td className="px-4 py-2 border-b">{u.surname}</td>
                                        <td className="px-4 py-2 border-b">{u.email}</td>
                                        <td className="px-4 py-2 border-b">{u.phoneNumber}</td>
                                        <td className="px-4 py-2 border-b">{u.address}</td>
                                        <td className="px-4 py-2 border-b">{u.role}</td>
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

export default CrudU;
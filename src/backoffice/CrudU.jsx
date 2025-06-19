import React, { useEffect, useState } from 'react';

function CrudU() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    role: "USER",
  });

  const loadAll = async () => {
    const res = await fetch("http://13.39.150.189:8080/travel/users");
    const data = await res.json();
    if (data.success) setUsers(data.data);
  };

  const create = async () => {
    const res = await fetch("http://13.39.150.189:8080/travel/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.success) {
      alert("Utilisateur créé !");
      loadAll();
    }
  };

  const findById = async () => {
    const res = await fetch(`http://13.39.150.189:8080/travel/users/${userId}`);
    const data = await res.json();
    if (data.success) setUserData(data.data);
    else alert("Introuvable");
  };

  const update = async () => {
    const res = await fetch(`http://13.39.150.189:8080/travel/users/${userId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    const data = await res.json();
    if (data.success) {
      alert("Mise à jour OK");
      loadAll();
    }
  };

  const remove = async () => {
    const res = await fetch(`http://13.39.150.189:8080/travel/users/${userId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message);
    loadAll();
  };

  useEffect(() => { loadAll(); }, []);

  return (
    <div className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4">CRUD Utilisateurs</h2>

      <div className="grid grid-cols-2 gap-2 mb-4">
        <input placeholder="Nom" value={userData.username} onChange={(e) => setUserData({ ...userData, username: e.target.value })} />
        <input placeholder="Email" value={userData.email} onChange={(e) => setUserData({ ...userData, email: e.target.value })} />
        <select value={userData.role} onChange={(e) => setUserData({ ...userData, role: e.target.value })}>
          <option>USER</option><option>ADMIN</option>
        </select>
        <input placeholder="ID à chercher / modifier" value={userId} onChange={(e) => setUserId(e.target.value)} />
      </div>

      <div className="flex gap-2 mb-6">
        <button onClick={create} className="bg-green-500 text-white px-4 py-1 rounded">Créer</button>
        <button onClick={findById} className="bg-blue-500 text-white px-4 py-1 rounded">FindById</button>
        <button onClick={update} className="bg-yellow-500 text-white px-4 py-1 rounded">Update</button>
        <button onClick={remove} className="bg-red-500 text-white px-4 py-1 rounded">Delete</button>
      </div>

      <table className="w-full border text-sm">
        <thead><tr className="bg-gray-100"><th>ID</th><th>Nom</th><th>Email</th><th>Rôle</th></tr></thead>
        <tbody>{users.map(u => <tr key={u.userId}><td>{u.userId}</td><td>{u.username}</td><td>{u.email}</td><td>{u.role}</td></tr>)}</tbody>
      </table>
    </div>
  );
}

export default CrudU;
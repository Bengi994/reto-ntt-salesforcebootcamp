'use client'
import { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { CiLocationOn } from "react-icons/ci";


export default function Home() {

  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api');
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los usuarios:', error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);


  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = users.filter(user => 
      user.name.toLowerCase().includes(value)
    );

    setFilteredUsers(filtered);
  };
  
  if (loading) {
    return <p className="text-4xl font-bold text-center text-gray-600 mb-10">Cargando...</p>;
  }
  return (
    <div className="min-h-screen bg-gray-100 py-10">
  <h1 className="text-4xl font-bold text-center text-gray-600 mb-10">Lista de Usuarios</h1>
  <div className="max-w-md mx-auto mb-6 relative">
    <FaSearch className="absolute left-3 top-3 text-gray-400" />
    <input
      type="text"
      placeholder="Buscar por nombre..."
      value={searchTerm}
      onChange={handleSearch}
      className="w-full p-3 pl-10 border border-gray-300 rounded-lg shadow-sm"
    />
  </div>
  {filteredUsers.length > 0 ? (
    <div className="space-y-6 max-w-7xl mx-auto px-4">
      {filteredUsers.map((user, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex justify-between items-center">
          <div className="flex items-center gap-x-4">
            <img
              src={user.picture}
              alt={user.name}
              className="w-16 h-16 rounded-full bg-gray-50"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900">{user.name}</p>
              <p className="mt-1 text-xs text-gray-500">{user.email}</p>
            </div>
          </div>
          <div className="sm:flex sm:flex-col sm:items-end">
            <p className="text-sm text-gray-900">Gender: {user.gender}</p>
            <p className="mt-1 text-xs text-gray-500 flex justify-center">
              <CiLocationOn className="mt-1" />
              {user.location}
            </p>
            <p className="mt-1 text-xs text-gray-500">
              Fecha de Nacimiento: {new Date(user.dob).toLocaleDateString()}
            </p>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-center text-gray-500">No se encontraron usuarios</p>
  )}
</div>

  );
}

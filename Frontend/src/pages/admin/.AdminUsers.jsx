import { useState } from "react";

export default function AdminUsers() {
  const [users, setUsers] = useState([
    { id: 1, name: "Alice", email: "alice@mail.com" },
    { id: 2, name: "Bob", email: "bob@mail.com" },
  ]);

  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  
  return (
    <div className="p-8 bg-admin-dark min-h-screen">
      <h2 className="text-3xl font-bold text-admin mb-6">Users Management</h2>
      <table className="min-w-full bg-admin shadow rounded-lg overflow-hidden">
        <thead className="bg-admin-primary">
          <tr>
            <th className="px-6 py-3 text-admin-light">ID</th>
            <th className="px-6 py-3 text-admin-light">Name</th>
            <th className="px-6 py-3 text-admin-light">Email</th>
            <th className="px-6 py-3 text-admin-light">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-admin-secondary transition">
              <td className="px-6 py-4 text-admin">{user.id}</td>
              <td className="px-6 py-4 text-admin">{user.name}</td>
              <td className="px-6 py-4 text-admin">{user.email}</td>
              <td className="px-6 py-4">
                <button
                  className="px-3 py-1 bg-admin-danger text-admin-light rounded hover:bg-admin-secondary transition"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

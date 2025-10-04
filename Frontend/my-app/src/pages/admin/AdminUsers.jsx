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
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6">Users Management</h2>
            <table className="min-w-full bg-white shadow rounded-lg overflow-hidden">
                <thead className="bg-pink-50">
                    <tr>
                        <th className="px-6 py-3">ID</th>
                        <th className="px-6 py-3">Name</th>
                        <th className="px-6 py-3">Email</th>
                        <th className="px-6 py-3">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-pink-50 transition">
                            <td className="px-6 py-4">{user.id}</td>
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">
                                <button
                                    className="px-3 py-1 bg-red-500 text-white rounded"
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

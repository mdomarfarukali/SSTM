import { useState, useEffect } from "react";
import axios from "axios";
import LoadingSpinner from "../../components/common/LoadingSpinner";

export default function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                // const res = await axios.get("/API/auth/admin/users"); // Adjust path as needed
                const token = localStorage.getItem("token");
                // console.log("Using token:", token);
                const res = await axios.get("/API/auth/admin/users", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                // console.log("Fetched users:", res);
                setUsers(res.data.users);
            } catch (error) {
                console.error("Failed to fetch users:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/API/auth/users/${id}`);
            setUsers((prev) => prev.filter((u) => u._id !== id));
            alert("User deleted successfully");
        } catch (error) {
            console.error("Failed to delete user:", error);
            alert("Error deleting user");
        }
    };

    if (loading) {
        return (
            // <div className="flex items-center justify-center min-h-screen text-gray-600">
            //     Loading users...
            // </div>
            <LoadingSpinner />
        );
    }


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
                        <tr key={user._id} className="hover:bg-admin-secondary transition">
                            <td className="px-6 py-4 text-admin">{user._id}</td>
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

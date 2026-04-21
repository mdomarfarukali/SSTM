import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import useUserProfile from '../../components/hooks/useUserProfile';

const defaultProfile = {
    name: '',
    email: '',
    phone: '',
    street: '',
    city: '',
    zip: '',
    country: 'India',
};

export default function ProfilePage() {
    // UI State
    const [isEditing, setIsEditing] = useState(false);
    const [saved, setSaved] = useState(false);

    const { profile, setProfile, loading } = useUserProfile(defaultProfile);
    // Mock Profile Data
    // const [profile, setProfile] = useState({
    //     photo: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    //     name: "John Doe",
    //     email: "john.doe@example.com",
    //     phone: "+91 98765 43210",
    //     country: "India",
    // });

    // Mock Addresses Data
    const [addresses, setAddresses] = useState([
        { id: 1, street: "123 Main St, Apartment 4B", city: "Mumbai", zip: "400001", isDefault: true },
        { id: 2, street: "456 Linking Road, Sea View", city: "Mumbai", zip: "400050", isDefault: false },
        { id: 3, street: "789 MG Road, Tech Park", city: "Bangalore", zip: "560001", isDefault: false },
    ]);

    // Handlers
    const handleChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        setIsEditing(false); // Switch back to view mode after saving
    };

    const handleSetDefault = (id) => {
        setAddresses(
            addresses.map((addr) => ({
                ...addr,
                isDefault: addr.id === id,
            }))
        );
    };

    // Sort addresses so the default is always at the top
    const sortedAddresses = [...addresses].sort(
        (a, b) => (b.isDefault ? 1 : 0) - (a.isDefault ? 1 : 0)
    );

    // ################################################

    // console.log("Profile: ", profile);
    // ✅ Save indicator timeout
    useEffect(() => {
        if (!saved) return;
        const timeout = setTimeout(() => setSaved(false), 2500);
        return () => clearTimeout(timeout);
    }, [saved]);

    if (loading) return <LoadingSpinner />; //<p>Loading...</p>;

    return (
        <div className="min-h-screen bg-slate-50 py-10 font-sans">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

                {/* Header Card (Always visible, adapts to edit mode) */}
                <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <img
                                    src={profile.photo || "/userAvatarTrimmed.png"}
                                    alt={profile.name}
                                    className="h-24 w-24 rounded-full object-cover border-4 border-slate-50 shadow-sm"
                                />
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 rounded-full bg-slate-900 p-2 text-white hover:bg-slate-800 transition">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                        </svg>
                                    </button>
                                )}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-slate-900">{profile.name}</h1>
                                <p className="text-slate-500 mt-1">{profile.email}</p>
                            </div>
                        </div>
                        {!isEditing && (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-5 py-2.5 text-sm font-semibold text-indigo-600 transition hover:bg-indigo-100 hover:text-indigo-700"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                                Account Settings
                            </button>
                        )}
                    </div>
                </div>

                {isEditing ? (
                    /* ----------------- EDIT MODE ----------------- */
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-slate-900">Edit Profile Information</h2>
                            <p className="text-sm text-slate-500 mt-1">Update your personal details and contact info.</p>
                        </div>
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid gap-6 sm:grid-cols-2">
                                <label className="space-y-2 block">
                                    <span className="text-sm font-medium text-slate-700">Full Name</span>
                                    <input
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white"
                                    />
                                </label>
                                <label className="space-y-2 block">
                                    <span className="text-sm font-medium text-slate-700">Email Address</span>
                                    <input
                                        name="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white"
                                    />
                                </label>
                                <label className="space-y-2 block">
                                    <span className="text-sm font-medium text-slate-700">Phone Number</span>
                                    <input
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white"
                                    />
                                </label>
                                <label className="space-y-2 block">
                                    <span className="text-sm font-medium text-slate-700">Country</span>
                                    <input
                                        name="country"
                                        value={profile.country}
                                        onChange={handleChange}
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 focus:bg-white"
                                    />
                                </label>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center justify-end pt-4 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(false)}
                                    className="rounded-full px-6 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-full bg-indigo-600 px-8 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 hover:shadow"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </form>
                    </div>
                ) : (
                    /* ----------------- VIEW MODE ----------------- */
                    <div className="space-y-8 animate-in fade-in duration-500">
                        {/* Personal Information Read-Only */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-6">Personal Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Phone Number</p>
                                    <p className="mt-1 text-base font-medium text-slate-900">{profile.phone}</p>
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-slate-500">Country</p>
                                    <p className="mt-1 text-base font-medium text-slate-900">{profile.country}</p>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Addresses Read-Only */}
                        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                            <div className="mb-6 flex items-center justify-between">
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">Shipping Addresses</h2>
                                    <p className="text-sm text-slate-500 mt-1">Manage your delivery locations.</p>
                                </div>
                                <button className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 hover:underline">
                                    + Add New
                                </button>
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                                {sortedAddresses.map((addr) => (
                                    <div
                                        key={addr.id}
                                        className={`relative flex flex-col p-6 rounded-2xl border transition-all duration-200 ${addr.isDefault
                                                ? "border-indigo-500 bg-indigo-50/30 shadow-sm"
                                                : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                                            }`}
                                    >
                                        {/* Badge for default address */}
                                        {addr.isDefault && (
                                            <div className="absolute top-4 right-4">
                                                <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                                    Current
                                                </span>
                                            </div>
                                        )}

                                        <div className="flex-1 pr-24">
                                            <p className="text-base font-semibold text-slate-900">{addr.street}</p>
                                            <p className="mt-1 text-sm text-slate-500">
                                                {addr.city}, {addr.zip}
                                            </p>
                                        </div>

                                        {/* Action Button for non-default addresses */}
                                        {!addr.isDefault && (
                                            <div className="mt-6 border-t border-slate-100 pt-4">
                                                <button
                                                    onClick={() => handleSetDefault(addr.id)}
                                                    className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors"
                                                >
                                                    Set as current
                                                </button>
                                            </div>
                                        )}
                                        {addr.isDefault && (
                                            <div className="mt-6 border-t border-indigo-100/50 pt-4 flex gap-4">
                                                <button className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Edit</button>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Toast */}
                {saved && (
                    <div className="fixed bottom-6 right-6 bg-slate-900 text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-3 animate-in slide-in-from-bottom-5">
                        <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-sm font-medium">Profile updated successfully.</span>
                    </div>
                )}
            </div>
        </div>
    );
}
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

function UserProfile() {
    // const [profile, setProfile] = useState(defaultProfile);
    // const [saved, setSaved] = useState(false);

    // useEffect(() => {
    //   const storedProfile = localStorage.getItem('userProfile');
    //   if (storedProfile) {
    //     try {
    //       setProfile(JSON.parse(storedProfile));
    //       return;
    //     } catch (error) {
    //       console.warn('Failed to parse userProfile from localStorage', error);
    //     }
    //   }

    //   const storedName = localStorage.getItem('username') || localStorage.getItem('user');
    //   const storedEmail = localStorage.getItem('email');
    //   setProfile((prev) => ({
    //     ...prev,
    //     name: storedName || prev.name,
    //     email: storedEmail || prev.email,
    //   }));
    // }, []);

    // useEffect(() => {
    //   if (!saved) return;
    //   const timeout = setTimeout(() => setSaved(false), 2500);
    //   return () => clearTimeout(timeout);
    // }, [saved]);

    // const handleChange = (event) => {
    //   const { name, value } = event.target;
    //   setProfile((prev) => ({ ...prev, [name]: value }));
    // };

    // const handleSave = (event) => {
    //   event.preventDefault();
    //   localStorage.setItem('userProfile', JSON.stringify(profile));
    //   if (profile.name) localStorage.setItem('username', profile.name);
    //   if (profile.email) localStorage.setItem('email', profile.email);
    //   setSaved(true);
    // };
    

    const { profile, setProfile, loading } = useUserProfile(defaultProfile);
    const [saved, setSaved] = useState(false);

    console.log("Profile: ", profile);
    // ✏️ Handle input change
    const handleChange = (event) => {
        const { name, value } = event.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // 💾 Save profile
    const handleSave = (event) => {
        event.preventDefault();

        localStorage.setItem("userProfile", JSON.stringify(profile));
        setSaved(true);
    };

    // ✅ Save indicator timeout
    useEffect(() => {
        if (!saved) return;
        const timeout = setTimeout(() => setSaved(false), 2500);
        return () => clearTimeout(timeout);
    }, [saved]);

    if (loading) return <LoadingSpinner/>; //<p>Loading...</p>;

    return (
        <div className="min-h-screen bg-brand-light py-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 rounded-3xl border border-brand-muted bg-white p-8 shadow-sm transition duration-300 hover:shadow-md">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-brand">Profile Information</h1>
                            <p className="mt-2 text-sm text-brand-muted">
                                Keep your contact details up to date for faster checkout and order updates.
                            </p>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-4 py-2 text-sm font-semibold text-brand-highlight">
                            <span>Account Settings</span>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <section className="rounded-3xl border border-brand-muted bg-white p-8 shadow-sm">
                        <form onSubmit={handleSave} className="space-y-6">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="space-y-2">
                                    <span className="text-sm font-medium text-brand">Full Name</span>
                                    <input
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        placeholder="John Doe"
                                        className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                                    />
                                </label>
                                <label className="space-y-2">
                                    <span className="text-sm font-medium text-brand">Email Address</span>
                                    <input
                                        name="email"
                                        type="email"
                                        value={profile.email}
                                        onChange={handleChange}
                                        placeholder="you@example.com"
                                        className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                                    />
                                </label>
                            </div>

                            <div className="grid gap-4 sm:grid-cols-2">
                                <label className="space-y-2">
                                    <span className="text-sm font-medium text-brand">Phone Number</span>
                                    <input
                                        name="phone"
                                        value={profile.phone}
                                        onChange={handleChange}
                                        placeholder="+91 98765 43210"
                                        className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                                    />
                                </label>
                                <label className="space-y-2">
                                    <span className="text-sm font-medium text-brand">Country</span>
                                    <input
                                        name="country"
                                        value={profile.country}
                                        onChange={handleChange}
                                        placeholder="India"
                                        className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                                    />
                                </label>
                            </div>

                            <div className="space-y-4 rounded-3xl border border-brand-muted bg-brand-light p-6">
                                <h2 className="text-xl font-semibold text-brand">Shipping Address</h2>
                                <div className="grid gap-4 sm:grid-cols-3">
                                    <label className="space-y-2">
                                        <span className="text-sm font-medium text-brand">Street</span>
                                        <input
                                            name="street"
                                            value={profile.street}
                                            onChange={handleChange}
                                            placeholder="123 Main St"
                                            className="w-full rounded-2xl border border-brand-muted bg-white px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                                        />
                                    </label>
                                    <label className="space-y-2">
                                        <span className="text-sm font-medium text-brand">City</span>
                                        <input
                                            name="city"
                                            value={profile.city}
                                            onChange={handleChange}
                                            placeholder="Mumbai"
                                            className="w-full rounded-2xl border border-brand-muted bg-white px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                                        />
                                    </label>
                                    <label className="space-y-2">
                                        <span className="text-sm font-medium text-brand">Postal Code</span>
                                        <input
                                            name="zip"
                                            value={profile.postal}
                                            onChange={handleChange}
                                            placeholder="400001"
                                            className="w-full rounded-2xl border border-brand-muted bg-white px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <button
                                    type="submit"
                                    className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-highlight transition hover:bg-brand"
                                >
                                    Save Profile
                                </button>
                                {saved && (
                                    <p className="text-sm font-medium text-brand-success">Profile updated successfully.</p>
                                )}
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;

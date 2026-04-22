import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPlus, FaTrashAlt, FaEdit } from 'react-icons/fa';

const emptyAddress = {
  fullName: '',
  email: '',
  addressLine1: '',
  city: '',
  state: '',
  postalCode: '',
  country: 'India',
  phone: '',
};

function UserAddress() {
  const [addresses, setAddresses] = useState([]);
  const [form, setForm] = useState(emptyAddress);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const fetchAddresses = async () => {
      try {
        setLoading(true);

        const res = await fetch("http://localhost:5000/API/addresses", {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const data = await res.json();
        setAddresses(data.addresses || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // 🔥 important
      }
    };

    fetchAddresses();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = editingId ? "PUT" : "POST";
    const url = editingId
      ? `http://localhost:5000/API/addresses/${editingId}`
      : "http://localhost:5000/API/addresses";

    console.log("FORM DATA:", form);
    const res = await fetch(url, {
      method,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.message);
      return;
    }
    setAddresses(data.addresses || []);
    setForm(emptyAddress);
    setEditingId(null);
  };

  const handleEdit = (address) => {
    setForm({
      fullName: address.fullName,
      email: address.email,
      addressLine1: address.addressLine1,
      city: address.city,
      state: address.state,
      postalCode: address.postalCode,
      country: address.country,
      phone: address.phone,
    });
    setEditingId(address._id);
  };


  const handleDelete = async (id) => {
    if (!window.confirm('Delete this address?')) return;

    const res = await fetch(`http://localhost:5000/API/addresses/${id}`, {
      method: "DELETE",
      withCredentials: true,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    const data = await res.json();
    if (!data.success) {
      alert(data.message);
      return;
    }
    setAddresses(data.addresses || []);
  };
  if (loading) {
    return <p>Loading addresses...</p>;
  }
  return (
    <div className="min-h-screen bg-brand-light py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-brand">Manage Your Addresses</h1>
            <p className="mt-2 text-sm text-brand-muted">
              Save, edit, and remove shipping addresses for faster checkout.
            </p>
          </div>
          <Link
            to="/account/addresses"
            className="inline-flex items-center gap-2 rounded-full bg-brand-primary px-5 py-3 text-sm font-medium text-brand-highlight shadow-sm transition hover:bg-brand"
          >
            <FaMapMarkerAlt className="h-4 w-4" />
            Address Book
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <section className="rounded-3xl border border-brand-muted bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-brand">Add New Address</h2>
                <p className="mt-1 text-sm text-brand-muted">Your addresses are securely stored in your account.</p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-full bg-brand-light px-4 py-2 text-sm text-brand-muted">
                <FaPlus /> {editingId ? 'Update Address' : 'New Address'}
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Email Address"
                  className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <input
                name="addressLine1"
                value={form.addressLine1}
                onChange={handleChange}
                placeholder="Street Address"
                className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              />
              <div className="grid gap-4 sm:grid-cols-3">
                <input
                  name="city"
                  value={form.city}
                  onChange={handleChange}
                  placeholder="City"
                  className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="State"
                  className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  name="postalCode"
                  value={form.postalCode}
                  onChange={handleChange}
                  placeholder="Postal Code"
                  className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                />
                <input
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  placeholder="Country"
                  className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
                />
              </div>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="Phone Number"
                className="w-full rounded-2xl border border-brand-muted bg-brand-light px-4 py-3 text-sm text-brand outline-none transition focus:border-brand-primary focus:ring-2 focus:ring-brand-primary"
              />
              <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="submit"
                  className="inline-flex items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-semibold text-brand-highlight transition hover:bg-brand"
                >
                  {editingId ? 'Save Address' : 'Add Address'}
                </button>
                {editingId && (
                  <button
                    type="button"
                    onClick={() => {
                      setForm(emptyAddress);
                      setEditingId(null);
                    }}
                    className="inline-flex items-center justify-center rounded-full border border-brand-muted bg-white px-6 py-3 text-sm font-semibold text-brand transition hover:bg-brand-light"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </form>
          </section>

          <section className="rounded-3xl border border-brand-muted bg-white p-6 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
            <div className="mb-6 flex items-center gap-3">
              <FaMapMarkerAlt className="h-6 w-6 text-brand" />
              <h2 className="text-2xl font-semibold text-brand">Saved Addresses</h2>
            </div>

            {!addresses || addresses.length === 0 ? (
              <div className="rounded-3xl border border-dashed border-brand-muted bg-brand-light px-5 py-10 text-center text-brand-muted">
                No saved addresses yet. Add one to speed up checkout.
              </div>
            ) : (
              <div className="space-y-4">
                {addresses.map((address) => (
                  <article key={address._id} className="rounded-3xl border border-brand-muted bg-brand-light p-5 shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-lg font-semibold text-brand">{address.fullName}</p>
                        <p className="mt-1 text-sm text-brand-muted">{address.email}</p>
                        <p className="mt-3 text-sm text-brand">
                          {address.addressLine1}, {address.city}, {address.postalCode}
                        </p>
                        <p className="text-sm text-brand">{address.country}</p>
                        {address.phone && <p className="text-sm text-brand">{address.phone}</p>}
                      </div>
                      <div className="flex gap-2">
                        <button
                          type="button"
                          onClick={() => handleEdit(address)}
                          className="inline-flex items-center gap-2 rounded-full border border-brand-muted bg-white px-4 py-2 text-sm font-medium text-brand transition hover:bg-brand-light"
                        >
                          <FaEdit /> Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(address._id)}
                          className="inline-flex items-center gap-2 rounded-full border border-brand-danger bg-brand-danger/10 px-4 py-2 text-sm font-medium text-brand-danger transition hover:bg-brand-danger/20"
                        >
                          <FaTrashAlt /> Delete
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default UserAddress;

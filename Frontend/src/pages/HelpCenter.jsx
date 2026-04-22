import { useState } from "react";

export default function HelpCenter() {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    issue: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  // FAQ Data
  const faqs = [
    {
      q: "How to track my order?",
      a: "Go to Track Order page and enter your Order ID.",
    },
    {
      q: "How to cancel an order?",
      a: "You can cancel before it is shipped from Track Order page.",
    },
    {
      q: "How to return a product?",
      a: "After delivery, click 'Return / Replace'.",
    },
  ];

  // Filter FAQ
  const filteredFaqs = faqs.filter((f) =>
    f.q.toLowerCase().includes(query.toLowerCase())
  );

  // Toggle FAQ
  const toggleFAQ = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  // Handle input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("email", form.email);
      formData.append("issue", form.issue);
      formData.append("file", form.file);

      // TODO: CONNECT BACKEND API HERE
      // await fetch("/api/support", {
      //   method: "POST",
      //   body: formData,
      // });

      setSuccess("✅ Your request has been submitted!");
      setForm({ name: "", email: "", issue: "", file: null });
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Help Center</h2>

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search your issue..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        style={styles.search}
      />

      {/* 📂 FAQ */}
      <h3>FAQs</h3>
      {filteredFaqs.map((f, index) => (
        <div key={index} style={styles.card}>
          <div
            onClick={() => toggleFAQ(index)}
            style={styles.question}
          >
            {f.q}
          </div>
          {activeIndex === index && <p>{f.a}</p>}
        </div>
      ))}

      {/* 📩 Contact Form */}
      <h3 style={{ marginTop: "20px" }}>Contact Support</h3>

      {success && <p style={{ color: "green" }}>{success}</p>}

      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          style={styles.input}
        />

        <textarea
          name="issue"
          placeholder="Describe your issue"
          value={form.issue}
          onChange={handleChange}
          required
          style={styles.textarea}
        />

        {/* 📎 File Upload */}
        <input
          type="file"
          name="file"
          onChange={handleChange}
          style={{ marginTop: "10px" }}
        />

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>

      {/* 📞 Contact Info */}
      <div style={{ marginTop: "30px" }}>
        <h3>Contact Info</h3>
        <p>📧 support@yourapp.com</p>
        <p>📞 +91 9876543210</p>
      </div>
    </div>
  );
}

// Styles
const styles = {
  search: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "8px",
    padding: "10px",
    marginTop: "10px",
  },
  question: {
    fontWeight: "bold",
    cursor: "pointer",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
  },
  textarea: {
    padding: "10px",
    marginTop: "10px",
    borderRadius: "5px",
    minHeight: "100px",
  },
  button: {
    marginTop: "10px",
    padding: "10px",
    background: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
  },
};
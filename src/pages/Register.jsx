import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = form;

    // basic validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find((u) => u.email === email.toLowerCase());
    if (exists) {
      setError("Email already exists!");
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email: email.toLowerCase(),
      role: "Customer",
      joinDate: new Date().getFullYear(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8">Register</h1>

      {error && (
        <p className="mb-4 text-red-500 font-medium">{error}</p>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          name="name"
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          value={form.name}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded"
          value={form.password}
          onChange={handleChange}
        />

        <button className="w-full bg-violet-600 text-white py-3 rounded-xl">
          Register
        </button>
      </form>
    </div>
  );
}
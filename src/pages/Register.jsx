import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    const user = { name, email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Register success");
    navigate("/login");
  };

  return (
    <div className="max-w-md mx-auto py-20">

      <h1 className="text-4xl font-bold mb-8">
        Register
      </h1>

      <form onSubmit={handleRegister}>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setName(e.target.value)}
          required
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-6"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="w-full bg-violet-600 text-white py-3 rounded-xl">
          Register
        </button>

      </form>

    </div>
  );
}
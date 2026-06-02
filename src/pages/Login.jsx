import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    let userData = null;

    // admin account
    if (email === "admin@gmail.com" && password === "1234") {
      userData = {
        id: "admin",
        name: "Admin",
        email,
        role: "admin",
      };
    } else {
      userData = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );

      if (userData) {
        userData = {
          ...userData,
          role: userData.role || "customer",
        };
      }
    }

    if (!userData) {
      alert("Invalid email or password");
      return;
    }

    // save session
    localStorage.setItem("user", JSON.stringify(userData));

    // redirect
    if (userData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8">Login</h1>

      <form onSubmit={handleLogin}>
        <input
          placeholder="Email"
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-3 rounded-xl"
        >
          Login
        </button>
      </form>
    </div>
  );
}
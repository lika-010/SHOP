import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // SIMPLE DEMO LOGIC (replace with backend later)

    let userData = null;

    // 👉 admin login (example)
    if (email === "admin@gmail.com" && password === "1234") {
      userData = {
        id: 1,
        name: "Admin",
        role: "admin",
      };
    }

    // 👉 normal user login
    else if (email === "user@gmail.com" && password === "1234") {
      userData = {
        id: 2,
        name: "User",
        role: "user",
      };
    }

    if (!userData) {
      alert("Invalid email or password");
      return;
    }

    // save user
    localStorage.setItem("user", JSON.stringify(userData));

    // redirect based on role
    if (userData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8">Login</h1>

      <input
        placeholder="Email"
        className="w-full border p-3 rounded mb-4"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full border p-3 rounded mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="w-full bg-violet-600 text-white py-3 rounded-xl"
      >
        Login
      </button>
    </div>
  );
}
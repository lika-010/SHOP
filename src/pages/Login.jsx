import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    setError("");

    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    let userData = null;

    // Admin Account
    if (
      email.toLowerCase() === "admin@gmail.com" &&
      password === "1234"
    ) {
      userData = {
        id: "admin",
        name: "Admin",
        email: "admin@gmail.com",
        role: "admin",
      };
    } else {
      userData = users.find(
        (u) =>
          u.email.toLowerCase() === email.toLowerCase() &&
          u.password === password
      );
    }

    if (!userData) {
      setError("Invalid email or password");
      return;
    }

    localStorage.setItem("user", JSON.stringify(userData));

    if (userData.role === "admin") {
      navigate("/admin");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto py-20 px-4">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8">
          Login
        </h1>

        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-violet-600 hover:bg-violet-700 text-white py-3 rounded-lg"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-5">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-violet-600 font-semibold"
          >
            Register
          </Link>
        </p>

        {/* <div className="mt-6 bg-gray-100 p-4 rounded-lg text-sm">
          <p className="font-semibold mb-2">Admin Account</p>
          <p>Email: admin@gmail.com</p>
          <p>Password: 1234</p>
        </div> */}
      </div>
    </div>
  );
}
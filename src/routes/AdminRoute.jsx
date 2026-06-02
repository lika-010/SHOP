import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  // ⏳ Prevent flicker while auth loads
  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  // ❌ Not logged in → login page
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ❌ Logged in but not admin → home
  if (user.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
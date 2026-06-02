import { useState, useEffect } from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);

  // SAFE PARSE
  const safeParse = (key, fallback) => {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  };

  useEffect(() => {
    const data = safeParse("users", []);
    setUsers(data);
  }, []);

  // ROLE STYLE
  const getRoleStyle = (role) => {
    switch ((role || "").toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-700";
      case "user":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <AdminSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">
          User Management
        </h1>

        {/* EMPTY STATE */}
        {users.length === 0 ? (
          <div className="bg-white p-10 rounded-xl shadow text-center text-gray-500">
            No users found
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow overflow-hidden">

            {/* TABLE */}
            <table className="w-full">

              {/* HEADER */}
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Email</th>
                  <th className="p-4 text-left">Role</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>
                {users.map((user) => (
                  <tr
                    key={user.id}
                    className="border-t hover:bg-gray-50 transition"
                  >

                    {/* NAME */}
                    <td className="p-4 font-medium">
                      {user.name || "Unknown"}
                    </td>

                    {/* EMAIL */}
                    <td className="p-4 text-gray-600">
                      {user.email || "-"}
                    </td>

                    {/* ROLE */}
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getRoleStyle(
                          user.role
                        )}`}
                      >
                        {user.role || "user"}
                      </span>
                    </td>

                    {/* ACTION */}
                    <td className="p-4">
                      <button
                        onClick={() => {
                          const updated = users.filter(
                            (u) => u.id !== user.id
                          );
                          setUsers(updated);
                          localStorage.setItem(
                            "users",
                            JSON.stringify(updated)
                          );
                        }}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>

            </table>

          </div>
        )}

      </div>
    </div>
  );
}
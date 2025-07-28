import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const res = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.message || "Login failed");
        return;
      }

      // Successful login
      const loginData = await res.json();
      console.log("Login successful:", loginData);

      // Fetch user data
      const userRes = await fetch(`http://localhost:8080/api/v1/user/get-user/${email}`);
      if (!userRes.ok) {
        alert("Failed to fetch user data.");
        return;
      }

      const userData = await userRes.json();
      console.log("User data:", userData.user);

      // Navigate to manage account page with user data
      navigate("/manage-account", { state: { user: userData.user } });

    } catch (err) {
      console.error("Error during login:", err);
      alert("An error occurred while logging in.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Login</h1>

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full p-2 border"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full p-2 border"
      />

      <button onClick={login} className="w-full bg-blue-500 text-white p-2 rounded">
        Login
      </button>
    </div>
  );
}

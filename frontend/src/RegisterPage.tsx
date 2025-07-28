import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

export default function RegisterPage() {
  const navigate = useNavigate(); // hook for redirection

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setconfirm_password] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const register = async () => {
    if (password !== confirm_password) {
      alert("Passwords do not match.");
      return;
    }

    const res = await fetch("http://localhost:8080/api/v1/user/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, confirm_password, phone }),
    });

    const data = await res.json();
    alert(data.message);

    if (res.ok) {
      navigate("/login"); // redirect to login page
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Register</h1>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full p-2 border"
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full p-2 border"
      />
      <input
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        className="w-full p-2 border"
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border"
      />
      <input
        placeholder="Confirm Password"
        type="password"
        value={confirm_password}
        onChange={(e) => setconfirm_password(e.target.value)}
        className="w-full p-2 border"
      />

      <button
        onClick={register}
        className="w-full bg-green-500 text-white p-2 rounded"
      >
        Register
      </button>
    </div>
  );
}

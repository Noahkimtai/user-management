import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./App.css";

export default function ManageAccountPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userFromState = location.state?.user || {};

  const [email, setEmail] = useState(userFromState.email || "");
  const [name, setName] = useState(userFromState.name || "");
  const [phone, setPhone] = useState(userFromState.phone || "");
  const [newPassword, setNewPassword] = useState("");
  const [activeView, setActiveView] = useState("main");

  const updateProfile = async () => {
    const res = await fetch(`http://localhost:8080/api/v1/user/update-user/${email}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, phone }),
    });
    const data = await res.json();
    alert(data.message);
    setActiveView("main");
  };

  const deleteAccount = async () => {
    const res = await fetch(`http://localhost:8080/api/v1/user/delete/${email}`, {
      method: "DELETE",
    });
    const data = await res.json();
    alert(data.message);
    navigate("/login");
  };

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Manage Account</h1>

      <input
        placeholder="Email"
        value={email}
        disabled
        className="w-full p-2 border bg-gray-100"
      />

      {activeView === "main" && (
        <div className="space-y-2">
          <button onClick={() => setActiveView("update")} className="w-full bg-yellow-500 text-white p-2 rounded">
            Update Profile
          </button>
          <button onClick={deleteAccount} className="w-full bg-red-500 text-white p-2 rounded">
            Delete Account
          </button>
        </div>
      )}

      {activeView === "update" && (
        <div className="space-y-2">
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border"
          />
          <input
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-2 border"
          />
          <button onClick={updateProfile} className="w-full bg-green-500 text-white p-2 rounded">
            Submit Update
          </button>
          <button onClick={() => setActiveView("main")} className="w-full bg-blue-500 text-white p-2 rounded">
            Back
          </button>
        </div>
      )}

      {activeView === "password" && (
        <div className="space-y-2">
          <input
            placeholder="New Password"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 border"
          />
          <button onClick={changePassword} className="w-full bg-green-500 text-white p-2 rounded">
            Submit Password Change
          </button>
          <button onClick={() => setActiveView("main")} className="w-full bg-blue-500 text-white p-2 rounded">
            Back
          </button>
        </div>
      )}
    </div>
  );
}
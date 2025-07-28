import React from "react";
import { Link } from "react-router-dom";
import "./App.css";

export default function LandingPage() {
  return (
    <div className="p-8 max-w-md mx-auto space-y-4 text-center">
      <h1 className="text-3xl font-bold">Welcome to User Management</h1>
      <p>Please select an option:</p>
      <div className="space-y-2">
        <Link to="/login">
          <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </Link>
        <Link to="/register">
          <button className="w-full bg-green-500 text-white p-2 rounded">Register</button>
        </Link>
      </div>
    </div>
  );
}

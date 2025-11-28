import React, { useState } from "react";
import { loginUser } from "../utils/api"; // API functions
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  // <-- Paste handleSubmit function yahan
  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await loginUser({ email, password });
    
    if (res && res.token) {
      localStorage.setItem("token", res.token);
      setMsg("Login successful!");
      setSuccess(true);
    } else {
      setMsg(res?.error || "Login failed");
      setSuccess(false);
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {msg && <p className={`message ${success ? "success" : "error"}`}>{msg}</p>}
    </div>
  );
};

export default Login;

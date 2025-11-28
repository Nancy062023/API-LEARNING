import React, { useState } from "react";
import { registerUser } from "../utils/api"; // api.js se import

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await registerUser({ name, email, password });

    if (!res) {
      setMsg("Server not reachable!");
      setSuccess(false);
      return;
    }

    if(res.message){
      setMsg(res.message);
      setSuccess(true);
    } else if(res.error){
      setMsg(res.error);
      setSuccess(false);
    } else {
      setMsg("Unknown error occurred");
      setSuccess(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Register</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Register;

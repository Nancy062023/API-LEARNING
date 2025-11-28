import React, { useEffect, useState } from "react";
import { getProfile } from "../utils/api";
import "../App.css";

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    if(token){
      getProfile(token).then(res=>{
        if(res.user) setUser(res.user);
      });
    }
  }, [token]);

  if(!token) return <div className="container"><p>Please login to see profile</p></div>;

  return (
    <div className="container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p><strong>ID:</strong> {user.id}</p>
          <p><strong>Email:</strong> {user.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;

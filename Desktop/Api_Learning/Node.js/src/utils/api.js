const BASE_URL = "http://localhost:5000"; // backend URL

export const registerUser = async (userData) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (error) {
    console.error("Register error:", error);
  }
};

export const loginUser = async (userData) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await res.json();
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const getProfile = async (token) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/profile`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    return await res.json();
  } catch (error) {
    console.error("Get profile error:", error);
  }
};

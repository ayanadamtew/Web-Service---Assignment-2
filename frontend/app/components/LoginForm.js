import axios from "axios";
import { useState } from "react";

export default function LoginForm({
  backend = "http://localhost:4000",
  onSuccess,
}) {
  const [username, setUsername] = useState(
    process.env.DEMO_USERNAME || "student"
  );
  const [password, setPassword] = useState(
    process.env.DEMO_PASSWORD || "password123"
  );
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(null);

  const login = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr(null);
    try {
      const res = await axios.post(`${backend}/auth/login`, {
        username,
        password,
      });
      onSuccess(res.data.token);
    } catch (error) {
      setErr(error.response?.data?.error || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={login} style={{ marginBottom: "1rem" }}>
      <div>
        <label>Username: </label>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
        <label>Password: </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button disabled={loading} type="submit">
        Log in
      </button>
      {err && <div style={{ color: "red" }}>{err}</div>}
    </form>
  );
}

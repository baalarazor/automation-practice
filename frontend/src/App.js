import { useEffect, useState } from "react";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

function App() {
  const [msg, setMsg] = useState("Loading...");

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/ping`)
      .then((res) => res.json())
      .then((data) => setMsg(data.message))
      .catch(() => setMsg("Error connecting to backend"));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Automation Practice</h1>
      <p>Backend says: {msg}</p>
    </div>
  );
}

export default App;
// redeploy

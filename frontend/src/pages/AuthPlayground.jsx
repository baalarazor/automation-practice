import { useState } from "react";
import { apiLogin } from "../api";

export default function AuthPlayground() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    try {
      const data = await apiLogin(email, password);
      setIsLoggedIn(true);
      setUserEmail(data.user?.email || email);
      setToken(data.token);
      setMessage(data.message || "Login successful");
    } catch (err) {
      setIsLoggedIn(false);
      setUserEmail("");
      setToken("");
      setMessage(err.message);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserEmail("");
    setToken("");
    setMessage("Logged out");
  };

  return (
    <div className="page">
      <h1>Auth Playground (Guest vs Logged-in)</h1>

      <section className="section">
        <h2>Guest vs Logged-in view</h2>
        <p>
          This page uses a real backend call to <code>/api/auth/login</code>.
          Valid: <code>test@automation.com / password123</code>
        </p>

        <div className="auth-grid">
          <div className="auth-card">
            <h3>Current state</h3>
            <p>
              Status:{" "}
              <strong className={isLoggedIn ? "tag tag-success" : "tag tag-muted"}>
                {isLoggedIn ? "Logged in" : "Guest"}
              </strong>
            </p>
            {isLoggedIn ? (
              <>
                <p data-testid="user-email">
                  Logged in as <strong>{userEmail}</strong>
                </p>
                <p data-testid="user-token">
                  Token: <code>{token}</code>
                </p>
              </>
            ) : (
              <p data-testid="guest-message">
                You are browsing as a <strong>guest user</strong>.
              </p>
            )}
            {message && <p style={{ marginTop: 8 }}>{message}</p>}
          </div>

          <div className="auth-card">
            <h3>{isLoggedIn ? "Actions for logged-in user" : "Login form"}</h3>
            {!isLoggedIn ? (
              <form className="stack" onSubmit={handleLogin}>
                <label>
                  Email
                  <input
                    name="email"
                    type="email"
                    placeholder="test@automation.com"
                    data-testid="login-email"
                  />
                </label>
                <label>
                  Password
                  <input
                    name="password"
                    type="password"
                    placeholder="password123"
                    data-testid="login-password"
                  />
                </label>
                <div className="inline">
                  <button type="submit" data-testid="login-submit">
                    Login (calls backend)
                  </button>
                  <button
                    type="button"
                    className="btn-ghost"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setUserEmail("");
                      setToken("");
                      setMessage("Continuing as guest");
                    }}
                    data-testid="login-guest"
                  >
                    Continue as guest
                  </button>
                </div>
              </form>
            ) : (
              <div className="stack">
                <button
                  type="button"
                  className="btn-danger"
                  onClick={handleLogout}
                  data-testid="logout-button"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import {
  apiGetDelayedMessage,
  apiGetFlakyResult,
  apiProtectedFormSubmit
} from "../api";

export default function ChallengesPlayground() {
  // Delayed
  const [delayMs, setDelayMs] = useState(3000);
  const [delayStatus, setDelayStatus] = useState("idle");
  const [delayMessage, setDelayMessage] = useState("");

  // Flaky
  const [flakyStatus, setFlakyStatus] = useState("idle");
  const [flakyMessage, setFlakyMessage] = useState("");
  const [flakySuccessCount, setFlakySuccessCount] = useState(0);
  const [flakyFailureCount, setFlakyFailureCount] = useState(0);

  // Protected form
  const [token, setToken] = useState("");
  const [protectedResult, setProtectedResult] = useState(null);
  const [protectedError, setProtectedError] = useState("");

  const handleDelayedCall = async () => {
    setDelayStatus("loading");
    setDelayMessage("");
    try {
      const data = await apiGetDelayedMessage(delayMs);
      setDelayStatus("success");
      setDelayMessage(
        `Success after ${data.delayMs}ms: ${data.message || ""}`
      );
    } catch (err) {
      setDelayStatus("error");
      setDelayMessage(err.message);
    }
  };

  const handleFlakyCall = async () => {
    setFlakyStatus("loading");
    setFlakyMessage("");
    try {
      const data = await apiGetFlakyResult();
      setFlakyStatus("success");
      setFlakyMessage(data.message || "Success");
      setFlakySuccessCount((c) => c + 1);
    } catch (err) {
      setFlakyStatus("error");
      setFlakyMessage(err.message);
      setFlakyFailureCount((c) => c + 1);
    }
  };

  const handleProtectedSubmit = async (e) => {
    e.preventDefault();
    setProtectedError("");
    setProtectedResult(null);

    const form = new FormData(e.currentTarget);
    const payload = {
      comment: form.get("comment"),
      severity: form.get("severity"),
      tags: form.getAll("tags")
    };

    try {
      const data = await apiProtectedFormSubmit(token, payload);
      setProtectedResult(data);
    } catch (err) {
      setProtectedError(err.message);
    }
  };

  return (
    <div className="page">
      <h1>Automation Challenges</h1>
      <p>
        Use this page for advanced UI + API automation: delayed responses,
        flaky APIs, and auth-protected forms.
      </p>

      {/* Level 1: Delayed endpoint */}
      <section className="section">
        <h2>Level 1 · Delayed responses</h2>
        <p>
          Call an endpoint that deliberately waits before responding. Great for
          practicing explicit waits.
        </p>
        <div className="two-column">
          <label>
            Delay (ms)
            <input
              type="number"
              min="500"
              max="10000"
              value={delayMs}
              onChange={(e) => setDelayMs(e.target.value)}
              data-testid="delay-input"
            />
          </label>
          <div className="stack">
            <button
              type="button"
              onClick={handleDelayedCall}
              disabled={delayStatus === "loading"}
              data-testid="btn-delay-call"
            >
              {delayStatus === "loading"
                ? "Waiting for response..."
                : "Call delayed endpoint"}
            </button>
            {delayMessage && (
              <p
                style={{
                  fontSize: "0.85rem",
                  color:
                    delayStatus === "error" ? "salmon" : "rgb(74,222,128)"
                }}
                data-testid="delay-message"
              >
                {delayMessage}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Level 2: Flaky endpoint */}
      <section className="section section-muted">
        <h2>Level 2 · Flaky API</h2>
        <p>
          This endpoint randomly fails about 50% of the time. Use it to practice
          retries, error handling, and assertions on status codes.
        </p>
        <div className="inline" style={{ marginBottom: "0.5rem" }}>
          <button
            type="button"
            onClick={handleFlakyCall}
            disabled={flakyStatus === "loading"}
            data-testid="btn-flaky-call"
          >
            {flakyStatus === "loading" ? "Calling..." : "Call flaky endpoint"}
          </button>
          <span style={{ fontSize: "0.85rem" }}>
            Successes:{" "}
            <strong style={{ color: "rgb(74,222,128)" }}>
              {flakySuccessCount}
            </strong>{" "}
            · Failures:{" "}
            <strong style={{ color: "salmon" }}>{flakyFailureCount}</strong>
          </span>
        </div>
        {flakyMessage && (
          <p
            style={{
              fontSize: "0.85rem",
              color: flakyStatus === "error" ? "salmon" : "rgb(74,222,128)"
            }}
            data-testid="flaky-message"
          >
            {flakyMessage}
          </p>
        )}
      </section>

      {/* Level 3: Auth-protected form */}
      <section className="section">
        <h2>Level 3 · Auth-protected form</h2>
        <p>
          This form calls <code>/api/forms/protected-submit</code> which
          <strong> requires a valid token.</strong> Get one by calling{" "}
          <code>/api/auth/login</code> with{" "}
          <code>test@automation.com / password123</code>.
        </p>

        <div className="two-column full-width">
          <label>
            Token
            <input
              type="text"
              placeholder="Paste: fake-jwt-token-123"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              data-testid="protected-token"
            />
          </label>
        </div>

        <form onSubmit={handleProtectedSubmit}>
          <div className="two-column">
            <label>
              Comment
              <input
                name="comment"
                type="text"
                placeholder="Something about this test..."
                data-testid="protected-comment"
              />
            </label>
            <label>
              Severity
              <select name="severity" data-testid="protected-severity">
                <option value="">Select</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <fieldset className="full-width">
              <legend>Tags</legend>
              <label>
                <input type="checkbox" name="tags" value="ui" />
                UI
              </label>
              <label>
                <input type="checkbox" name="tags" value="api" />
                API
              </label>
              <label>
                <input type="checkbox" name="tags" value="e2e" />
                E2E
              </label>
            </fieldset>
          </div>

          <button
            type="submit"
            style={{ marginTop: "1rem" }}
            data-testid="btn-protected-submit"
          >
            Submit protected form
          </button>
        </form>

        {protectedError && (
          <p
            style={{ marginTop: "0.75rem", color: "salmon" }}
            data-testid="protected-error"
          >
            Error: {protectedError}
          </p>
        )}

        {protectedResult && (
          <div
            className="section section-muted"
            style={{ marginTop: "1rem" }}
          >
            <h3>Protected backend response</h3>
            <pre
              style={{
                fontSize: "0.8rem",
                overflowX: "auto"
              }}
              data-testid="protected-result"
            >
              {JSON.stringify(protectedResult, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}

import { useState } from "react";
import { apiSubmitForm } from "../api";

export default function FormPlayground() {
  const [rangeValue, setRangeValue] = useState(50);
  const [sliderValue, setSliderValue] = useState(25);
  const [submitResult, setSubmitResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitResult(null);

    const form = new FormData(e.currentTarget);

    const payload = {
      text: form.get("text-basic"),
      password: form.get("text-password"),
      email: form.get("text-email"),
      number: form.get("text-number"),
      textarea: form.get("textarea"),
      tool: form.get("tool"),
      platforms: form.getAll("platform"),
      difficulty: form.get("difficulty"),
      types: form.getAll("types"),
      date: form.get("date"),
      time: form.get("time"),
      datetime: form.get("datetime"),
      range: rangeValue,
      slider: sliderValue
    };

    try {
      const res = await apiSubmitForm(payload);
      setSubmitResult(res);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h1>Form Controls Playground</h1>
      <p>
        This page contains a wide variety of input controls. At the bottom,
        submitting will send all data to <code>/api/forms/submit</code>.
      </p>

      <form onSubmit={handleSubmit}>
        {/* Basic inputs */}
        <section className="section">
          <h2>Basic text inputs</h2>
            <div className="two-column" style={{ marginTop: "14px" }}>
            <label>
              Text input
              <input
                name="text-basic"
                type="text"
                placeholder="Regular text"
                data-testid="text-basic"
              />
            </label>
            <label>
              Password
              <input
                name="text-password"
                type="password"
                placeholder="Password"
                data-testid="text-password"
              />
            </label>
            <label>
              Email
              <input
                name="text-email"
                type="email"
                placeholder="user@example.com"
                data-testid="text-email"
              />
            </label>
            <label>
              Number
              <input
                name="text-number"
                type="number"
                min="0"
                max="999"
                data-testid="text-number"
              />
            </label>
            <label className="full-width">
              Multiline textarea
              <textarea
                name="textarea"
                rows={3}
                placeholder="Write your long text here..."
                data-testid="textarea"
              />
            </label>
          </div>
        </section>

        {/* Radios & checkboxes */}
        <section className="section section-muted radio-checkbox-section">
        <h2>Radio buttons & checkboxes</h2>
          <div className="two-column">
            <fieldset>
              <legend>Preferred automation tool (radio)</legend>
              <label>
                <input type="radio" name="tool" value="selenium" />
                Selenium
              </label>
              <label>
                <input type="radio" name="tool" value="playwright" />
                Playwright
              </label>
              <label>
                <input type="radio" name="tool" value="cypress" />
                Cypress
              </label>
            </fieldset>

            <fieldset>
              <legend>Platforms you test on (checkbox)</legend>
              <label>
                <input type="checkbox" name="platform" value="web" />
                Web
              </label>
              <label>
                <input type="checkbox" name="platform" value="android" />
                Android
              </label>
              <label>
                <input type="checkbox" name="platform" value="ios" />
                iOS
              </label>
            </fieldset>
          </div>
        </section>

        {/* Dropdowns */}
        <section className="section">
          <h2>Dropdowns</h2>
          <div className="two-column">
            <label>
              Single select
              <select name="difficulty" data-testid="select-single">
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </label>

            <label>
              Multi select (Ctrl/Cmd + click)
              <select
                multiple
                name="types"
                data-testid="select-multi"
                size={4}
              >
                <option value="ui">UI tests</option>
                <option value="api">API tests</option>
                <option value="e2e">End to end</option>
                <option value="perf">Performance</option>
              </select>
            </label>
          </div>
        </section>

        {/* Dates & sliders */}
        <section className="section section-muted">
          <h2>Date, time & sliders</h2>
          <div className="two-column">
            <label>
              Date
              <input name="date" type="date" data-testid="date" />
            </label>
            <label>
              Time
              <input name="time" type="time" data-testid="time" />
            </label>
            <label>
              Date &amp; time
              <input
                name="datetime"
                type="datetime-local"
                data-testid="datetime"
              />
            </label>
            <label>
              Range (0–100) • Current: {rangeValue}
              <input
                type="range"
                min="0"
                max="100"
                value={rangeValue}
                onChange={(e) => setRangeValue(e.target.value)}
                data-testid="range"
              />
            </label>
            <label>
              Slider (0–50) • Current: {sliderValue}
              <input
                type="range"
                min="0"
                max="50"
                value={sliderValue}
                onChange={(e) => setSliderValue(e.target.value)}
                data-testid="slider"
              />
            </label>
          </div>
        </section>

        <section className="section">
          <button type="submit">Submit form (calls backend)</button>
        </section>

        {error && (
          <section className="section section-muted">
            <p style={{ color: "salmon" }}>Error: {error}</p>
          </section>
        )}

        {submitResult && (
          <section className="section section-muted">
            <h3>Backend response</h3>
            <pre style={{ fontSize: "0.8rem", overflowX: "auto" }}>
              {JSON.stringify(submitResult, null, 2)}
            </pre>
          </section>
        )}
      </form>
    </div>
  );
}

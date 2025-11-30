import { useLanguage } from "../languageContext";
import Seo from "../Seo";

export default function Home() {
  return (
    <div className="page">
    <Seo
      title="Automation Bible – UI & API Automation Testing Practice Site"
      description="Practice UI automation, API testing, iframes, waits, file uploads, auth flows and more on Automation Bible – a free playground for QA engineers and SDETs."
    />
      <section className="hero-section">
        <h1>Automation Practice Playground</h1>
        <p>
          Use this site to practice UI automation, backend API calls, iframes,
          mouse actions, and more — with both guest and simulated logged-in states.
        </p>
        <div className="hero-grid">
          <div className="hero-card">
            <h2>Guest vs Logged-in</h2>
            <p>
              Toggle between guest and logged-in views, and assert different
              elements and flows.
            </p>
          </div>
          <div className="hero-card">
            <h2>Rich Form Elements</h2>
            <p>
              Text inputs, radios, checkboxes, dropdowns, sliders, date pickers,
              and more — all in one place.
            </p>
          </div>
          <div className="hero-card">
            <h2>Interactive Challenges</h2>
            <p>
              File uploads, drag &amp; drop, mouse hover, right-click, double
              click, alerts, and modals.
            </p>
          </div>
          <div className="hero-card">
            <h2>iFrame Scenarios</h2>
            <p>
              Inner flows nested in iframes to practice frame switching and
              context handling.
            </p>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>How testers can use this</h2>
        <ul className="bulleted-list">
          <li>Practice locators on complex forms with multiple control types.</li>
          <li>Write end-to-end flows across pages and iframes.</li>
          <li>Mock backend calls with tools like Postman or automation frameworks.</li>
          <li>Experiment with waits, synchronization, and flaky behavior (you can add later).</li>
        </ul>
      </section>

      <section className="section section-muted">
        <h2>Navigation overview</h2>
        <div className="feature-columns">
          <div>
            <h3>/auth</h3>
            <p>
              Simulated login / logout, guest mode, and conditional rendering
              based on user state.
            </p>
          </div>
          <div>
            <h3>/forms</h3>
            <p>
              All common HTML form controls, grouped and labeled for easy
              locator practice.
            </p>
          </div>
          <div>
            <h3>/files</h3>
            <p>Single &amp; multiple uploads, drag &amp; drop zone UI.</p>
          </div>
          <div>
            <h3>/mouse</h3>
            <p>Hover boxes, double-click items, right-click context hints.</p>
          </div>
          <div>
            <h3>/alerts</h3>
            <p>Buttons that trigger JS alerts, confirm-like flows, modals.</p>
          </div>
          <div>
            <h3>/iframes</h3>
            <p>Nested mini-flows in iframes to test context switching.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

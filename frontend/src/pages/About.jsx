import { useLanguage } from "../languageContext";
import Seo from "../Seo";
export default function About() {
  const { lang } = useLanguage();

  const text = {
    en: {
      title: "About Me",
      subtitle: "Hi, I'm Baala! 👋",
      bio: `I'm a Lead SDET and Automation Engineer with 9+ years of experience building automation frameworks, delivering high-quality software, and helping teams test smarter using modern tooling and AI.`,
      missionTitle: "Mission with Automation Bible",
      mission: `I created this platform to give QA professionals a real playground to practice UI automation, API testing, waits, iFrames, file uploads, auth workflows, and more — just like real-world systems.`,
      skillsTitle: "Tech I Work With",
      contactTitle: "Connect with me",
    },
    de: {
      title: "Über mich",
      subtitle: "Hallo, ich bin Baala! 👋",
      bio: `Ich bin ein Lead SDET und Automatisierungsingenieur mit mehr als 9 Jahren Erfahrung im Aufbau von Testautomatisierungs-Frameworks und der Qualitätssicherung mit modernen Tools und KI.`,
      missionTitle: "Mission mit Automation Bible",
      mission: `Ich habe diese Website erstellt, um QA-Testern einen echten Ort zu geben, an dem sie UI- und API-Testautomatisierung, iFrames, Uploads, Auth-Flow und Wartebedingungen wie in echten Systemen üben können.`,
      skillsTitle: "Technologien",
      contactTitle: "Kontakt",
    }
  };

  const t = text[lang];

  return (
    <div className="page">
    <Seo
      title="About Baala – Creator of Automation Bible"
      description="Baala is a Lead SDET helping QA engineers and SDETs practice real-world automation scenarios with Automation Bible."
    />
      <section className="hero-section">
        <h1>{t.title}</h1>

        <div
          style={{
            marginTop: "1rem",
            padding: "1.5rem",
            background: "rgba(255,255,255,0.05)",
            borderRadius: "12px",
            textAlign: "center"
          }}
        >
          <h2 style={{ marginBottom: "0.2rem" }}>{t.subtitle}</h2>
          <p style={{ maxWidth: "600px", margin: "0 auto", lineHeight: "1.6" }}>
            {t.bio}
          </p>
        </div>
      </section>

      <section className="section">
        <h2>{t.missionTitle}</h2>
        <p style={{ maxWidth: "700px", lineHeight: "1.6" }}>
          {t.mission}
        </p>
      </section>

      <section className="section section-muted">
        <h2>{t.skillsTitle}</h2>

        <div className="badge-grid">
          {[
            "Selenium",
            "Playwright",
            "Cypress",
            "WebDriverIO",
            "Postman",
            "Appium",
            "REST",
            "GraphQL",
            "CI/CD",
            "Docker",
            "Java",
            "JavaScript",
            "Node.js",
            "React",
            "Python",
            "K6 / Load Test"
          ].map((skill) => (
            <span key={skill} className="badge">{skill}</span>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>{t.contactTitle}</h2>

        <div className="contact-links">
          <a href="https://github.com/baalarazor" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://linkedin.com/in/baala" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="mailto:scbaala@gmail.com">Email</a>
        </div>
      </section>
    </div>
  );
}

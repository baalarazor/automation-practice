import { useLanguage } from "../languageContext";
import Seo from "../Seo";

export default function About() {
  const { lang } = useLanguage();

  const t = {
    en: {
      title: "About Me",
      greeting: "👋 Hi, I’m Baala!",
      bio: `I'm a Lead SDET with 9+ years of experience in automation testing, building frameworks, improving test efficiency, and enabling QA teams to scale confidently.`,
      missionTitle: "Why I Built Automation Bible",
      mission: `I wanted to create a real automation playground — not just a demo form. Real login flow, file uploads, iFrames, flaky systems, delayed responses, and backend validation are the real challenges testers face.`,
      skillsTitle: "Skills & Tools",
      contact: "Connect With Me",
    },
    de: {
      title: "Über mich",
      greeting: "👋 Hallo, ich bin Baala!",
      bio: `Ich bin Lead SDET mit über 9 Jahren Erfahrung in Testautomatisierung, Framework-Entwicklung und QA-Enablement.`,
      missionTitle: "Warum Automation Bible?",
      mission: `Ich wollte einen echten Testspielplatz schaffen – mit Login, iFrames, Uploads, verzögerten Antworten und realistischen API-Flows.`,
      skillsTitle: "Fähigkeiten & Tools",
      contact: "Kontakt",
    }
  };

  const text = t[lang];

  return (
    <div className="page">
      <Seo
        title="About Baala – Creator of Automation Bible"
        description="Learn more about Baala, creator of Automation Bible and experienced Lead SDET passionate about automation testing and training."
      />

      <h1>{text.title}</h1>

      <div className="about-wrapper">
        <img
          src="/profile.jpg"
          alt="Profile of Baala"
          className="profile-photo"
        />

        <div className="about-text">
          <h2>{text.greeting}</h2>
          <p>{text.bio}</p>
        </div>
      </div>

      <section className="section">
        <h2>{text.missionTitle}</h2>
        <p>{text.mission}</p>
      </section>

      <section className="section">
        <h2>{text.skillsTitle}</h2>
        <div className="badge-grid">
          {[
            "Selenium",
            "Playwright",
            "Cypress",
            "WebDriverIO",
            "Appium",
            "Java",
            "JavaScript",
            "Node.js",
            "React",
            "Postman",
            "REST",
            "GraphQL",
            "CI/CD",
            "Docker",
            "K6",
          ].map((item) => (
            <span className="badge" key={item}>
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="section section-muted">
        <h2>{text.contact}</h2>

        <div className="contact-links">
          <a href="https://www.linkedin.com/in/baala-murugan/" target="_blank">LinkedIn</a>
          <a href="https://github.com/baalarazor" target="_blank">GitHub</a>
          <a href="mailto:scbaala@gmail.com">Email</a>
        </div>
      </section>
    </div>
  );
}

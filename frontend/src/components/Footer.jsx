import { useLanguage } from "../languageContext";

export default function Footer() {
  const { lang } = useLanguage();

  const label = lang === "de" ? "Erstellt von" : "Created by";

  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="creator-badge-footer">
          <img src="/profile.jpg" alt="Profile" className="creator-avatar-footer" />
          <div>
            <span className="creator-text-footer">
              {label} <strong>Baala</strong>
            </span>
            <a
              className="creator-link-footer"
              href="https://www.linkedin.com/in/baala-murugan/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn →
            </a>
          </div>
        </div>

        <div className="footer-copy">
          © {new Date().getFullYear()} Automation Bible — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

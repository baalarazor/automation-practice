import NavItem from "./NavItem";
import { useLanguage } from "../languageContext";
import { useTheme } from "../themeContext";


export default function Header() {
  const { lang, setLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();


  const labels = {
    home: lang === "de" ? "Startseite" : "Home",
    auth: lang === "de" ? "Authentifizierung" : "Auth",
    forms: lang === "de" ? "Formulare" : "Forms",
    files: lang === "de" ? "Dateien" : "Files",
    mouse: lang === "de" ? "Mausaktionen" : "Mouse",
    alerts: lang === "de" ? "Warnungen" : "Alerts",
    iframes: lang === "de" ? "iFrames" : "iFrames",
    challenges: lang === "de" ? "Challenges" : "Challenges",
    subtitle:
      lang === "de" ? "Übungs-Labor für Tester" : "Practice Lab",
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="logo-area">
          <span className="logo-dot">A</span>
          <div className="logo-text">
            <div className="logo-title">Automation Bible</div>
            <div className="logo-subtitle">{labels.subtitle}</div>
          </div>
        </div>
        <nav className="main-nav">
          <NavItem to="/">{labels.home}</NavItem>
          <NavItem to="/auth">{labels.auth}</NavItem>
          <NavItem to="/forms">{labels.forms}</NavItem>
          <NavItem to="/files">{labels.files}</NavItem>
          <NavItem to="/mouse">{labels.mouse}</NavItem>
          <NavItem to="/alerts">{labels.alerts}</NavItem>
          <NavItem to="/iframes">{labels.iframes}</NavItem>
          <NavItem to="/challenges">{labels.challenges}</NavItem>
          <NavItem to="/about">{lang === "de" ? "Über mich" : "About"}</NavItem>

          <div className="lang-toggle">
            <button
              type="button"
              className={
                "lang-btn" + (lang === "en" ? " lang-btn-active" : "")
              }
              onClick={() => setLang("en")}
            >
              EN
            </button>
            <button
              type="button"
              className={
                "lang-btn" + (lang === "de" ? " lang-btn-active" : "")
              }
              onClick={() => setLang("de")}
            >
              DE
            </button>
          </div>

          <div className="theme-toggle">
             <button
                type="button"
                className="theme-btn"
                onClick={toggleTheme}
                aria-label="Toggle theme"
             >
            {theme === "dark" ? "☾" : "☀"}
            </button>
         </div>
        </nav>
      </div>
    </header>
  );
}

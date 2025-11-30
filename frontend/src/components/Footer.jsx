import { useLanguage } from "../languageContext";

export default function Footer() {
  const { lang } = useLanguage();

  const label = lang === "de" ? "Erstellt von" : "Created by";

  // Share URLs
  const shareText = encodeURIComponent(
    "Practice UI & API test automation at Automation Bible 💻🚀"
  );
  const shareUrl = encodeURIComponent("https://automation-bible.com");

  const shareLinks = {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${shareText}%20${shareUrl}`,
  };

  return (
    <footer className="footer">
      <div className="footer-inner">

        {/* Creator Badge */}
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

        {/* Share Icons */}
        <div className="share-icons">
          <span>{lang === "de" ? "Teilen:" : "Share:"}</span>
          <a href={shareLinks.linkedin} target="_blank" aria-label="Share on LinkedIn">🔗</a>
          <a href={shareLinks.twitter} target="_blank" aria-label="Share on X">🐦</a>
          <a href={shareLinks.whatsapp} target="_blank" aria-label="Share on WhatsApp">📱</a>
        </div>

        {/* Copyright */}
        <div className="footer-copy">
          © {new Date().getFullYear()} Automation Bible — All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}

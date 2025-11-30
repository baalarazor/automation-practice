# 🚀 Automation Bible  
*A free playground for QA Engineers, Testers, and SDETs to practice UI automation, API testing, waits, iFrames, authentication flows, flaky behavior, file uploads, and more.*

🌍 **Live URL:** https://automation-bible.com  
💻 **Tech Stack:** React, Node.js, Express, REST API, Vercel, Render  
🔧 **Best suited for:** Selenium, Playwright, Cypress, Appium, WebDriverIO, Puppeteer, K6  

---

## 💡 Why This Exists

Automation testers often struggle to find realistic environments to practice.  
**Automation Bible** provides real UI + backend interactions, not just dummy fields.

---

## 📍 Available Practice Pages

| Page | URL | What You Can Practice |
|------|-----|------------------------|
| 🏠 Home | `/` | Overview |
| 🔐 Auth | `/auth` | Login, session behavior |
| 🧾 Forms | `/forms` | Inputs, dropdowns, dates, sliders |
| 📁 File Uploads | `/files` | Multi-upload & drag-drop |
| 🖱 Mouse Actions | `/mouse` | Hover, right-click, double-click |
| ⚠ Alerts | `/alerts` | alert(), confirm(), modals |
| 🪟 iFrames | `/iframes` | Interactions inside iFrames |
| 🧪 Challenges | `/challenges` | Flaky API, delayed responses, auth-only requests |
| 👤 About | `/about` | About the creator |

---

## 🧪 API Reference

| Method | Endpoint | Purpose |
|--------|----------|---------|
| `POST` | `/api/auth/login` | Get token |
| `POST` | `/api/forms/submit` | Submit open form |
| `POST` | `/api/files/upload` | File upload |
| `GET` | `/api/challenges/delayed-message` | Wait-based response |
| `GET` | `/api/challenges/flaky` | Random error/success |
| `POST` | `/api/forms/protected-submit` | Token required |

---

## 🎯 Learning Paths

| Level | Start Here | Focus |
|-------|-----------|--------|
| Beginner | `/forms`, `/files` | Locators + waits |
| Intermediate | `/auth`, `/iframes` | Auth flows & frame handling |
| Advanced | `/challenges` | Flaky + delayed behavior |
| Expert | End-to-end | Full automation project |

---

## 🛠 Running Locally

```sh
git clone https://github.com/YOUR-USERNAME/automation-practice.git

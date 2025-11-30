# automation-practice
🚀 Automation Bible

A free playground for QA Engineers, Testers, and SDETs to practice UI automation, API testing, waits, iFrames, authentication flows, flaky behavior, file uploads, and more.

🌍 Live URL: https://automation-bible.com

💻 Tech Stack: React, Node.js, Express, REST API, Vercel, Render
🔧 Best suited for: Selenium, Playwright, Cypress, Appium, WebDriverIO, TestCafe, Puppeteer, K6

💡 Why This Exists

Automation testers often struggle to find realistic practice environments beyond simple forms or static demo sites.
Automation Bible solves that by providing:

Real API calls

Authentication flows

Dynamic elements

Wait-based challenges

Flaky and delayed responses

iFrame interactions

File uploads

Responsive UI

Different paths for logged-in vs guest users

Perfect for learning or interview preparation.

📍 Available Practice Pages
Page	URL	What You Can Practice
🏠 Home	/	Overview of site
🔐 Auth Playground	/auth	Login, guest mode, session behavior
🧾 Forms Playground	/forms	All major input types, validation, submission API
📁 File Uploads	/files	Single & multiple upload, drag & drop
🖱 Mouse Actions	/mouse	Hover, right-click, double-click events
⚠ Alerts Playground	/alerts	JavaScript alerts, confirm dialogs, modals
🪟 iFrame Playground	/iframes	Working inside iframes
🧪 Challenges	/challenges	Delayed responses, flaky API, auth-protected API
👤 About	/about	Information about the creator
🔥 Key Challenge Features
Feature	Description
⏳ Delayed backend response	Test explicit waits
🎲 Random flaky failures	Retry logic practice
🔒 Auth-protected endpoints	Token-based flows
🧩 Multi-step interaction challenges	Real-world automation complexity
📡 Backend API Endpoints
Method	Endpoint	Purpose
POST	/api/auth/login	Get token (required for protected routes)
GET	/api/auth/profile	Validate login token
POST	/api/forms/submit	Submit open form
POST	/api/forms/protected-submit	Requires token
POST	/api/files/upload	Upload one or multiple files
GET	/api/challenges/delayed-message	Responds after a delay
GET	/api/challenges/flaky	Random error or success
🧪 Suggested Learning Tracks
Level	Practice Page	Learning Focus
Beginner	/forms, /files	Locators, waits, uploads
Intermediate	/iframes, /auth	Cross-context automation
Advanced	/challenges	Synchronization + resilience
Expert	Build end-to-end across pages	Full automation scenario
🛠 How to Run Locally
git clone https://github.com/<your-username>/automation-practice.git
cd automation-practice

Backend
cd backend
npm install
npm start


(Default runs on http://localhost:5000)

Frontend
cd frontend
npm install
npm start


(Default runs on http://localhost:3000)

🌍 Deployment
Service	Purpose
Vercel	Deploys frontend
Render	Deploys backend

Both update automatically when pushing to GitHub.

🎯 Roadmap

 Data Table CRUD Page

 Dark/Light mode toggle

 Multi-language expansion (FR, ES)

 Advanced challenge levels (Timer UI, Captcha-like task, Fake OTP flow)

 Public API documentation with Swagger

👋 About The Creator

Hi, I’m Baala, a Lead SDET with 9+ years in automation engineering.

I built Automation Bible to help testers learn real-world automation skills—not just click basic input fields.

🔗 Connect with me:

🔹 LinkedIn: https://linkedin.com/in/baala

🔹 GitHub: https://github.com/baalarazor

📩 Email: scbaala@gmail.com

⭐ Contributions & Ideas

Is something missing?

New UI elements?

Harder automation problems?

Randomized state?

Device/browser grid?

➡️ Open an issue or submit a PR — collaboration welcome.

❤️ If this helps you, give the repo a Star ⭐

It motivates future updates & helps others discover the project.
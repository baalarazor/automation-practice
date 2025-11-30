import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";
import { LanguageProvider } from "./languageContext";
import { ThemeProvider } from "./themeContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <LanguageProvider>
       <ThemeProvider>
      <App />
      </ThemeProvider>
    </LanguageProvider>
  </BrowserRouter>
);

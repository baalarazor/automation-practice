import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import AuthPlayground from "./pages/AuthPlayground";
import FormPlayground from "./pages/FormPlayground";
import FileUploadPlayground from "./pages/FileUploadPlayground";
import MouseActionsPlayground from "./pages/MouseActionsPlayground";
import AlertsPlayground from "./pages/AlertsPlayground";
import IframePlayground from "./pages/IframePlayground";
import ChallengesPlayground from "./pages/ChallengesPlayground";
import About from "./pages/About";
import Footer from "./components/Footer";


function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<AuthPlayground />} />
        <Route path="/forms" element={<FormPlayground />} />
        <Route path="/files" element={<FileUploadPlayground />} />
        <Route path="/mouse" element={<MouseActionsPlayground />} />
        <Route path="/alerts" element={<AlertsPlayground />} />
        <Route path="/iframes" element={<IframePlayground />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/challenges" element={<ChallengesPlayground />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Layout>
  );
}

export default App;

import { useState } from "react";
import { apiUploadFiles } from "../api";

export default function FileUploadPlayground() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState("");

  const setFilesFromEvent = (fileList) => {
    const files = Array.from(fileList || []);
    setSelectedFiles(files);
  };

  const handleFileChange = (e) => {
    setFilesFromEvent(e.target.files);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFilesFromEvent(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleUpload = async () => {
    setError("");
    setUploadResult(null);
    try {
      if (!selectedFiles.length) {
        setError("Please select at least one file");
        return;
      }
      const res = await apiUploadFiles(selectedFiles);
      setUploadResult(res);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page">
      <h1>File Upload Playground</h1>
      <p>
        Single and multiple file inputs plus a drag &amp; drop zone. Upload hits
        <code> /api/files/upload</code>.
      </p>

      <section className="section">
        <h2>Standard file inputs</h2>
        <div className="two-column">
          <label>
            Single file
            <input
              type="file"
              onChange={handleFileChange}
              data-testid="file-single"
            />
          </label>

          <label>
            Multiple files
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              data-testid="file-multiple"
            />
          </label>
        </div>
      </section>

      <section className="section section-muted">
        <h2>Drag &amp; drop area</h2>
        <div
          className={
            "drop-zone" + (dragActive ? " drop-zone-active" : "")
          }
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          data-testid="drop-zone"
        >
          <p>Drag &amp; drop files here, or use the inputs above.</p>
        </div>

        {selectedFiles.length > 0 && (
          <div className="file-list">
            <h3>Selected files</h3>
            <ul>
              {selectedFiles.map((file, idx) => (
                <li key={idx}>
                  <span>{file.name}</span> ({file.type || "unknown"},{" "}
                  {file.size} bytes)
                </li>
              ))}
            </ul>
          </div>
        )}

        <button
          type="button"
          onClick={handleUpload}
          style={{ marginTop: "1rem" }}
          data-testid="btn-upload"
        >
          Upload to backend
        </button>

        {error && (
          <p style={{ marginTop: 8, color: "salmon" }}>{error}</p>
        )}

        {uploadResult && (
          <div className="section" style={{ marginTop: "1rem" }}>
            <h3>Backend upload response</h3>
            <pre style={{ fontSize: "0.8rem", overflowX: "auto" }}>
              {JSON.stringify(uploadResult, null, 2)}
            </pre>
          </div>
        )}
      </section>
    </div>
  );
}

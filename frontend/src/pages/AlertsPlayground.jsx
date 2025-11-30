import { useState } from "react";

export default function AlertsPlayground() {
  const [confirmResult, setConfirmResult] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleAlert = () => {
    // Real alert for automation to handle
    window.alert("This is a JavaScript alert!");
  };

  const handleConfirm = () => {
    const result = window.confirm("Do you confirm this action?");
    setConfirmResult(result ? "Confirmed" : "Cancelled");
  };

  return (
    <div className="page">
      <h1>Alerts &amp; Popups Playground</h1>
      <p>
        Buttons here trigger native alerts, confirms, and a custom modal
        component.
      </p>

      <section className="section">
        <h2>Native alerts</h2>
        <div className="inline">
          <button
            type="button"
            onClick={handleAlert}
            data-testid="btn-alert"
          >
            Show alert()
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            data-testid="btn-confirm"
          >
            Show confirm()
          </button>
        </div>
        {confirmResult && (
          <p data-testid="confirm-result">
            Confirm result: <strong>{confirmResult}</strong>
          </p>
        )}
      </section>

      <section className="section section-muted">
        <h2>Custom modal</h2>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          data-testid="btn-open-modal"
        >
          Open modal
        </button>

        {modalOpen && (
          <div className="modal-backdrop" data-testid="modal-backdrop">
            <div className="modal">
              <h3>Automation Modal</h3>
              <p>
                Use this modal to practice locating elements inside overlays and
                dealing with z-index issues.
              </p>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                data-testid="btn-close-modal"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

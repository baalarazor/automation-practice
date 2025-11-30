export default function IframePlayground() {
  return (
    <div className="page">
      <h1>iFrame Playground</h1>
      <p>
        This page contains flows inside an iframe. Automation scripts must
        switch into the iframe context to interact with these elements.
      </p>

      <section className="section">
        <h2>Embedded iframe form</h2>
        <p>
          The iframe below loads <code>/iframe-form.html</code> from the same
          origin. It has its own inputs and submit button.
        </p>

    <div className="iframe-wrapper">
        <h3 style={{ margin: "0 0 10px", color: "#111", fontWeight: 600 }}>Embedded Training Form</h3>
        <iframe
        title="iframe-form"
        src="/iframe-form.html"
        data-testid="practice-iframe"
     />
    </div>
      </section>
    </div>
  );
}

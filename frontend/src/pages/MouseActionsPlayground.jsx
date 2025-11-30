import { useState } from "react";

export default function MouseActionsPlayground() {
  const [hoverMessage, setHoverMessage] = useState("Not hovered");
  const [doubleClickCount, setDoubleClickCount] = useState(0);
  const [contextClick, setContextClick] = useState("None");

  return (
    <div className="page">
      <h1>Mouse Actions Playground</h1>
      <p>
        Use this page to practice hover, double click, right click, and click &amp;
        hold actions.
      </p>

      <section className="section">
        <h2>Hover area</h2>
        <div
          className="mouse-box"
          onMouseEnter={() => setHoverMessage("Hovered!")}
          onMouseLeave={() => setHoverMessage("Not hovered")}
          data-testid="hover-box"
        >
          Hover over this box
        </div>
        <p>State: {hoverMessage}</p>
      </section>

      <section className="section section-muted">
        <h2>Double click area</h2>
        <div
          className="mouse-box"
          onDoubleClick={() => setDoubleClickCount(doubleClickCount + 1)}
          data-testid="double-click-box"
        >
          Double-click this box
        </div>
        <p>Double-click count: {doubleClickCount}</p>
      </section>

      <section className="section">
        <h2>Right click (context menu)</h2>
        <div
          className="mouse-box"
          onContextMenu={(e) => {
            e.preventDefault();
            setContextClick("Right-clicked at " + new Date().toLocaleTimeString());
          }}
          data-testid="right-click-box"
        >
          Right-click on this box
        </div>
        <p>Last context event: {contextClick}</p>
      </section>
    </div>
  );
}

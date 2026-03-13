"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body style={{ background: "#1a1a2e", color: "#f0f0f5", fontFamily: "system-ui, sans-serif" }}>
        <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "1.5rem" }}>
          <div style={{ textAlign: "center" }}>
            <p style={{ color: "#00b4d8", fontWeight: 600, fontSize: "0.875rem", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.75rem" }}>
              Error
            </p>
            <h1 style={{ fontSize: "2.25rem", fontWeight: 700, marginBottom: "1rem" }}>
              Something went wrong
            </h1>
            <p style={{ color: "#b8b8d0", marginBottom: "2rem", maxWidth: "28rem", margin: "0 auto 2rem" }}>
              We hit an unexpected error. Please try again.
            </p>
            <button
              onClick={reset}
              style={{
                background: "#00b4d8",
                color: "#1a1a2e",
                fontWeight: 600,
                padding: "0.75rem 1.5rem",
                borderRadius: "9999px",
                border: "none",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Try Again
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

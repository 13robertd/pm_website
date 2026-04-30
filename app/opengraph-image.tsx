import { ImageResponse } from "next/og";

// Open Graph image — generated to /opengraph-image at request time.
// Next.js wires this into <meta property="og:image"> automatically,
// so any link share (Slack, iMessage, Twitter, LinkedIn) gets a real
// preview tile.
//
// Resolution is the OG standard 1200x630. We don't load a custom
// font (it'd require a fetch + ArrayBuffer at edge render time) —
// system sans is more than fine for a typographic image like this.

export const alt = "Bayline Property Co. — Peninsula & South Bay Property Management";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #ffffff 0%, #ecfeff 60%, #cffafe 100%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        {/* Top: brand mark + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background:
                "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
              boxShadow: "0 1px 3px rgb(15 23 42 / 0.2)",
            }}
          />
          <div
            style={{
              fontSize: 28,
              fontWeight: 600,
              color: "#0f172a",
              letterSpacing: "-0.01em",
            }}
          >
            Bayline Property Co.
          </div>
        </div>

        {/* Middle: headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 600,
              color: "#0e7490",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 24,
            }}
          >
            Peninsula &amp; South Bay
          </div>
          <div
            style={{
              fontSize: 88,
              fontWeight: 600,
              color: "#0f172a",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              maxWidth: 980,
            }}
          >
            Modern property management for Bay Area owners.
          </div>
        </div>

        {/* Bottom: feature row */}
        <div
          style={{
            display: "flex",
            gap: 32,
            fontSize: 22,
            color: "#475569",
            fontWeight: 500,
          }}
        >
          <span>Same-day response</span>
          <span style={{ color: "#cbd5e1" }}>·</span>
          <span>Online owner dashboard</span>
          <span style={{ color: "#cbd5e1" }}>·</span>
          <span>Transparent reporting</span>
        </div>
      </div>
    ),
    size
  );
}

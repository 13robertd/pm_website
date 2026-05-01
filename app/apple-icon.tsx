import { ImageResponse } from "next/og";

// Apple touch icon. Next.js wires this into the head as
// <link rel="apple-touch-icon"> at the standard 180×180 size used
// when the site is added to the iOS home screen.
//
// Uses a softer rounded square + a centered "B" mark so it reads as
// a real app icon instead of just a colored tile.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
          borderRadius: 36,
          color: "white",
          fontSize: 96,
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          letterSpacing: "-0.04em",
        }}
      >
        B
      </div>
    ),
    size
  );
}

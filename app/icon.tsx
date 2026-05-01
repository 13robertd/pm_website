import { ImageResponse } from "next/og";

// Favicon. Next.js will serve this at /icon and wire it into the
// document head as <link rel="icon">. A 32×32 brand-gradient square
// matches the brand mark used in the Header and Footer.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background:
            "linear-gradient(135deg, #22d3ee 0%, #0891b2 100%)",
          borderRadius: 7,
        }}
      />
    ),
    size
  );
}

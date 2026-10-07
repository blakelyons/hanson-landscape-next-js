import { ImageResponse } from "next/og";

export const alt = "Hanson Landscape — landscape design, construction and care in Chicagoland";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default share card for any page without its own image.
export default function Image() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                padding: "80px",
                background: "linear-gradient(135deg, #0e2113 0%, #1e4a25 100%)",
                color: "#fafbf8",
            }}
        >
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    color: "#f89c1c",
                    fontSize: 26,
                    letterSpacing: 4,
                }}
            >
                <div style={{ width: 48, height: 4, background: "#f89c1c" }} />
                CHICAGOLAND LANDSCAPE ARCHITECTS
            </div>
            <div style={{ fontSize: 108, marginTop: 28, lineHeight: 1.05, fontFamily: "serif" }}>Hanson Landscape</div>
            <div style={{ fontSize: 38, marginTop: 28, color: "rgba(250,251,248,0.78)", maxWidth: 900 }}>
                Landscape design, construction and year-round care for residential and commercial properties.
            </div>
            <div style={{ fontSize: 32, marginTop: 48, color: "#f89c1c" }}>(630) 556-4120</div>
        </div>,
        size,
    );
}

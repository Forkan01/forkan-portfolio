import { ImageResponse } from "next/og";

export const alt = "Abdullah Al Forkan — Software, AI & Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: 64, background: "#f4f8ff", color: "#142239", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 25, fontWeight: 700 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 76, height: 76, borderRadius: 19, background: "#2868dc", color: "white", fontSize: 36, fontWeight: 800 }}>AF.</div>
          <div>PORTFOLIO · BUILD · LEARN · IMPROVE</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ display: "flex", color: "#2868dc", fontSize: 74, fontWeight: 800, letterSpacing: -3 }}>Abdullah Al Forkan</div>
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700 }}>Software · AI · Engineering</div>
          <div style={{ display: "flex", color: "#52647d", fontSize: 25 }}>Projects in visual tools, autonomous systems, learning and games.</div>
        </div>
        <div style={{ display: "flex", gap: 12 }}>{["#2868dc", "#e94b65", "#20ac7e", "#e9a500"].map(color => <div key={color} style={{ display: "flex", height: 12, width: 82, borderRadius: 6, background: color }} />)}</div>
      </div>
    ),
    size
  );
}

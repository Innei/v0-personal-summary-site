import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "Innei's Annual Review"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        background: "#0d1117",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        padding: "60px 80px",
        fontFamily: "monospace",
      }}
    >
      {/* Terminal window header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "24px",
        }}
      >
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#ff5f56",
          }}
        />
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#ffbd2e",
          }}
        />
        <div
          style={{
            width: "12px",
            height: "12px",
            borderRadius: "50%",
            background: "#27c93f",
          }}
        />
        <span
          style={{
            color: "#8b949e",
            fontSize: "14px",
            marginLeft: "12px",
          }}
        >
          ~/reviews
        </span>
      </div>

      {/* Terminal content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "16px",
          flex: 1,
        }}
      >
        {/* Command line */}
        <div style={{ display: "flex", color: "#c9d1d9", fontSize: "24px" }}>
          <span style={{ color: "#7ee787" }}>$</span>
          <span style={{ marginLeft: "12px" }}>cat reviews.md</span>
          <span
            style={{
              background: "#7ee787",
              width: "12px",
              height: "28px",
              marginLeft: "4px",
            }}
          />
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            color: "#8b949e",
            fontSize: "20px",
            marginTop: "20px",
          }}
        >
          # 年终总结 | Annual Review
        </div>

        {/* Description */}
        <div
          style={{
            display: "flex",
            color: "#58a6ff",
            fontSize: "32px",
            marginTop: "8px",
          }}
        >
          记录每一年的成长与思考
        </div>

        {/* File listing */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            marginTop: "32px",
            color: "#7ee787",
            fontSize: "18px",
          }}
        >
          <div style={{ display: "flex" }}>
            <span style={{ color: "#8b949e" }}>-rw-r--r--</span>
            <span style={{ marginLeft: "16px" }}>2025.md</span>
            <span style={{ marginLeft: "16px", color: "#c9d1d9" }}>仍在路上，半径之外</span>
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#8b949e" }}>-rw-r--r--</span>
            <span style={{ marginLeft: "16px" }}>2024.md</span>
            <span style={{ marginLeft: "16px", color: "#c9d1d9" }}>前路未尽，初心犹在</span>
          </div>
          <div style={{ display: "flex" }}>
            <span style={{ color: "#8b949e" }}>-rw-r--r--</span>
            <span style={{ marginLeft: "16px" }}>2023.md</span>
            <span style={{ marginLeft: "16px", color: "#c9d1d9" }}>光影交织之年</span>
          </div>
          <div style={{ display: "flex", color: "#8b949e" }}>... 2019 - 2022</div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: "auto",
          color: "#8b949e",
          fontSize: "18px",
        }}
      >
        <span>innei.in</span>
        <span>2019 - 2025</span>
      </div>
    </div>,
    {
      ...size,
    },
  )
}

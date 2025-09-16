import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [selectedTool, setSelectedTool] = useState("linear-regression");

  const tools = [
    {
      id: "linear-regression",
      name: "Linear Regression",
      description: "A model that estimates the relationship between a scalar response.",
      icon: "📊",
      color: "#ff4444",
      tableData: {
        headers: ["X1", "X2", "Y"],
        rows: [
          [5, 2, 7],
          [4, 3, 8],
          [3, 4, 6],
          [6, 5, 9],
          [3, 6, 5],
          [5, 7, 8]
        ]
      }
    },
    {
      id: "bar-chart",
      name: "Bar Chart",
      description: "Visualize the frequency or proportion of categories using bars.",
      icon: "📶",
      color: "#4444ff",
      tableData: {
        headers: ["Category", "Count"],
        rows: [
          ["A", 25],
          ["B", 18],
          ["C", 32],
          ["D", 14]
        ]
      }
    },
    {
      id: "line-chart",
      name: "Line Chart",
      description: "Display trends over time or sequential data.",
      icon: "📈",
      color: "#44ffaa",
      tableData: {
        headers: ["Month", "Value"],
        rows: [
          ["Jan", 120],
          ["Feb", 135],
          ["Mar", 150],
          ["Apr", 140],
          ["May", 160]
        ]
      }
    }
  ];

  const selectedToolData =
    tools.find((tool) => tool.id === selectedTool) ?? tools[0];
  const tableHeaders = selectedToolData.tableData?.headers ?? [];
  const tableRows = selectedToolData.tableData?.rows ?? [];

  const rCode = `# Initialize data
df <- data.frame(
  y = c(5, 7, 8, 6, 9),
  x1 = c(1, 2, 3, 4, 5),
  x2 = c(2, 3, 4, 5, 6)
)

# Fit linear model
model <- lm(
  formula = y ~ x1 + x2,
  data = df,
  subset = NULL,
  weights = NULL,
  na.action = na.omit,
  method = "qr",
  model = TRUE,
  x = FALSE,
  y = TRUE,
  qr = TRUE,
  singular.ok = TRUE,
  contrasts = NULL,
  offset = NULL
)`;

  return (
    <>
      <Head>
        <title>Add R Tool</title>
        <meta name="description" content="R programming language tools dashboard for statistical students" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className={styles.dashboard}>
        {/* Top Navigation */}
        <nav className={styles.navbar}>
          <div className={styles.navLinks}>
            <a href="#" className={styles.navLink}>Project</a>
            <a href="#" className={styles.navLink}>Edit</a>
            <a href="#" className={styles.navLink}>Import</a>
            <a href="#" className={styles.navLink}>Export</a>
          </div>
        </nav>

        <div className={styles.mainContent}>
          {/* Left Panel - Tool Selection */}
          <div className={styles.leftPanel}>
            <div className={styles.panelHeader}>
              <h2>Add R Tool</h2>
              <p>Select one of the provided RStudio tools.</p>
            </div>
            
            <div className={styles.toolList}>
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className={`${styles.toolCard} ${selectedTool === tool.id ? styles.selected : ''}`}
                  onClick={() => setSelectedTool(tool.id)}
                >
                  <div className={styles.toolIcon} style={{ color: tool.color }}>
                    {tool.icon}
                  </div>
                  <div className={styles.toolInfo}>
                    <h3>{tool.name}</h3>
                    <p>{tool.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center Panel - Tool Details */}
          <div className={styles.centerPanel}>
            <div className={styles.toolDetails}>
              <div className={styles.toolHeader}>
                <h1>{selectedToolData.name}</h1>
                <p>{selectedToolData.description}</p>
              </div>

              <div className={styles.toolVisual}>
                <div
                  className={styles.chartIcon}
                  style={{ color: selectedToolData.color }}
                >
                  {selectedToolData.icon}
                </div>
              </div>
              
              <div className={styles.actionButtons}>
                <button className={styles.actionBtn}>
                  <span>{"{}"}</span>
                  Copy R Code
                </button>
                <button className={styles.actionBtn}>
                  <span>⬇</span>
                  Download R Code
                </button>
                <button className={styles.actionBtn}>
                  <span>✏</span>
                  Edit
                </button>
              </div>
            </div>

            {/* Data Table */}
            <div className={styles.dataTable}>
              <table>
                <thead>
                  <tr>
                    {tableHeaders.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, index) => (
                    <tr key={index}>
                      {row.map((cell, cellIndex) => (
                        <td key={cellIndex}>{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Panel - Code and Arguments */}
          <div className={styles.rightPanel}>
            <div className={styles.panelHeader}>
              <div className={styles.headerActions}>
                <div className={styles.vrIcon}>VR</div>
                <button className={styles.switchBtn}>Switch R Tool</button>
              </div>
            </div>

            <div className={styles.codeSection}>
              <div className={styles.sectionHeader}>
                <h3>Code Snippet</h3>
                <span className={styles.expandIcon}>+</span>
              </div>
              <div className={styles.codeBlock}>
                <pre><code>{rCode}</code></pre>
              </div>
              <p className={styles.codeDescription}>
                Creates a linear regression model predicting y using x1 and x2.
              </p>
            </div>

            <div className={styles.argumentsSection}>
              <h3>Arguments</h3>
              <div className={styles.argumentGroup}>
                <label>Formula</label>
                <input type="text" value="y ~ x1 + x2" readOnly />
              </div>
              
              <div className={styles.argumentGroup}>
                <label>df (Initialize data)</label>
                <div className={styles.dataInputs}>
                  <div className={styles.dataInput}>
                    <label>y:</label>
                    <input type="text" value="5, 7, 8, 6, 9" readOnly />
                  </div>
                  <div className={styles.dataInput}>
                    <label>x1:</label>
                    <input type="text" value="1, 2, 3, 4, 5" readOnly />
                  </div>
                  <div className={styles.dataInput}>
                    <label>x2:</label>
                    <input type="text" value="2, 3, 4, 5, 6" readOnly />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

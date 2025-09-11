import Head from "next/head";
import { useState, useEffect } from "react";
import styles from "@/styles/Home.module.css";

export default function Home() {
  const [selectedTool, setSelectedTool] = useState(null);
  const [tools, setTools] = useState([]);

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const res = await fetch('/api/tools');
        const data = await res.json();
        setTools(data);
        if (data.length > 0) {
          setSelectedTool(data[0].id);
        }
      } catch (err) {
        console.error('Failed to fetch tools', err);
      }
    };

    fetchTools();
  }, []);

  const sampleData = [
    { x1: 5, x2: 2, y: 7 },
    { x1: 4, x2: 3, y: 8 },
    { x1: 3, x2: 4, y: 6 },
    { x1: 6, x2: 5, y: 9 },
    { x1: 3, x2: 6, y: 5 },
    { x1: 5, x2: 7, y: 8 }
  ];

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
                <h1>Linear Regression</h1>
                <p>A model that estimates the relationship between a scalar response.</p>
              </div>
              
              <div className={styles.toolVisual}>
                <div className={styles.chartIcon} style={{ color: "#ff4444" }}>
                  📊
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
                    <th>X1</th>
                    <th>X2</th>
                    <th>Y</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleData.map((row, index) => (
                    <tr key={index}>
                      <td>{row.x1}</td>
                      <td>{row.x2}</td>
                      <td>{row.y}</td>
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

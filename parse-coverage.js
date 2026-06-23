const fs = require('fs');
const path = require('path');

function parseSummary(summaryPath, name) {
  if (!fs.existsSync(summaryPath)) {
    return `### ${name} Coverage Summary\n\n*No coverage data found.*\n`;
  }
  const data = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
  let md = `### ${name} Coverage Summary\n\n`;
  md += `| File | Statements | Branches | Functions | Lines |\n`;
  md += `| :--- | :---: | :---: | :---: | :---: |\n`;

  // Format total
  const total = data.total;
  if (total) {
    md += `| **All Files (Total)** | **${total.statements.pct}%** | **${total.branches.pct}%** | **${total.functions.pct}%** | **${total.lines.pct}%** |\n`;
  }

  // Format individual files
  for (const [filePath, stats] of Object.entries(data)) {
    if (filePath === 'total') continue;
    // Get relative path for clean display
    let relativePath = filePath;
    const projectDirName = name.toLowerCase();
    if (filePath.includes(projectDirName)) {
      relativePath = filePath.substring(filePath.indexOf(projectDirName));
    } else {
      relativePath = path.basename(filePath);
    }
    
    // Replace backslashes with forward slashes for cross-platform consistency
    relativePath = relativePath.replace(/\\/g, '/');

    md += `| ${relativePath} | ${stats.statements.pct}% | ${stats.branches.pct}% | ${stats.functions.pct}% | ${stats.lines.pct}% |\n`;
  }
  md += `\n`;
  return md;
}

const backendPath = path.join(process.cwd(), 'backend', 'coverage', 'coverage-summary.json');
const frontendPath = path.join(process.cwd(), 'frontend', 'coverage', 'coverage-summary.json');

let output = `## 📊 SustainaTrack CI/CD Coverage Report\n\n`;
output += parseSummary(backendPath, 'Backend');
output += parseSummary(frontendPath, 'Frontend');

console.log(output);

if (process.env.GITHUB_STEP_SUMMARY) {
  fs.writeFileSync(process.env.GITHUB_STEP_SUMMARY, output);
} else {
  fs.writeFileSync('coverage-summary.md', output);
}

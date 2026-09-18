const fs = require("fs");
const path = require("path");

const clientDir = path.join(__dirname, "dist", "client");
const assetsDir = path.join(clientDir, "assets");
const indexPath = path.join(clientDir, "index.html");

// Find the main JS and CSS files
const files = fs.readdirSync(assetsDir);
const jsFile = files.find(f => f.startsWith("index-") && f.endsWith(".js"));
const cssFile = files.find(f => f.startsWith("styles-") && f.endsWith(".css"));

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Fiza Fehmi — Full-Stack Developer</title>
    <meta name="description" content="Full-stack developer building modern, responsive web applications with React, Node.js, Express and MongoDB." />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ""}
  </head>
  <body>
    <div id="root"></div>
    ${jsFile ? `<script type="module" src="/assets/${jsFile}"></script>` : ""}
  </body>
</html>`;

fs.writeFileSync(indexPath, html);
console.log("✓ Generated dist/client/index.html");

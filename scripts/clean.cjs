const fs = require("node:fs");
const path = require("node:path");
// Only remove generated output, so retired pages/assets cannot survive a rebuild.
fs.rmSync(path.join(__dirname, "..", "_site"), { recursive: true, force: true });

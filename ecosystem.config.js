const fs = require("fs");
const path = require("path");

// deploy/build-swap.sh writes the slot it just built (.next-a / .next-b) here.
// Falls back to .next for the very first start, before any swap has run.
let distDir = ".next";
try {
    distDir = fs.readFileSync(path.join(__dirname, ".active-dist"), "utf8").trim() || distDir;
} catch {}

module.exports = {
    apps: [
        {
            name: "hanson-landscape",
            script: "npm",
            args: "start",
            cwd: __dirname,
            instances: 1,
            exec_mode: "fork",
            env: {
                NODE_ENV: "production",
                PORT: 3000,
                NEXT_DIST_DIR: distDir,
            },
        },
    ],
};

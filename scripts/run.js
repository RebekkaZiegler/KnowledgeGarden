const http = require("http");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const PORT = Number(process.env.PORT) || 5173;
const ROOT = process.cwd();
const SESSION_TTL_MS = 6000;
const EMPTY_GRACE_MS = 2500;

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".txt": "text/plain; charset=utf-8"
};

const sessions = new Map();
let emptySince = null;

function safeResolve(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split("?")[0]);
  const relPath = cleanPath === "/" ? "/index.html" : cleanPath;
  const absPath = path.normalize(path.join(ROOT, relPath));
  if (!absPath.startsWith(ROOT)) return null;
  return absPath;
}

function findBrowserExecutable() {
  const candidates = [
    "C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"
  ];
  for (const exe of candidates) {
    if (fs.existsSync(exe)) return exe;
  }
  return null;
}

function openAppWindow(url) {
  const exe = findBrowserExecutable();
  if (exe) {
    try {
      spawn(exe, [`--app=${url}`, "--window-size=980,760"], {
        detached: true,
        stdio: "ignore"
      }).unref();
      return true;
    } catch (_) {
      // fallback below
    }
  }

  try {
    spawn("cmd", ["/c", "start", "", url], { detached: true, stdio: "ignore" }).unref();
    return true;
  } catch (_) {
    return false;
  }
}

function readBody(req) {
  return new Promise((resolve) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk.toString("utf8");
      if (raw.length > 2048) req.destroy();
    });
    req.on("end", () => resolve(raw.trim()));
    req.on("error", () => resolve(""));
  });
}

function upsertSession(id) {
  if (!id) return;
  sessions.set(id, Date.now());
}

function removeSession(id) {
  if (!id) return;
  sessions.delete(id);
}

function sweepSessions() {
  const now = Date.now();
  for (const [id, lastSeen] of sessions.entries()) {
    if (now - lastSeen > SESSION_TTL_MS) {
      sessions.delete(id);
    }
  }

  if (sessions.size === 0) {
    if (!emptySince) emptySince = now;
    if (now - emptySince >= EMPTY_GRACE_MS) {
      console.log("App window closed. Shutting down server.");
      server.close(() => process.exit(0));
    }
  } else {
    emptySince = null;
  }
}

async function handleLifecycle(req, res, pathname) {
  const headerId = req.headers["x-app-session"];
  const bodyId = await readBody(req);
  const id = (headerId || bodyId || "").toString().trim();

  if (pathname === "/__app_open" || pathname === "/__app_ping") {
    upsertSession(id);
  } else if (pathname === "/__app_close") {
    removeSession(id);
  }

  res.writeHead(204);
  res.end();
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://localhost:${PORT}`);
  const pathname = url.pathname;

  if (req.method === "POST" && (pathname === "/__app_open" || pathname === "/__app_ping" || pathname === "/__app_close")) {
    await handleLifecycle(req, res, pathname);
    return;
  }

  const filePath = safeResolve(req.url || "/");
  if (!filePath) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("Forbidden");
    return;
  }

  fs.stat(filePath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Not Found");
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || "application/octet-stream";
    res.writeHead(200, { "Content-Type": contentType });
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(PORT, () => {
  const url = `http://localhost:${PORT}`;
  console.log(`Serving ${ROOT}`);
  console.log(`Opening app window at ${url}`);
  const ok = openAppWindow(url);
  if (!ok) {
    console.log("Could not auto-open browser. Open the URL manually.");
  }
  setInterval(sweepSessions, 1000);
});

process.on("SIGINT", () => {
  server.close(() => process.exit(0));
});

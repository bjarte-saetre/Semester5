import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const publicFolder = fileURLToPath(new URL("./public/", import.meta.url));
const host = "127.0.0.1";
const port = 5500;

const contentTypes = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8"
};

const server = http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, `http://${host}:${port}`);
    const requestedPath = url.pathname.endsWith("/")
      ? `${url.pathname}index.html`
      : url.pathname;

    const filePath = path.join(publicFolder, requestedPath);
    const fileInfo = await stat(filePath);

    if (!fileInfo.isFile()) {
      throw new Error("Not a file");
    }

    const content = await readFile(filePath);
    const contentType = contentTypes[path.extname(filePath)] ?? "text/plain; charset=utf-8";

    response.writeHead(200, { "Content-Type": contentType });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("404 - Fant ikke siden");
  }
});

server.listen(port, host, () => {
  console.log(`Prosjektet kjører på http://${host}:${port}`);
  console.log("Stopp serveren med Ctrl+C.");
});

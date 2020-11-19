const http = require("http");
const qs = require("querystring");
const url = require("url");

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.method !== "GET") handleError(res, 405);
  console.log(req.url);

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.statusCode = 200;
    res.write(
      JSON.stringify({
        server: process.env.SERVER || "",
        env: process.env.SERVER_ENV || "",
      })
    );
    res.end();
    return;
  }

  if (req.url === "/env") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.statusCode = 200;
    res.write(JSON.stringify({ ...process.env }));
    res.end();
    return;
  }

  handleError(res, 404);
});

function handleError(res, code) {
  res.statusCode = code;
  res.end(`{"error": "${http.STATUS_CODES[code]}"}`);
}

server.listen(port, () => {
  console.log(`Server listening on the port ${port}`);
});

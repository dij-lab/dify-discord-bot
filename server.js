const http = require('http');

// 1. Renderのポート要件を満たすHTTPサーバー
const port = process.env.PORT || 10000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Dify Discord Bot is running!');
});

server.listen(port, () => {
  console.log(`HTTP server is listening on port ${port}`);
});

// 2. ボットの読み込みとエラー検知
console.log('Attempting to load bot from ./dist/index.js...');
try {
  // Discord への疎通テスト
(async () => {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), 15000);
  try {
    const r = await fetch("https://discord.com/api/v10/gateway", {
      signal: ctrl.signal,
    });
    const body = await r.text();
    console.log("[connectivity] status:", r.status);
    console.log("[connectivity] retry-after:", r.headers.get("retry-after"));
    console.log("[connectivity] cf-ray:", r.headers.get("cf-ray"));
    console.log("[connectivity] body:", body.slice(0, 300));
  } catch (e) {
    console.error("[connectivity] failed:", e.name, e.message);
  } finally {
    clearTimeout(t);
  }
})();
  require('./dist/index.js');
  console.log('Bot script required successfully.');
} catch (error) {
  console.error('CRITICAL ERROR: Failed to load bot script:', error);
}

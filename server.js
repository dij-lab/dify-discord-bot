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
  require('./dist/index.js');
  console.log('Bot script required successfully.');
} catch (error) {
  console.error('CRITICAL ERROR: Failed to load bot script:', error);
}

const http = require('http');

// 1. Renderのポート要件を満たすための超軽量HTTPサーバー
const port = process.env.PORT || 10000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Dify Discord Bot is running!');
});

server.listen(port, () => {
  console.log(`HTTP server is listening on port ${port}`);
});

// 2. 本来のDiscord Bot（TypeScriptをビルドしたメイン処理）を呼び出す
require('./dist/index.js');

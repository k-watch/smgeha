const { createProxyMiddleware } = require('http-proxy-middleware');

// package.json에 proxy를 추가해서 사용하니 아래와 같은 에러 발생
// options.allowedHosts[0] should be a non-empty string.
// 유선랜 사용해서 발생하는 문제라는데, 어쨋든 아래 방법으로 해결
module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      target: 'http://localhost:8080/',
      changeOrigin: true,
    }),
  );
};

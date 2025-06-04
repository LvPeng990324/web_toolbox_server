ms = require("./ms");

const express = require("express");
const cors = require("cors");
const app = express();

// 中间件
app.use(cors());  // 跨域
app.use(express.json());  // 替代body-parser
app.use(express.urlencoded({ extended: true }));
app.use(ms.middleware.request_logger_middleware);
app.use(ms.middleware.permission_check_middleware);

// 路由
app.use("/user-api", ms.user_api.router);

// 404处理
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Server Error" });
});

// 启动服务器
const PORT = ms.server_config.server_port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

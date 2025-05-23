const express = require("express");
const cors = require("cors");
const app = express();
const custom_middlewares = require("./utils/middleware");

// 中间件
app.use(express.json());  // 替代body-parser
app.use(express.urlencoded({ extended: true }));
app.use(custom_middlewares.request_logger_middleware);
app.use(cors());  // 跨域

// 路由
const apiRouter = require("./routes/api");
const userApiRouter = require("./routes/user_api");
app.use("/api", apiRouter);
app.use("/user-api", userApiRouter);

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

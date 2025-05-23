const express = require("express");
const router = express.Router();
const redis_client = require("../utils/redis");

// 示例API端点
router.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

// 示例POST请求处理
router.post("/data", (req, res) => {
  const receivedData = req.body;
  res.json({
    status: "Received",
    data: receivedData,
  });
});

// 测试redis get
router.get("/redis-get", async (req, res) => {
    let key = req.query.key;

    let value = await redis_client.get(key);

    res.json({
        value,
    });
});

// 测试redis set
router.post("/redis-set", async (req, res) => {
    let {key, value} = req.body;

    await redis_client.set(key, value);

    res.json({
        res: "success",
        key,
        value,
    });
});

module.exports = router;

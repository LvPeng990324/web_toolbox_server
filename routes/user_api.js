const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const logger = require("../utils/log");

// 请求数据
router.get("/", async (req, res) => {
    const [rows] = await db.query("select * from user_login");
    user_list = [];
    for (let i = 0; i < rows.length; i++) {
        const user_data = rows[i];
        user_list.push({
            id: user_data.id,
            uid: user_data.uid,
            day: user_data.day,
        });
    }

    logger.info(`get user data ${JSON.stringify(user_list)}`);

    res.json({
        user_list,
    });
});

// 新增数据
router.post("/add", async (req, res) => {
    const received_data = req.body;
    let sql = "replace into user_login (uid, day) value (?, ?);";
    let args = [received_data.uid, received_data.day];
    await db.query(sql, args);

    res.json({
        "res": "success",
        "data": received_data,
    });
});

// 登录
router.post("/login", async (req, res) => {
    res.json({
        code: 0,
        message: "登录成功",
        data: {
            token: "token-admin",
        },
    });
});

// 获取用户信息
router.get("/get-user-info", async (req, res) => {
    res.json({
        code: 0,
        message: "获取成功",
        data: {
            username: "1111",
        }
    })
})

module.exports = router;
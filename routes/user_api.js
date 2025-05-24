const express = require("express");
const router = express.Router();

// 登录
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    if (username == 'guest') {
        ms.response.json_response(res, ms.response.RETURN_CODE.success, "登录成功", {
            token: "token-guest",
        });
        return;
    }

    ms.response.json_response(res, ms.response.RETURN_CODE.success, "登录成功", {
        token: "token-admin",
    });
});

// 获取用户信息
router.get("/get-user-info", async (req, res) => {
    const username = req.headers.authorization.split('token-')[1]

    ms.response.json_response(res, ms.response.RETURN_CODE.success, "获取成功", {
        username: username,
    });
});

module.exports = {
    router,
};
const express = require("express");
const router = express.Router();
const {RETURN_CODE, json_response} = require("../utils/response");

// 登录
router.post("/login", async (req, res) => {
    const {username, password} = req.body;
    if (username == 'guest') {
        json_response(res, RETURN_CODE.success, "登录成功", {
            token: "token-guest",
        });
        return;
    }

    json_response(res, RETURN_CODE.success, "登录成功", {
        token: "token-admin",
    });
});

// 获取用户信息
router.get("/get-user-info", async (req, res) => {
    const username = req.headers.authorization.split('token-')[1]

    ms.response.json_response(res, RETURN_CODE.success, "获取成功", {
        username: username,
    });
});

module.exports = {
    router,
};
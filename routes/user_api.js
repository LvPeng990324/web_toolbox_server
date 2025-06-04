const express = require("express");
const router = express.Router();

// 登录
router.post("/login", async (req, res) => {
    let {username, password} = req.body;
    // 密码转md5
    password = ms.common_util.get_md5(password);

    // 生成token信息
    let token = ms.common_util.gen_token(username);

    if (username == 'guest') {
        return ms.response.json_response(res, ms.response.RETURN_CODE.success, "登录成功", {
            token: token,
        });
    }

    // 从数据库中取出这个用户
    let sql = `select password from user where username = ?;`;
    let args = [username];
    let rows = await ms.db.query(sql, args);
    let user_data = rows[0][0];

    if (!user_data) {
        return ms.response.json_response(res, ms.response.RETURN_CODE.auth_err, "用户名错误", {});
    }
    if (user_data.password != password) {
        return ms.response.json_response(res, ms.response.RETURN_CODE.auth_err, "密码错误", {});
    }

    ms.response.json_response(res, ms.response.RETURN_CODE.success, "登录成功", {
        token: token,
    });
});

// 获取用户信息
router.get("/get-user-info", async (req, res) => {
    const auth_token = req.headers.authorization;
    const {username} = ms.common_util.parse_token(auth_token);


    ms.response.json_response(res, ms.response.RETURN_CODE.success, "获取成功", {
        username: username,
    });
});

module.exports = {
    router,
};
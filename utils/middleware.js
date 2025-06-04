const request_logger_middleware = function (req, res, next) {
    const start_time = Date.now();
    // 记录请求参数
    ms.log.logger.info(`[Request] Path: ${req.path} Params: ${JSON.stringify(req.params)} Query: ${JSON.stringify(req.query)} Body: ${JSON.stringify(req.body)}`);

    // 保存原始的send方法
    const original_send = res.send;

    // 重写send方法来记录响应时间
    res.send = function (body) {
        const duration = Date.now() - start_time;
        ms.log.logger.info(`[Response] Path: ${req.path} <${duration}ms> Body: ${JSON.stringify(body)}`);

        // 调用原始的send方法
        original_send.call(this, body);
    };

    next();
};

const permission_check_middleware = function (req, res, next) {
    // 只有公共页面可以不登录，其它页面必须登录，不然拦截返回认证失败
    let publish_path_list = ['/user-api/login'];
    let current_path = req.path;
    if (publish_path_list.includes(current_path)) {
        return next();
    }

    // 检查凭证
    let auth_token = req.headers.authorization;
    let {username, token_stamp} = ms.common_util.parse_token(auth_token);
    if (!username || !token_stamp) {
        return ms.response.json_response(res, ms.response.RETURN_CODE.auth_err, '未登录', {});
    } else {
        let current_stamp = ms.common_util.get_server_stamp();
        if (current_stamp - token_stamp > ms.server_config.token_expire_ms) {
            return ms.response.json_response(res, ms.response.RETURN_CODE.auth_err, '登录过期', {});
        }
    }

    // TODO 根据页面进行角色权限检查

    next();
};

module.exports = {
    request_logger_middleware,
    permission_check_middleware,
};
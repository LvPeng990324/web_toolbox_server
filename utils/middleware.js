const logger = require("./log");

const request_logger_middleware = function (req, res, next) {
    const start_time = Date.now();
    // 记录请求参数
    logger.info(`[Request] Path: ${req.path} Params: ${JSON.stringify(req.params)} Query: ${JSON.stringify(req.query)} Body: ${JSON.stringify(req.body)}`);

    // 保存原始的send方法
    const original_send = res.send;

    // 重写send方法来记录响应时间
    res.send = function (body) {
        const duration = Date.now() - start_time;
        logger.info(`[Response] Path: ${req.path} <${duration}ms> Body: ${JSON.stringify(body)}`);

        // 调用原始的send方法
        original_send.call(this, body);
    };

    next();
};

module.exports = {
    request_logger_middleware,
};
// 逻辑返回码定义
const RETURN_CODE = {
    success: 0,
};


/**
 * @param {Object} res 接口方法的res参数
 * @param {Number} code 逻辑返回码
 */
const json_response = function (res, code, message, data) {
    res.json({
        code: code,
        message: message,
        data: data,
    })
};

module.exports = {
    RETURN_CODE,
    json_response,
};
// 获取md5
exports.get_md5 = function(raw_str) {
    let md5 = ms.crypto.createHash('md5');

    return md5.update(raw_str).digest('hex');
};

// 获取当前时间对象
exports.get_server_time = function() {
    return new Date();
};

// 获取当前毫秒时间戳
exports.get_server_stamp = function() {
    return exports.get_server_time().getTime();
};

// 生成token
// token结构：username拼上当前毫秒级时间戳
exports.gen_token = function(username) {
    return `${username}-${exports.get_server_stamp()}`;
};

// 解析token
// 这里是前端headers带过来的token，会有Bearer 开头
exports.parse_token = function(auth_token) {
    if (!auth_token) {
        return {};
    }

    let [username, token_stamp] = auth_token.split(' ')[1].split('-');

    return {
        username: username,
        token_stamp: parseInt(token_stamp),
    };
};
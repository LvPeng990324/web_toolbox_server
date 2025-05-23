const winston = require("winston");
const { combine, timestamp, label, printf } = winston.format;
// 创建可写流
const { Writable } = require("stream");
const stream = new Writable({
  objectMode: false,
  write: (raw) => console.log("stream msg", raw.toString()),
});
// 创建http服务
const http = require("http");
http
  .createServer((req, res) => {
    const arr = [];
    req
      .on("data", (chunk) => arr.push(chunk))
      .on("end", () => {
        const msg = Buffer.concat(arr).toString();
        console.log("http msg", msg);
        res.end(msg);
      });
  })
  .listen(8080);

// 配置自定义格式
const custom_format = winston.format.printf((info) => {
    return `[${info.label}] [${info.timestamp}] ${info.level}: ${info.message}`;
});

// 配置logger
const logger = winston.createLogger({
    // 配置 4 种通道
    transports: [
        new winston.transports.Console(),
        // new winston.transports.File({ filename: "server.log" }),
        // new winston.transports.Http({ host: "localhost", port: 8080 }),
        // new winston.transports.Stream({ stream }),
    ],
    // 配置格式
    format: combine(
        label({label: "server label"}),
        timestamp(),
        custom_format,
    ),
});

module.exports = logger;

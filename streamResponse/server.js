const http = require("http");
const path = require("path");
const fs = require("fs");

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage>} res
 */
async function handlePost(req, res) {
  res.end("post successful");
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage>} res
 */
async function handleGet(req, res) {
  const filePath = path.resolve(__dirname, "./welcome.txt");
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const fileSize = fs.statSync(filePath).size;

  let currentIndex = 0;
  const chunkSize = 10; // 每次发送10个字符

  console.log(fileContent.length);
  // 定义一个函数，用来发送数据块
  const sendChunk = () => {
    if (currentIndex < fileContent.length) {
      const chunk = fileContent.slice(currentIndex, currentIndex + chunkSize);
      console.log(chunk, currentIndex, currentIndex + chunkSize);
      res.write(chunk);
      currentIndex += chunkSize;
    } else {
      console.log("file be sent finish");
      clearInterval(intervalId); // 全部发送完毕，清除定时器
      res.end(); // 结束响应
    }
  };

  // 使用 setInterval 来控制发送的频率
  const intervalId = setInterval(sendChunk, 1000); // 每100毫秒发送一次
  res.setHeader("content-length", fileSize);
  // 如果客户端中断连接，则清除定时器
  res.on("close", () => {
    clearInterval(intervalId);
  });
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage>} res
 */
async function setCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
}

const server = http.createServer((req, res) => {
  setCors(req, res);
  if (req.method.toLowerCase() == "post") {
    handlePost(req, res);
  } else {
    handleGet(req, res);
  }
});

const port = 3002;
server.listen(port, () => {
  console.log("server listen: ", port);
});

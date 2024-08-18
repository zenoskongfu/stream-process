const http = require("http");
const { formidable } = require("formidable");
const path = require("path");
const { getFilesName } = require("./utils");
const uploadDir = path.join(__dirname, "./upload");
const fs = require("fs");

const server = http.createServer((req, res) => {
  setCors(req, res);
  if (req.method.toLowerCase() == "post") {
    handlePost(req, res);
  } else {
    handleGet(req, res);
  }
});

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage>} res
 */
async function setCors(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage>} res
 */
async function handlePost(req, res) {
  const form = formidable({ allowEmptyFiles: true, minFileSize: 0 });
  form.uploadDir = uploadDir;
  form.keepExtensions = true;

  try {
    const [field, files] = await form.parse(req);

    res.statusCode = 200;
    res.end(JSON.stringify({ status: "success", files: getFilesName(files) }));
  } catch (error) {
    console.error(error);
    res.writeHead(400, { "Content-Type": "text/plain" });
    res.end(JSON.stringify(error));
  }
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse<http.IncomingMessage>} res
 */
function handleGet(req, res) {
  // res.end("welcome to simple server");
  function renderFile(filePath) {
    filePath = path.resolve(__dirname, filePath);
    if (fs.existsSync(filePath)) {
      if (filePath.endsWith("js")) {
        res.setHeader("content-type", "text/javascript");
      }
      fs.createReadStream(filePath).pipe(res);
    } else {
      renderFile("../index.html");
    }
  }
  console.log(req.url);
  let filePath = req.url == "/" ? "/index.html" : req.url;
  // let filePath = req.url;

  renderFile(".." + filePath);
}

const port = 3000;
server.listen(port, () => {
  console.log("server listen: ", port);
});

const http = require("http");
const { formidable } = require("formidable");
const saveFiles = require("./saveFiles");
const path = require("path");
const { getFilesName } = require("./utils");
const uploadDir = path.join(__dirname, "./upload");

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
	const form = formidable({});
	form.uploadDir = uploadDir;
	form.keepExtensions = true;

	try {
		const [fields, files] = await form.parse(req);
		console.log(fields, files);

		// use uploadDir field to save file automatically
		// await Promise.all(saveFiles(Object.values(files)));

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
	res.end("welcome to simple server");
}

const port = 3000;
server.listen(port, () => {
	console.log("server listen: ", port);
});

const formidable = require("formidable");
const fs = require("fs");
const path = require("path");
/**
 * @param {formidable.Files<string>} files
 * save files from formidable, manually
 */
function saveFiles(files) {
	return files.map((file) => {
		file = file[0];
		console.log("file", file, file.originalFilename, file.filepath);
		return new Promise((resolve) => {
			const savePath = path.resolve(__dirname, "./upload/" + (file.originalFilename || "test.png"));
			const writeStream = fs.createWriteStream(savePath, { flags: "w" });
			const readStream = fs.createReadStream(file.filepath);
			readStream.pipe(writeStream);
			resolve();
		});
	});
}

module.exports = saveFiles;

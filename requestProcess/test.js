const fs = require("fs");
const path = require("path");

const filePath = path.resolve(__dirname, "./files/test.png");
fs.createWriteStream(filePath, { encoding: "utf-8", flags: "w" });

/**
 * @param {formidable.Files<string>[]} files
 * get files new name
 */
function getFilesName(files) {
	return Object.entries(files).reduce((res, [field, files]) => {
		res[field] = files.map((file) => file.newFilename);
		return res;
	}, {});
	// return Object.values(files).map((file) => {
	// 	return file.newFilename;
	// });
}

exports.getFilesName = getFilesName;

export default function http(url, stepCallback = () => null, completeCallback = () => null) {
	let totalSize = 0;
	return new Promise((resolve, reject) => {
		fetch(url)
			.then((res) => {
				if (!res.ok) reject();
				totalSize = res.headers.get("content-length");
				totalSize = totalSize ? parseInt(totalSize, 10) : 0;
				return res.body;
			})
			.then((body) => body.getReader())
			.then(async (reader) => {
				let result = [];
				let loadSize = 0;

				while (1) {
					const { done, value } = await reader.read();
					if (done) {
						console.log("success");
						break;
					}

					loadSize += value.byteLength;
					console.log("process: ", (loadSize / totalSize) * 100);
					stepCallback(loadSize / totalSize);
					result.push(value);
				}

				// loadImg(result);
				completeCallback(result);
				resolve(result);
			});
	});
}

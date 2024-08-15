/**
 *
 * @param {string} url
 * @param {{stepCallback: Function, startCallback: Function}} reqData
 * @param {{stepCallback: Function, startCallback:Function, completeCallback: Function}} resData
 */
export default function xmlRequest(url, data, reqData = {}, resData = {}) {
	return new Promise((resolve, reject) => {
		const xhr = new XMLHttpRequest();
		// xhr.responseType = "blob";

		xhr.upload.onloadstart = () => {
			console.log("request start");
		};

		xhr.upload.onprogress = (e) => {
			if (e.lengthComputable) console.log(e.target, e.loaded, e.total, e.lengthComputable);
		};

		xhr.onloadstart = () => {
			console.log("response start");
		};

		xhr.onload = () => {
			if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
				const res = xhr.response;
				resData?.completeCallback?.(res);
				resolve(res);
				console.log("response success");
			} else {
				reject(xhr.status);
			}
		};
		xhr.onprogress = (e) => {
			if (e.lengthComputable) {
				resData?.stepCallback?.(e.loaded / e.total);
			}
		};

		xhr.open("post", url, true);
		xhr.send(data);
	});
}

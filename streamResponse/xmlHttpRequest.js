export default function xmlRequest(
  url,
  stepCallback = () => null,
  completeCallback = () => null
) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = "text";
    xhr.onload = () => {
      if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
        // const res = JSON.parse(xhr.responseText);
        const res = xhr.response;
        console.log(res);
        completeCallback(res);
        resolve(res);
      } else {
        reject(xhr.status);
      }
    };

    xhr.onprogress = (e) => {
      if (e.lengthComputable) {
        // e.
        // console.log(e, e.loaded / e.total);
        stepCallback(e.loaded / e.total, xhr.response);
      }
    };

    xhr.open("get", url, true);
    xhr.send(null);
  });
}

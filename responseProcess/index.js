import fetchRequest from "./fetchRequest.js";
import xmlRequest from "./xmlHttpRequest.js";
const img =
  "https://p4.itc.cn/images01/20220318/7494a73201ba45ac9a3282d0fc93cf05.jpeg";

function calcLine(percent) {
  const line = document.querySelector(".process-line");
  line.style.width = percent * 300 + "px";

  const processText = document.querySelector(".process-text");
  if (percent == 1) {
    processText.innerHTML = "100%";
  } else {
    processText.innerHTML = (percent * 100 + "").substring(0, 2) + "%";
  }
}

function displayImg(chunks) {
  const blob = new Blob(chunks, { type: "image/jpeg" });
  const url = URL.createObjectURL(blob);
  const img = document.createElement("img");
  img.src = url;
  document.body.appendChild(img);
}

async function action() {
  // const chunk = await fetchRequest(img, calcLine);
  let chunk = await xmlRequest(img, calcLine);
  chunk = [chunk];
  displayImg(chunk);
}

action();

function loadImg(chunks) {
  // 创建 Blob
  const blob = new Blob(chunks, { type: "image/jpeg" });
  // const blob = new Blob([buffer], { type: "image/jpeg" });

  let url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "woman.png";
  a.click();

  // 释放
  URL.revokeObjectURL(url);
}

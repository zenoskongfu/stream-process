import xmlRequest from "./xmlRequest.js";

const formEl = document.getElementById("formEl");
formEl.onsubmit = async (e) => {
  e.preventDefault();

  const url = "/upload";
  await xmlRequest(url, new FormData(formEl), {
    startCallback: displayProcess,
    stepCallback: calcLine,
  });

  finishProcess();
};

function displayProcess() {
  const processContainer = document.querySelector(".process-container");
  processContainer.style.display = "flex";
}

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

function finishProcess() {
  const processText = document.querySelector(".process-text");
  processText.innerHTML = "上传成功";
}

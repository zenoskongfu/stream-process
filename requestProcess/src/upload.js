import xmlRequest from "./xmlRequest.js";

const formEl = document.getElementById("formEl");
const submit = document.getElementById("submit");
submit.onclick = async (e) => {
	e.preventDefault();

	const url = "http://localhost:3000";
	await xmlRequest(url, new FormData(formEl));
};

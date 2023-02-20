const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
	res.send("Express + TypeScript Server");
});

app.get("/api/auth/:id", function (req, res) {
	// Retrieve the tag from our URL path
	let id = req.params.id;
	console.log(id);

	if (id === "111") {
		return res.status(200).json({ status: "ok" });
	}
	return res.status(401).json({ status: "error" });
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
	res.send("Express + TypeScript Server");
});

app.get("/api/auth/:id", async function (req, res) {
	// Retrieve the tag from our URL path
	let id = req.params.id;

	if (id === "111") {
		res.status(200).json({ status: "error" });
	}
	res.status(401).json({ status: "error" });
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

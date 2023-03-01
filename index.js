const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = process.env.PORT;
const line = require("@line/bot-sdk");
const bodyParser = require("body-parser");

const config = {
	channelAccessToken: process.env.channelAccessToken,
	channelSecret: process.env.channelSecret,
};

const client = new line.Client(config);

app.use("/webhook", line.middleware(config));
app.use(bodyParser.json());

app.get("/", (req, res) => {
	res.send("Express + TypeScript Server");
});

app.post("/webhook", async (req, res) => {
	console.log("have a request");
	const { events } = req.body;
	const promises = [];
	for (let event of events) {
		if (event.type === "message" && event.message.type === "text") {
			const { text } = event.message;
			if (text === "QR") {
				console.log("request: QR");
				const imageUrl =
					"https://img.freepik.com/premium-vector/scan-me-qr-code-design-qr-code-payment-text-transfer-with-scan-me-button-vector-illustration_499431-1152.jpg";
				promises.push(
					client.replyMessage(event.replyToken, {
						type: "image",
						originalContentUrl: imageUrl,
						previewImageUrl: imageUrl,
					})
				);
			} else {
				promises.push(
					client.replyMessage(event.replyToken, {
						type: "text",
						text: "I didn't understand that. Can you try again?",
					})
				);
			}
		}
	}
	await Promise.all(promises);
	console.log("OK");
	res.status(200).send("OK");
});

app.get("/api/auth/:id", function (req, res) {
	// Retrieve the tag from our URL path
	let id = req.params.id;
	console.log(id + "postfix");

	if (id === "111") {
		return res.status(200).json({ status: "ok" });
	}
	return res.status(401).json({ status: "error" });
});

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});

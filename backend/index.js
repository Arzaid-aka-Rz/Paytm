//backend/index.js
const express = require('express');
//CORS for handling cross-origin requests
const cors = require('cors');
const rootRouter = require("./routes/index");

const app =express();

// Enabling CORS for all routes
app.use(cors());

app.use(express.json());

// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

app.use("/api/v1",rootRouter);

app.listen(3000);
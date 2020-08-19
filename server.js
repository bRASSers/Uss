import handler from "./handler.js";
import express from "express";

const port = 8080;
const app = express();

app.use("/", express.static("static"));

app.use("/", express.json());
app.post("/", function (req, res) {
    handler(req.body).then(function (responseObj) {
        res.json(responseObj);
    });
});

app.listen(port, function () {
    console.log("listening on port " + port);
});
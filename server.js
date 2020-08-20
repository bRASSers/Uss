import db from "./handler.js";
import express from "express";
 
const port = 8080;
const app = express();
 
app.use("/", express.static("static"));
app.use("/", express.json());
 
app.get("/scores", (req, res, next) => {
    db.all('SELECT * FROM scores', [], (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.status(200).json(rows)
    });
});
 
app.post("/scores/", (req, res, next) => {
    const reqBody = req.body;
    db.run(`INSERT INTO scores (highscore) VALUES (?)`,
        [reqBody.highscore],
        function (err, result) {
            if (err) {
                res.status(400).json({ "error": err.message })
                return;
            }
            res.status(201).json({
                "status": "succesfully added highscore"
            })
        });
});
 
app.listen(port, function () {
    console.log("listening on port " + port);
});
import sqlite3 from "sqlite3";
 
const db = new sqlite3.Database("./snake_database.db", (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
        db.run('CREATE TABLE scores( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            highscore INTEGER\
        )', (err) => {
            if (err) {
                console.log("Table already exists.")
            }
        });
    }
})
 
export default db
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("")

const handler = function (obj) {
    const query = "select * from scores";

};

export default Object.freeze(handler);
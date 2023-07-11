const express = require("express");
const sqlite3 = require("sqlite3");
const { open } = require("sqlite");
const app = express();
const path = require("path");
const databasePath = path.join(__dirname, "cricketTeam.db");
let db = null;
let initializeDatabase = async () => {
  try {
    db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Running");
    });
  } catch (e) {
    console.log(`error ${e}`);
    process.exit(1);
  }
};
initializeDatabase();

app.get("/players/", async (request, response) => {
  const query = `
    SELECT
       *
    FROM
    cricket_team;
    `;
  const res = await db.all(query);
  response.send(res);
});

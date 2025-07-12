const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Welcome to homee");
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
use('mydb');
db.users.insertOne({ name: "Ziad" });
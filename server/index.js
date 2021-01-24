const express = require('express');
const path = require("path");
const app = express();
const { connect } = require('./db');

connect();

const restRoute = require('./routes/rests.route');

app.set("json spaces",2);
app.use(express.json());
app.use("/api/rests", restRoute);
app.use("/", express.static(path.join(__dirname, '../client/build')));

let port = 3001;
if(process.env.PORT) {
    port = process.env.PORT;
}

app.listen(port);
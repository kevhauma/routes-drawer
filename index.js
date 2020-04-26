let express = require("express");
let bodyParser = require("body-parser");
let opn = require('opn');

let app = express();

app.use(express.static('client'));

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


app.listen(3000, () => {
    console.log("listening on 3000")
    console.log("opening browser")
    opn('http://localhost:3000');
});

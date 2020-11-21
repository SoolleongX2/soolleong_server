const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const port = 3002;
app.listen(port, ()=> console.log(`app listening on port ${port}!`));
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const {sequelize} = require('./models');
sequelize.sync({ alter : true})
.then(() => {
  console.log('데이터베이스 연결 성공');
})
.catch((error) => {
  console.error(error);
})

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const port = 3002;
app.listen(port, ()=> console.log(`app listening on port ${port}!`));
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ entended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const num1 = Number(req.body.n1);
  const num2 = Number(req.body.n2);
  const result = num1 + num2;
  res.send('The result is ' + result);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});

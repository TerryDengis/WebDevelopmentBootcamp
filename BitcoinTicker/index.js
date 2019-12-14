const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const options = {
    url: 'https://apiv2.bitcoinaverage.com/convert/global',
    method: 'GET',
    qs: {
      from: req.body.crypto,
      to: req.body.fiat,
      amount: req.body.amount
    }
  };

  request(options, (error, response, body) => {
    const data = JSON.parse(body);
    const price = data.price;

    res.write(`<h1>As of ${data.time}</h1>`);
    res.write(
      `<h2>Price for ${req.body.amount} ${req.body.crypto} is $${price} ${req.body.fiat}</h2>`
    );
    res.send();
  });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

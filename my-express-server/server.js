const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('home page');
});
app.get('/contact', (req, res) => {
  res.send('contact page');
});
app.get('/about', (req, res) => {
  res.send('about me');
});
app.listen(3000, () => {
  console.log('Server started on port 3000');
});

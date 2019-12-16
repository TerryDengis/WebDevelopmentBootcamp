const express = require('express');
const bodyParser = require('body-parser');

const date = require('./date');

const app = express();
const listItems = ['Buy food', 'Cook food', 'Eat food'];
const workItems = ['Check email'];

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  const day = date.getDay();
  res.render('list', { listTitle: day, listItems: listItems });
});

app.post('/', (req, res) => {
  if (req.body.list === 'Work') {
    workItems.push(req.body.newItem);
    res.redirect('/work');
  } else {
    listItems.push(req.body.newItem);
    res.redirect('/');
  }
});

app.get('/work', (req, res) => {
  res.render('list', { listTitle: 'Work List', listItems: workItems });
});

app.get('/about', (req, res) => {
  res.render('about', {});
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});

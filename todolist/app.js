const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const _ = require('lodash');

const date = require('./date');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const itemsSchema = {
  name: String
};
const Item = mongoose.model('Item', itemsSchema);

const listSchema = {
  name: String,
  items: [itemsSchema]
};

const List = mongoose.model('List', listSchema);

const item1 = new Item({ name: 'Welcome to your to do list' });
const item2 = new Item({ name: 'Hit the + button to add a new item' });
const item3 = new Item({ name: '<-- Hit this to delete am item' });

async function addDefaultItems() {
  await Item.insertMany([item1, item2, item3], err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Inserted default items');
    }
  });
}

app.get('/', (req, res) => {
  Item.find({}, (err, foundItems) => {
    if (err) {
      console.log(err);
    } else {
      if (foundItems.length === 0) {
        addDefaultItems();
        res.redirect('/');
      } else {
        //const day = date.getDay();
        res.render('list', { listTitle: 'Today', listItems: foundItems });
      }
    }
  });
});

app.post('/', (req, res) => {
  const itemName = req.body.newItem;
  const listName = req.body.list;

  const newItem = new Item({ name: itemName });

  if (listName === 'Today') {
    newItem.save();
    res.redirect('/');
  } else {
    List.findOne({ name: listName }, (err, found) => {
      if (err) {
        console.log(err);
      } else {
        found.items.push(newItem);
        found.save();
        res.redirect('/' + listName);
      }
    });
  }
});

app.post('/delete', (req, res) => {
  const checkedItemId = req.body.checkbox;
  const listName = req.body.listName;

  if (listName === 'Today') {
    Item.findByIdAndRemove(checkedItemId, err => {
      if (err) {
        console.log(err);
      } else {
        res.redirect('/');
      }
    });
  } else {
    List.findOneAndUpdate(
      { name: listName },
      { $pull: { items: { _id: checkedItemId } } },
      (err, found) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/' + listName);
        }
      }
    );
  }
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/:listName', (req, res) => {
  const customListName = _.capitalize(req.params.listName);

  List.findOne({ name: customListName }, (err, foundList) => {
    if (!foundList) {
      const list = new List({
        name: customListName,
        items: [item1, item2, item3]
      });
      list.save();
      res.redirect('/' + customListName);
    } else {
      res.render('list', { listTitle: foundList.name, listItems: foundList.items });
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});

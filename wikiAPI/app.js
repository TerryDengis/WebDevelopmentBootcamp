const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const articleSchema = {
  title: String,
  content: String
};

const Article = mongoose.model('Article', articleSchema);

app
  .route('/articles/:articleTitle')
  .get((req, res) => {
    Article.findOne({ title: req.params.articleTitle }, (err, result) => {
      if (err) {
        res.send(err);
      } else {
        if (result) {
          res.send(result);
        } else {
          res.send('No title found with that title');
        }
      }
    });
  })

  .put((req, res) => {
    Article.update(
      { title: req.params.articleTitle },
      { title: req.body.title, content: req.body.content },
      { overwrite: true },
      (err, result) => {
        if (err) {
          res.send(err);
        } else {
          res.send('Successfully updated article');
        }
      }
    );
  })

  .patch((req, res) => {
    Article.update({ title: req.params.articleTitle }, { $set: req.body }, err => {
      if (err) {
        res.send(err);
      } else {
        res.send('Successfully updated article');
      }
    });
  })

  .delete((req, res) => {
    Article.deleteOne({ title: req.params.articleTitle }, err => {
      if (err) {
        res.send(err);
      } else {
        res.send('Successfully deleted article');
      }
    });
  });

app
  .route('/articles')

  .get((req, res) => {
    Article.find({}, (err, results) => {
      if (err) {
        res.send(err);
      } else {
        res.send(results);
      }
    });
  })

  .post((req, res) => {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content
    });
    newArticle.save(err => {
      if (err) {
        res.send(err);
      } else {
        res.send('Article saved');
      }
    });
  })

  .delete((req, res) => {
    Article.deleteMany({}, err => {
      if (err) {
        res.send(err);
      } else {
        res.send('Deleted all records');
      }
    });
  });

app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port 3000');
});

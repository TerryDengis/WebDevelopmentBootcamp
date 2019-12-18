const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/fruitsDB', {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

const fruitSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'You need a name dude']
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});
const Fruit = mongoose.model('Fruit', fruitSchema);
const fruit = new Fruit({
  name: 'Dragon Fruit',
  rating: 1,
  review: 'What the heck is this'
});

//fruit.save();

const kiwi = new Fruit({
  name: 'Kiwi',
  rating: 10,
  review: 'My favorite'
});
const banana = new Fruit({
  name: 'banana',
  rating: 8,
  review: 'Great fruit'
});
const orange = new Fruit({
  name: 'Orange',
  rating: 3,
  review: 'Sour'
});

// Fruit.insertMany([kiwi, banana, orange], err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('Saved fruit');
//   }
// });

const grapefruit = new Fruit({
  name: 'Grapefruit',
  rating: 8,
  review: 'Great fruit'
});
grapefruit.save();

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favFruit: fruitSchema
});
const Person = mongoose.model('Person', personSchema);
// const person = new Person({
//   name: 'Amy',
//   age: 12,
//   favFruit: pineapple
// });

//person.save();

Fruit.find((err, fruits) => {
  if (err) {
    console.log(err);
  } else {
    fruits.forEach(fruit => {
      console.log(fruit._id, fruit.name);
    });
  }
});

Person.update(
  {
    _id: '5df94adfbcd8d8a34122a7b4'
  },
  { favFruit: grapefruit },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Person updated');

      mongoose.connection.close();
    }
  }
);

// Fruit.update(
//   {
//     _id: '5df943a82a781e9a9a40e1ec'
//   },
//   { name: 'Peach' },
//   err => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('updated');
//     }
//   }
// );

// Fruit.deleteOne(
//   {
//     name: 'Peach'
//   },
//   err => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('deleted');
//     }
//     mongoose.connection.close();
//   }
// );

// Person.deleteMany({ name: 'Terry' }, err => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log('deleted');
//   }
//   mongoose.connection.close();
// });

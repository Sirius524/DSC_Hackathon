const mongoose = require('mongoose');
const app = require('./app');

const DB = require('mongodb+srv://mark:UBEzv5TENYROTgwh@cluster0.z3nm5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

mongoose.connect();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

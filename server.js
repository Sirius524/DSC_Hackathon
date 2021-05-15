const mongoose = require('mongoose');
const app = require('./app');

// const DB = 'mongodb+srv://mark:UBEzv5TENYROTgwh@cluster0.z3nm5.mongodb.net/graduation?retryWrites=true&w=majority';
const DB = 'mongodb+srv://mark:UBEzv5TENYROTgwh@cluster0.z3nm5.mongodb.net/graduation'

mongoose.connect(DB, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
}).then(con =>{
  console.log(con.connection);
  console.log('DB connect successful!');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

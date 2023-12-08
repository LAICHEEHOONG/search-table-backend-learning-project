const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose')
const mongoUri = `mongodb+srv://n6situsr2022:1QbAA5b4lBg9c7xX@clustersit.wjuit.mongodb.net/trrappdb?retryWrites=true&w=majority`;
const annoucement = require('./routes/api/test');
const test2 = require('./routes/api/page');
const search2 = require('./routes/api/find2');

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Connected to MongoDB');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.use('/api/test', annoucement);
app.use('/api/page', test2);
app.use('/api/find2', search2);

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build/index.html'), function (err) {
      if (err) {
        res.status(404).sendFile(path.join(__dirname, '/view/index.html'));
      }
    });
  })


const port = process.env.PORT || 1337;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})






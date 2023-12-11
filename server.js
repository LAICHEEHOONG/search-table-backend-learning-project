const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}`;

const pages = require('./routes/api/page');
const search = require('./routes/api/find');

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

app.use('/api/page', pages);
app.use('/api/find', search);

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






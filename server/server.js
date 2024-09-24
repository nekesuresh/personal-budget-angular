const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

app.use('/', express.static('public'));

app.get('/budget', (req, res) => {
  fs.readFile(path.join(__dirname, 'budget-data.json'), 'utf8', (err, data) => {
      res.json(JSON.parse(data));
  });
});


app.get('/hello', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

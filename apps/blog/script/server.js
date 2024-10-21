const express = require('express');
const path = require('path');

const app = express();

app.use('/', express.static(path.join(__dirname, '../dist')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '../dist/index.html'));
});

const server = app.listen(8080, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('server is running' + host + port);
});

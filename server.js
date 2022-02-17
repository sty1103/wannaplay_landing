const express = require('express');
const path = require('path');

const app = express();
app.set('port', process.env.PORT || 8080);

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/fonts', express.static(__dirname + '/fonts'));

app.get('/', (req, res) => {
  res.sendFile( path.join( __dirname, '/index.html') );
});

app.listen(app.get('port'), () => {
  console.log( '8080 port listening..');
});
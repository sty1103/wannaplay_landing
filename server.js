const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
app.set('port', process.env.PORT || 8080);

app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/css'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/fonts', express.static(__dirname + '/fonts'));

app.get('/', (req, res) => {
  res.sendFile( path.join( __dirname, '/index.html') );
});

app.get('/video/:num', (req, res) => {
  const dest = __dirname + '/videos/identity_' + req.params.num + '.mp4';
  const stream = fs.createReadStream(dest); // 스트림 객체

  const total = fs.statSync(dest).size; // 파일 총 크기
  const range = req.headers.range; // 요청받은 영상 재생 범위
  const positions = range.replace(/bytes=/, "").split("-");
  const start = parseInt(positions[0]); // 영상 시작 지점
  const end = positions[1] ? parseInt(positions[1]) : total - 1; // 영상 끝 지점
  const chunksize = (end -start) + 1; // 영상을 얼마만큼 잘라서 보내줄지

  stream.on('open', () => {
    res.writeHead(206, {
      "Content-Range": "bytes " + start + "-" + end + "/" + total,
      "Accept-Range": "bytes",
      "Content-Length": chunksize,
      "Content-Type": "video/mp4"
    });
    stream.pipe(res);
  });

  stream.on('error', (err) => {
    console.log(err);
    res.end(err);
  });

});

app.listen(app.get('port'), () => {
  console.log( '8080 port listening..');
});
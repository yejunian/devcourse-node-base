const express = require('express');

const app = express();
app.listen(3000);

class Database {
  constructor(...initialData) {
    this.nextID = 1;
    this.storage = new Map();

    for (const record of initialData) {
      this.set(record);
    }
  }

  get(id) {
    return this.storage.get(id);
  }

  set(record) {
    this.storage.set(this.nextID, record);
    return this.nextID++;
  }
}

let db = new Database(
  { channelTitle: 'AMKU', subscriber: 3250000, videoCount: 260 },
  { channelTitle: '드보키', subscriber: 188000, videoCount: 217 },
  { channelTitle: 'haha ha', subscriber: 1220000, videoCount: 696 }
);

app.get('/creators', (req, res) => {
  let data = [];

  for (const [id, record] of db.storage) {
    data.push(record);
  }

  res.json(data);
});

app.get('/creators/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const creator = db.get(id);
  console.log(creator);

  if (!creator) {
    res.json({
      message: '크리에이터 정보를 찾을 수 없습니다.',
    });
  } else {
    res.json(creator);
  }
});

app.use(express.json());
app.post('/creators', (req, res) => {
  console.log(req.body);

  const createdID = db.set(req.body);

  res.json({
    message: `${db.get(createdID).channelTitle}님, 채널 성장을 응원합니다!`,
  });
});

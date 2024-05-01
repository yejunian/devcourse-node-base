const express = require('express');

const app = express();
app.listen(3000);

class Database {
  constructor(...initialData) {
    this._nextID = 1;
    this._storage = new Map();
    this.size = 0;

    for (const record of initialData) {
      this.set(this.getNextID(), record);
    }
  }

  get(id) {
    return this._storage.get(id);
  }

  getAll() {
    const creators = {};

    this._storage.forEach((record, id) => {
      creators[id] = record;
    });

    return creators;
  }

  getNextID() {
    return this._nextID++;
  }

  set(id, record) {
    this._storage.set(id, record);
    this._updateStorageSize();
  }

  delete(id) {
    const success = this._storage.delete(id); // 키-값 쌍 삭제에 성공하면 true, 없으면 false
    this._updateStorageSize();
    return success;
  }

  clear() {
    this._storage.clear();
    this._updateStorageSize();
  }

  _updateStorageSize() {
    this.size = this._storage.size;
  }
}

let db = new Database(
  { channelTitle: 'AMKU', subscriber: 3250000, videoCount: 260 },
  { channelTitle: '드보키', subscriber: 188000, videoCount: 217 },
  { channelTitle: 'haha ha', subscriber: 1220000, videoCount: 696 }
);

app.get('/creators', (req, res) => {
  if (db.size <= 0) {
    res.status(404).json({
      message: '조회할 크리에이터가 하나도 없습니다.',
    });
    return;
  }

  res.json(db.getAll());
});

app.get('/creators/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const creator = db.get(id);

  if (!creator) {
    res.status(404).json({
      message: `${id}번 크리에이터 정보를 찾을 수 없습니다.`,
    });
    return;
  }

  res.json(creator);
});

app.use(express.json());
app.post('/creators', (req, res) => {
  const { channelTitle } = req.body ?? {};

  if (!channelTitle) {
    res.status(400).json({
      message: '채널 이름이 없습니다.',
    });
    return;
  }

  const id = db.getNextID();
  db.set(id, { channelTitle, subscriber: 0, videoCount: 0 });

  res.status(201).json({
    message: `${db.get(id).channelTitle}님, 채널 성장을 응원합니다!`,
  });
});

app.delete('/creators/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // undefined의 프로퍼티를 조회하지 않도록 nullish coalescing으로 대응
  const { channelTitle, subscriber } = db.get(id) ?? {};

  const success = db.delete(id);

  if (!success) {
    res.status(404).json({
      message: `${id}번 크리에이터 정보를 찾을 수 없습니다.`,
    });
    return;
  }

  if (subscriber >= 100) {
    res.json({
      message: `${channelTitle}님, 구독자 ${subscriber}명이 그리워할 거예요.`,
    });
  } else {
    res.json({
      message: `${channelTitle}님, 나중에 다시 뵙겠습니다.`,
    });
  }
});

app.delete('/creators', (req, res) => {
  if (db.size <= 0) {
    res.status(404).json({
      message: '삭제할 크리에이터가 없습니다.',
    });
    return;
  }

  db.clear();

  res.json({
    message: '모든 크리에이터를 삭제했습니다.',
  });
});

app.put('/creators/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { channelTitle } = req.body ?? {};

  const oldCreator = db.get(id);

  if (!oldCreator) {
    res.status(404).json({
      message: `${id}번 크리에이터 정보를 찾을 수 없습니다.`,
    });
    return;
  }

  if (!channelTitle) {
    res.status(400).json({
      message: '새 채널 이름이 없습니다.',
    });
    return;
  }

  if (channelTitle === oldCreator.channelTitle) {
    res.status(400).json({
      message: `새 채널 이름 ${channelTitle}이(가) 현재 채널 이름과 동일합니다.`,
    });
    return;
  }

  const newCreator = { ...oldCreator, channelTitle };
  db.set(id, newCreator);

  res.json({
    message: `${oldCreator.channelTitle}님, 채널 이름이 ${channelTitle}(으)로 변경되었습니다.`,
  });
});

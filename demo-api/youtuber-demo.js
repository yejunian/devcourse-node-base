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
    this.size = this._storage.size;
  }

  delete(id) {
    const success = this._storage.delete(id); // 키-값 쌍 삭제에 성공하면 true, 없으면 false
    this.size = this._storage.size;
    return success;
  }

  clear() {
    this._storage.clear();
  }
}

let db = new Database(
  { channelTitle: 'AMKU', subscriber: 3250000, videoCount: 260 },
  { channelTitle: '드보키', subscriber: 188000, videoCount: 217 },
  { channelTitle: 'haha ha', subscriber: 1220000, videoCount: 696 }
);

app.get('/creators', (req, res) => {
  res.json(db.getAll());
});

app.get('/creators/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);

  const creator = db.get(id);

  if (!creator) {
    res.json({
      message: `${id}번 크리에이터 정보를 찾을 수 없습니다.`,
    });
  } else {
    res.json(creator);
  }
});

app.use(express.json());
app.post('/creators', (req, res) => {
  const createdID = db.set(db.getNextID(), req.body);

  res.json({
    message: `${db.get(createdID).channelTitle}님, 채널 성장을 응원합니다!`,
  });
});

app.delete('/creators/:id', (req, res) => {
  const id = parseInt(req.params.id);

  // undefined의 프로퍼티를 조회하지 않도록 nullish coalescing으로 대응
  const { channelTitle, subscriber } = db.get(id) ?? {};

  const success = db.delete(id);

  let message;

  if (success) {
    if (subscriber >= 100) {
      message = `${channelTitle}님, 구독자 ${subscriber}명이 그리워할 거예요.`;
    } else {
      message = `${channelTitle}님, 나중에 다시 뵙겠습니다.`;
    }
  } else {
    message = `${id}번 크리에이터 정보를 찾을 수 없습니다.`;
  }

  res.json({ message });
});

app.delete('/creators', (req, res) => {
  let message;

  if (db.size > 0) {
    db.clear();
    message = '모든 크리에이터를 삭제했습니다.';
  } else {
    message = '삭제할 크리에이터가 없습니다.';
  }

  res.json({ message });
});

app.put('/creators/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { channelTitle } = req.body ?? {};

  const oldCreator = db.get(id);
  let message;

  if (!oldCreator) {
    message = `${id}번 크리에이터 정보를 찾을 수 없습니다.`;
  } else if (!channelTitle) {
    message = '새 채널 이름을 입력해야 합니다.';
  } else if (channelTitle === oldCreator.channelTitle) {
    message = `새 채널 이름 ${channelTitle}이(가) 현재 채널 이름과 동일합니다.`;
  } else {
    const newCreator = { ...oldCreator, channelTitle };
    db.set(id, newCreator);

    message = `${oldCreator.channelTitle}님, 채널 이름이 ${channelTitle}(으)로 변경되었습니다.`;
  }

  res.json({ message });
});

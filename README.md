# 프로그래머스 풀스택 데브코스 — Express 실습 결과물

> #### 데브코스 수강 정보
>
> * 타입스크립트로 함께하는 웹 풀 사이클 개발(React, Node.js) 3기
> * https://school.programmers.co.kr/learn/courses/22464

---

## 2024-05-01

### if에 긍정 조건 넣기

강의 내용에 따라서 내가 작성한 코드의 부정 조건을 긍정으로 바꿨는데 오히려 읽기 어려워졌다.

```javascript
app.put('/creators/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { channelTitle } = req.body ?? {};

  const oldCreator = db.get(id);
  let message;

  // (1) 어제까지 작성한 코드:
  //     if의 중첩이 없고, 실패 상황을 먼저 처리한다.
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
```

```javascript
app.put('/creators/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { channelTitle } = req.body ?? {};

  const oldCreator = db.get(id);
  let message;

  // (2) if 문의 조건을 긍정문으로 변경한 코드:
  //     if 3중첩이 발생하고, 성공과 실패가 뒤섞인다.
  if (oldCreator) {
    if (channelTitle) {
      if (channelTitle === oldCreator.channelTitle) {
        message = `새 채널 이름 ${channelTitle}이(가) 현재 채널 이름과 동일합니다.`;
      } else {
        const newCreator = { ...oldCreator, channelTitle };
        db.set(id, newCreator);

        message = `${oldCreator.channelTitle}님, 채널 이름이 ${channelTitle}(으)로 변경되었습니다.`;
      }
    } else {
      message = '새 채널 이름을 입력해야 합니다.';
    }
  } else {
    message = `${id}번 크리에이터 정보를 찾을 수 없습니다.`;
  }

  res.json({ message });
});
```

[좋은 분기문(if) 작성법](https://redutan.github.io/2016/04/01/good-if)에서는 읽기 좋은 분기문을 작성하는 몇 가지 방법을 소개한다.

* 보호 절(Guard clause): 유효하지 않은 상황에는 해당 지역을 벗어난다. (‘Early return’이라는 키워드가 떠오른다.)
* `if` - `else` 블록의 순서
    * 가능한 한 `if`에 긍정 조건을 넣어야 읽기 좋다.
    * 두 블록 중 간단한 블록을 `if`에 둔다.
    * 단 보호 절을 적용하는 게 먼저다. (부정 조건을 넣더라도 중첩을 없애는 쪽이 낫다.)

#### 쟁점

> 참고: [[디자인 패턴]Early return pattern이란?](https://woonys.tistory.com/209)

* 종료 지점이 많으면 읽기 어렵다. 특히 긴 함수 여기저기에 `return`이 널부러져 있다면 읽기 어렵다. 이때는 일부를 함수로 추출하여 적당한 크기로 줄여야 한다.
* 코드 스타일은 주관적이다. 팀에서 약속한 대로...

---

## 2024-04-30

### forEach 메서드 추가 내용

* 루프를 중간에 멈출 수 없다. 루프 중간에 탈출해야 한다면 `for`, `for...of`, `for...in`을 사용해야 한다.
* 희소 배열(sparse array)의 빈 슬롯을 제외하고 순회한다.
* 참고: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach

### map 메서드 추가 내용

* 콜백 함수에서 값을 리턴하지 않으면 `undefined`를 리턴한 것과 같으므로, 그 자리는 `undefined`로 채워진다.
* 희소 배열의 빈 슬롯은 처리하지 않고 빈 슬롯 그대로 돌려준다.
* `map()` 메서드의 콜백 함수는 side effect가 없는 순수 함수로 작성한다.
* 참고: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map

### 리팩터링

* 기능을 추가하기 전에 리팩터링을 해야 한다는 점은 처음 알았다. (집에 새 가구를 들여놓기 전에 기존 물품을 정리하고 청소하는 모습이 떠오른다.)

---

## 2024-04-29

* ‘Map에 데이터 넣기’와 ‘다음 키(`id`) 값 수정하기’를 한 번에 진행하면 좋을 것 같아서, Map을 클래스로 감쌌다.
* `GET /creators`를 미리 구현해 보았다. (강의에서는 `GET /youtubers`)

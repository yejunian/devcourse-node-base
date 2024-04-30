# 프로그래머스 풀스택 데브코스 • 실습 결과물

> #### 데브코스 수강 정보
>
> * 타입스크립트로 함께하는 웹 풀 사이클 개발(React, Node.js) 3기
> * https://school.programmers.co.kr/learn/courses/22464

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

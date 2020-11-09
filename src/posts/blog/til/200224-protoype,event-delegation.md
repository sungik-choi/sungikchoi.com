---
title: "2월 24일 (월) TIL"
category: "TIL"
date: "2020-02-24"
desc: "오늘 배운 것을 정리합니다."
thumbnail: "../images/til/thumbnail.png"
alt: ""
---

## 오늘의 계획

- [ ] 수업 듣고 미션 진행하기 -> 정리 먼저

## 회고

- Git을 완전히 잘못 하고 있었다. 충돌이 났는데 해결할 엄두조차 못낼 정도로...
- rebase, fetch, cherrypick... git 참고 문서 보면서 CLI로 차근차근 제대로 해보기. 충돌 안나게.
- 컨디션 관리 잘하기. 주말에 컨디션 관리를 못해서 월요일에 너무 힘들다.

## 수업

### 지난 주 Fetch

- 변경이 많을 거 같다면 템플릿 파일을 따로 분리하는 것도 방법이다.
- 생성자가 필요없다면 그냥 객체 리터럴로 만들어도 된다. (객체가 2개 이상 필요한게 아니라면)
- 자바스크립트는 원래 클래스 없이 사용할 수 있는 언어
- ES Module

### Event Propagation(전파) / Delegation(위임)

- 이벤트가 중첩되어도 다 실행이 된다.
- 부모, 자식 어디가 먼저 실행될까?
- Bubbling / Capturing 순서
- 예를 들어 ul 에 클릭 이벤트를 걸고, 분기처리 하면 된다.
- for 문으로 일일이 이벤트를 요소마다 등록해줄 필요가 없다.
- currentTarget, tagname 등을 참조하면 된다.
- 대신 addEventListener 안의 콜백함수에서 분기처리를 다 해줘야 되는게 문제다.
- `event.stopPropagation()`

### this

- 호출될 때 결정된다. 그래서 this는 외울 수 없다. 늘 달라질 수 있다.
- **디버깅**을 하면서 this를 깨달아보기
- **bind** 아주 중요하다. 꼭 공부해보기. call/apply 보다 bind!
- this 를 제어할 때 많이 사용한다.
- 비동기 콜백할 때 많이 사용한다. 보통 this가 window를 가르키므로...

### prototype

```js
const a = new Animal("호랑이", 22);
a;
Animal {name: "호랑이", age: 22}
  name: "호랑이"
  age: 22
  __proto__:
  constructor: class Animal
  run: ƒ run()
  setName: ƒ setName(name)
  info: ƒ info()
  __proto__: Object
```

- 클래스로 생성한 객체안에 키 밸류 값은 객체에 있는데, 메서드와 생성자는 `__proto__` 안에 들어있다.
- 여러 객체가 같이 쓰는 정보들은 `prototype` 안에 들어있다. 메모리 효율성을 위해서
- `a.info() === b.info() // true` -> 같은 객체를 바라보고 있다.
- 함수를 `new`로 호출하면 함수가 생성자가 되고, 객체를 만들어준다.
- 프로토타입을 쓰는 이유.
- `Object` 에 있는 `prototype` -> 최상위 프로토타입.
- `Object` 아래에 Array, String, Math... 하이어라키
- 그렇기 때문에 자바스크립트의 모든 것은 객체다.
- 프로토타입을 타고 타고... -> 프로토타입 체인
- 프로토타입 자체가 상속이다
- 대신 체인이기 때문에(한 방향), 다중상속을 하려면 부모위에 부모가 있다던가 식으로 해야함

### 자동완성

- u에 대한 응답값, us에 대한 응답값, usb에 대한 응답값. 식으로 자동완성 데이터 만들어두기
- delegation, prototype, fetch, keyboard event
- 키보드 동작에 따라 서버에 데이터를 주고 받는 부분

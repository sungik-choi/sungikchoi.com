---
title: "자바스크립트 프로토타입 알아보기"
category: "JavaScript"
date: "2020-02-25"
desc: "자바스크립트의 프로토타입에 대해 알아봅시다!"
thumbnail: "./images/prototype/thumbnail.png"
alt: ""
---

모든 객체는 속성을 상속하는 프로토타입 객체에 연결돼 있다. 객체 리터럴로 생성되는 모든 객체는 자바스크립트의 표준 객체인 `Object`의 속성인 `prototype(Object.prototype)` 객체에 연결된다.

`Prototype`. 나는 프로토타입을 언어가 가지는 뜻 그대로 기초. 뼈대라는 식으로 이해했다. 프로토타입이 같다면 서로 다른 객체들도 자신들의 프로토타입의 메서드를 사용할 수 있다. 프로토타입을 타고 들어가는(prototype chain) 자체가 일종의 상속.

현재는 ES Classes가 가장 표준처럼 쓰이고 있지만, 결국 Class도 prototype기반의 객체를 숨겨둔 형태일뿐이다. 실제로 자바스크립트에는 클래스가 존재하지 않는다.

## 객체 표현법

### 객체 리터럴 (Singletone)

```js
const healthObj = {
  name : "홍길동",
  lastTime : "PM 10:12",
  showHealth() {
    console.log(this.name + "님, 오늘은 " + this.lastTime + "에 운동을 하셨네요");
  }
}

healthObj.showHealth();
```

### Class (ES2015)

```js
const Health = class {
  constructor(name, healthTime) {
    this.name = name;
    this.healthTime = healthTime;
  }

  showHealth(){
     console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
  }

}

const ho = new Health("홍길동", "PM 10:12");
ho.showHealth();
```

### Constructor Pattern

function을 `new` 키워드로 호출하면 그 함수는 생성자가 된다.

```js
const Health = function(name, healthTime) {
  this.name = name;
  this.healthTime = healthTime;
  this.showHealth = function() {
    console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
  }
}

const ho = new Health("홍길동", "PM 10:12");
ho.showHealth();
```

### Prototype Pattern

```js
const Health = function(name, healthTime) {
  this.name = name;
  this.healthTime = healthTime;
}

Health.prototype.showHealth = function() showHealth {
  console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
}

const ho = new Health("홍길동", "PM 10:12");
ho.showHealth();
```

### Object.create()

`Object.create()` 메서드를 통해 객체의 프로토타입이 될 객체를 선택할 수 있다.

```js
const healthObj = {
  showHealth : function() {
    console.log(this.name + "님, 오늘은 " + this.healthTime + "에 운동을 하셨네요");
  }
}

const ho = Object.create(healthObj, {
   name: { value: "홍길동" },
   healthTime: { value: "PM 10:12" }
})

ho.showHealth();
```

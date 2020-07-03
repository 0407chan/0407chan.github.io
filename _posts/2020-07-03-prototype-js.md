---
layout: post
title: "[JavaScript] 프로토타입"
date: 2020-07-01 14:36:00 +0900
categories: JavaScript
---

### prototype

- 메소드는 프로토타입에 넣으면 여러 객체들이 이 프로토타입에 있는 함수를 공유한다
- 메소드를 포함하는 클래스로 만들경우 새로운 객체를 만들때마다 메소드들이 계속 만들어지기 때문에 프로토 타입을 사용하는 것이 효율적이다.
- 근데 확실하지 않으니 한번 더 확인해보자

### js에서 객체지향으로 만드는 방법

- Object literal 방식

```js
const Woowa = {
  name: "2020",
  getName: function (o) {
    const data = o.getData();
    return this.name;
  },
};
Woowa.getName({ other: otherObj });
```

- 생성자패턴

```js
let Woowa = function (name) {
  this.name = name;
  this.getName = function () {
    return this.name;
  };
};

let woowa = new Woowa("이찬호");
woowa.getName();
```

- ES Classes

```js
class Woowa {
  constructor(name) {
    this.name = name;
  }
  getName() {
    return this.name;
  }
}

let woowa = new Woowa("이찬호");
console.log(woowa.getName());
```

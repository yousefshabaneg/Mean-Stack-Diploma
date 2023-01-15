"use strict";
class X {
    static show() {
        console.log("Hi");
    }
}
X.a = 5;
console.log(X.a);
X.show();
class A {
    constructor(num) {
        this.num = num;
    }
}
class B extends A {
    constructor(num) {
        super(num);
    }
    test() {
        console.log("Implement Abstract MEthod.");
    }
}
const b = new B(10);
b.test();
console.log(b.num);

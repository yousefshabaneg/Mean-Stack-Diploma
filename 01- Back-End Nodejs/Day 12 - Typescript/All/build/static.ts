class X {
  static a = 5;

  static show() {
    console.log("Hi");
  }
}

console.log(X.a);
X.show();

abstract class A {
  constructor(public num: number) {}
  abstract test(): void;
}

class B extends A {
  constructor(num: number) {
    super(num);
  }
  test(): void {
    console.log("Implement Abstract MEthod.");
  }
}

const b = new B(10);
b.test();
console.log(b.num);

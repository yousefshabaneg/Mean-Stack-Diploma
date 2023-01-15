class Person {
  constructor(
    protected name: string,
    protected age: number,
    protected email: string
  ) {}
}

interface Subject {
  name: string;
  class: string;
}

class Teacher extends Person {
  constructor(
    name: string,
    age: number,
    email: string,
    public subjects: Subject[]
  ) {
    super(name, age, email);
  }
}

interface Grade {
  name: string;
  value: number;
}

class Student extends Person {
  constructor(
    name: string,
    age: number,
    email: string,
    public grades: Grade[]
  ) {
    super(name, age, email);
  }
}

"use strict";
class Person {
    constructor(name, age, email) {
        this.name = name;
        this.age = age;
        this.email = email;
    }
}
class Teacher extends Person {
    constructor(name, age, email, subjects) {
        super(name, age, email);
        this.subjects = subjects;
    }
}
class Student extends Person {
    constructor(name, age, email, grades) {
        super(name, age, email);
        this.grades = grades;
    }
}

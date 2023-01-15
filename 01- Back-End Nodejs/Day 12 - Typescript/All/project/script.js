"use strict";
class Employee {
    // name: string;
    // age: number;
    // constructor(name: string, age: number){
    //   this.name = name;
    //   this.age=age;
    // }
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    show() {
        console.log(this);
    }
}
const el = new Employee("joe", 24);
el.show();

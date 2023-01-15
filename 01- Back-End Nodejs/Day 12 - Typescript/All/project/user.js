"use strict";
class User {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        this.date = new Date();
    }
    show() {
        console.log(this.name);
    }
}
class Students extends User {
    constructor(name, age, email) {
        super(name, age);
        this.email = email;
    }
    show() {
        super.show();
        console.log(this.email);
        // console.log(this.date);
    }
}
const st1 = new Students("YOusef", 24, "Yousef@gmail.com");
st1.show();

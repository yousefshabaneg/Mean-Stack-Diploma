"use strict";
//name, age, salary, tasks = [], show, add Task, show emp task
Object.defineProperty(exports, "__esModule", { value: true });
class Employee {
    constructor(name, age, salary, tasks = [], status = false) {
        this.name = name;
        this.age = age;
        this.salary = salary;
        this.tasks = tasks;
        this.status = status;
    }
    get _name() {
        return this.name.toLowerCase();
    }
    set _name(value) {
        this.name = value;
    }
    showData() {
        const data = `name: ${this.name}, age: ${this.age}, salary: ${this.salary}, salary: ${this.salary}, salary: ${this.salary}`;
        return data;
    }
    addTask(task) {
        let result;
        try {
            this.tasks.push(task);
            result = "task added successfully";
        }
        catch (e) {
            result = "error adding task";
        }
        return result;
    }
    showTasks() {
        this.tasks.forEach((task) => {
            console.log(task);
        });
    }
}
const emp1 = new Employee("Yousef", 37, 1000);
console.log(emp1.showData());
// const task = "create function";
// console.log(emp1.addTask(task));
const t1 = {
    title: "learn javascript",
    content: "odc-training",
    date: new Date(),
};
emp1.addTask(t1);
emp1.showTasks();
emp1._name = "Yousef Shaban";
console.log(emp1._name);

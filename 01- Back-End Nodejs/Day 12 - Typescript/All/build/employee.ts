//name, age, salary, tasks = [], show, add Task, show emp task

import { Task } from "./task";

class Employee {
  constructor(
    private name: string,
    private age: number,
    private salary: number,
    private tasks: Task[] = [],
    private status: boolean = false
  ) {}

  get _name(): string {
    return this.name.toLowerCase();
  }
  set _name(value: string) {
    this.name = value;
  }

  showData(): string {
    const data: string = `name: ${this.name}, age: ${this.age}, salary: ${this.salary}, salary: ${this.salary}, salary: ${this.salary}`;
    return data;
  }

  addTask(task: Task): string {
    let result: string;
    try {
      this.tasks.push(task);
      result = "task added successfully";
    } catch (e) {
      result = "error adding task";
    }
    return result;
  }

  showTasks(): void {
    this.tasks.forEach((task) => {
      console.log(task);
    });
  }
}

const emp1 = new Employee("Yousef", 37, 1000);
console.log(emp1.showData());

// const task = "create function";
// console.log(emp1.addTask(task));

const t1: Task = {
  title: "learn javascript",
  content: "odc-training",
  date: new Date(),
};
emp1.addTask(t1);

emp1.showTasks();

emp1._name = "Yousef Shaban";
console.log(emp1._name);

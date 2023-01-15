class User {
  private date: Date = new Date();
  constructor(protected name: string, protected age: number) {}
  show() {
    console.log(this.name);
  }
}

class Students extends User {
  constructor(name: string, age: number, private email: string) {
    super(name, age);
  }

  show(): void {
    super.show();
    console.log(this.email);
    // console.log(this.date);
  }
}

const st1 = new Students("YOusef", 24, "Yousef@gmail.com");

st1.show();

import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  imgPath = 'assets/images/img.jpg';
  inputType = 'password';

  text = 'Hello Angular';
  tag = '<u>Angular</u>';
  buttonClass = 'primary';

  h1Text = 'Lorem Text';

  getFullName = () => 'Yousef SHaban';

  handleClick() {
    this.buttonClass = this.buttonClass === 'primary' ? 'info' : 'primary';
    this.h1Text = this.buttonClass.toUpperCase();
  }

  handleInput(event: any) {
    console.log(event.target.value);
  }
  handleChange(value: any) {}
}

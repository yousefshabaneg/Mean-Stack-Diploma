import { Component } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent {
  inputVal: string = '';
  handleInput(val: string) {
    this.inputVal = val;
  }
}

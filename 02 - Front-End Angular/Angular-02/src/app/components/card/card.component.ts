import { Component } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  borderClass = 'border border-info';
  bgClass = 'bg-dark text-light';
  showFlag: boolean = false;
  num = 1;
  colorStyle = 'red';
  arr = [1, 2, 3, 4, 5];
}

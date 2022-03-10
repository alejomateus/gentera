import { Component, Input, OnInit } from '@angular/core';
import { IDish } from '../../models/dishes';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent implements OnInit {
  @Input() dishInfo: IDish;
  constructor() { }

  ngOnInit(): void {
  }

}

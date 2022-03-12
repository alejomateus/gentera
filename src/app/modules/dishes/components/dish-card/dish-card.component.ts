import { Component, Input, OnInit } from '@angular/core';
import { IDish, IDishSimple } from '../../models/dishes';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss']
})
export class DishCardComponent implements OnInit {
  @Input() dishInfo: IDishSimple;
  constructor() { }

  ngOnInit(): void {
  }

}

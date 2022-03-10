import { Component, Input, OnInit } from '@angular/core';
import { IIngredient } from '../../models/ingredients';

@Component({
  selector: 'app-ingredient-card',
  templateUrl: './ingredient-card.component.html',
  styleUrls: ['./ingredient-card.component.scss']
})
export class IngredientCardComponent implements OnInit {
  @Input() ingredientInfo: IIngredient;
  constructor() { }

  ngOnInit(): void {
  }

}

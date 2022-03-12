import { Component, OnInit } from '@angular/core';
import { DishesService } from '@app/services/dishes.service';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { IDish } from '../dishes/models/dishes';
import { CommonsService } from '../shared/services/commons.service';
import { DishModalComponent } from './components/dish-modal/dish-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  modalRef: MDBModalRef;
  dish: IDish;

  constructor(
    private modalService: MDBModalService,
    private dishesService: DishesService,
    private commonsService: CommonsService
  ) {}

  async ngOnInit(): Promise<any> {
    this.loadRandomDishInformation();
  }

  openModal(dish: IDish) {
    this.modalRef = this.modalService.show(DishModalComponent, {data: {dish}});
    this.modalRef.content.action.subscribe( async (result: string) => {
      if (result === "yes") {
        await this.commonsService.navigateWithPathParams('/dish' , this.dish.idMeal);
      }
     });

  }
  async loadRandomDishInformation(): Promise<any> {
    this.dish = (await this.dishesService.getRandomDish().toPromise()).meals[0];
    this.openModal(this.dish);
  }
  getSecureUrl(url: string) {
    return this.commonsService.getEmbedUrl(url.replace('watch?v=', 'embed/'));
  }
}

import { Component, OnInit } from '@angular/core';
import { IDish } from '@dishes/models/dishes';
import { MDBModalRef } from 'angular-bootstrap-md';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.scss'],
})
export class DishModalComponent implements OnInit {
  dish: IDish;
  action: Subject<any> = new Subject();

  constructor(
    public modalRef: MDBModalRef,
  ) {}

  ngOnInit(): void {}
  show(): void {
    this.action.next('yes');
    this.modalRef.hide();
  }
}

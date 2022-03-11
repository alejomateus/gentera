import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MDBModalRef, MDBModalService } from 'angular-bootstrap-md';
import { DishModalComponent } from './components/dish-modal/dish-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  videoSource = 'https://www.youtube.com/embed/A3PDXmYoF5U';
  modalRef: MDBModalRef;

  constructor(private sanitizer: DomSanitizer,
    private modalService: MDBModalService) {
  }
  getEmbedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoSource);
  }
  ngOnInit(): void {}
  openModal() {
    this.modalRef = this.modalService.show(DishModalComponent)
  }

}

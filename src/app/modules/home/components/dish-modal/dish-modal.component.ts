import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-dish-modal',
  templateUrl: './dish-modal.component.html',
  styleUrls: ['./dish-modal.component.scss'],
})
export class DishModalComponent implements OnInit {
  videoSource = 'https://www.youtube.com/embed/A3PDXmYoF5U';

  constructor(public modalRef: MDBModalRef, private sanitizer: DomSanitizer) {}
  getEmbedUrl() {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.videoSource);
  }

  ngOnInit(): void {}
}

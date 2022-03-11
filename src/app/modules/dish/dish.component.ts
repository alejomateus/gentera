import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DishesService } from '@app/services/dishes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDish, IKeysDish } from '../dishes/models/dishes';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
})
export class DishComponent implements OnInit {
  id: number;
  dish: IDish;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private route: ActivatedRoute,
    private dishesService: DishesService, private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (params) => {
        this.id = +params['id'];

        await this.loadDishInformation(this.id);
      });
  }
  async loadDishInformation(id: number): Promise<any> {
    this.dish = (await this.dishesService.getDishbyId(id).toPromise()).meals[0];
  }
  getEmbedUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { DishesService } from '@app/services/dishes.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { IDish } from '../dishes/models/dishes';
import { CommonsService } from '../shared/services/commons.service';

@Component({
  selector: 'app-dish',
  templateUrl: './dish.component.html',
  styleUrls: ['./dish.component.scss'],
})
export class DishComponent implements OnInit, OnDestroy {
  id: number;
  dish: IDish;
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(
    private route: ActivatedRoute,
    private dishesService: DishesService,
    private commonsService: CommonsService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(async (params) => {
        this.id = +params['id'];
        await this.loadDishInformation(this.id);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  async loadDishInformation(id: number): Promise<any> {
    this.dish = (await this.dishesService.getDishbyId(id).toPromise()).meals[0];
  }
  getSecureUrl(url: string): SafeResourceUrl {
    return this.commonsService.getEmbedUrl(url.replace('watch?v=', 'embed/'));
  }
}

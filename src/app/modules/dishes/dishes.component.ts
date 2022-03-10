import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Languages } from '@app/store/actions/app.actions';
import { AppFacade } from '@app/store/facades/app.facade';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CommonsService } from '../shared/services/commons.service';
import { IDish, IDishes } from './models/dishes';
import { DishesFacade } from './store/facade/dishes.facade';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss'],
})
export class DishesComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  dishes: IDish[] | null;
  constructor(
    public translate: TranslateService,
    private appFacade: AppFacade,
    private dishesFacade: DishesFacade,
    private route: ActivatedRoute,
    private commonsService:CommonsService
  ) {
    this.selectLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Languages) => {
        if (value) {
          this.translate.use(value);
        }
      });
  }

  async ngOnInit(): Promise<any> {
    this.route.queryParams.subscribe(async (params) => {
      if (params) {

      } else {
      }
      await this.getInitialState();
    });
  }

  async getInitialState(): Promise<any> {
    // const promiseDishes = await this.selectDishes$.pipe(take(1)).toPromise();
    // if (promiseDishes.data === null) {
      this.dishesFacade.getDishes();
      this.selectDishes2$
        .pipe(takeUntil(this.destroy$))
        .subscribe((action: IDishes) => {
          if (action && action.data !== null) {
            this.loadDishes(action);
          }
        });
    // }
    // if (promiseDishes.data !== null) {
    //   this.loadDishes(promiseDishes);
    // }
  }
  loadDishes(action: IDishes): void {
    this.dishes = action.data;
  }
  async detailDish(id: string): Promise<any> {
    await this.commonsService.navigateWithParams('/dish', { id });
  }
  get selectLanguage$(): Observable<Languages> {
    return this.appFacade.selectLanguage$;
  }
  get selectDishes$(): Observable<IDishes> {
    return this.dishesFacade.selectDishes$;
  }
  get selectDishes2$(): Observable<IDishes> {
    return this.dishesFacade.selectDishes$;
  }
}

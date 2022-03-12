import { Component, OnDestroy, OnInit } from '@angular/core';
import { Languages } from '@app/store/actions/app.actions';
import { AppFacade } from '@app/store/facades/app.facade';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { CommonsService } from '../shared/services/commons.service';
import { IIngredient, IIngredients } from './models/ingredients';
import { IngredientsFacade } from './store/facade/ingredients.facade';

@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss'],
})
export class IngredientsComponent implements OnInit, OnDestroy {
  destroy$: Subject<boolean> = new Subject<boolean>();
  ingredients: IIngredient[] | null;
  constructor(
    public translate: TranslateService,
    private appFacade: AppFacade,
    private ingredientsFacade: IngredientsFacade,
    private commonsService: CommonsService
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
    await this.getInitialState();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  async getInitialState(): Promise<any> {
    const promiseIngredients = await this.selectIngredients$
      .pipe(take(1))
      .toPromise();
    if (promiseIngredients.data === null) {
      this.ingredientsFacade.getIngredients();
      this.selectIngredients2$
        .pipe(takeUntil(this.destroy$))
        .subscribe((action: IIngredients) => {
          if (action && action.data !== null) {
            this.loadIngredients(action);
          }
        });
    }
    if (promiseIngredients.data !== null) {
      this.loadIngredients(promiseIngredients);
    }
  }
  loadIngredients(action: IIngredients): void {
    this.ingredients = action.data;
  }
  async searchDishes(ingredient: string): Promise<any> {
    await this.commonsService.navigateWithParams('/dishes', { ingredient });
  }
  get selectLanguage$(): Observable<Languages> {
    return this.appFacade.selectLanguage$;
  }
  get selectIngredients$(): Observable<IIngredients> {
    return this.ingredientsFacade.selectIngredients$;
  }
  get selectIngredients2$(): Observable<IIngredients> {
    return this.ingredientsFacade.selectIngredients$;
  }
}

import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { LanguagesSelect } from '@app/models/languages';
import { Menu } from '@app/models/menu';
import { TranslateService } from '@ngx-translate/core';
import { CommonsService } from '@shared/services/commons.service';
import { Languages } from '@store/actions/app.actions';
import { AppFacade } from '@store/facades/app.facade';
import { Observable, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  language: Languages;
  languages: LanguagesSelect[] = [
    { label: 'Español', value: 'es' },
    { label: 'English', value: 'en' },
  ];
  options: Menu[];
  principalOptions: Menu[];
  activeSession: boolean = false;
  constructor(
    public translate: TranslateService,
    private appFacade: AppFacade,
    private commonsService: CommonsService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<any> {
    this.selectLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Languages) => {
        this.language = value ? value : 'es';
        if (value) {
          this.translate.use(value);
        }
      });
    this.loadOptions();
    this.registerRouteChanges();
  }
  changeLanguage(): void {
    this.appFacade.changeLanguaje(this.language);
  }
  loadOptions() {
    this.options = [
      { label: 'options.lateral.labels.my_account', redirect_url: 'profile' },
      { label: 'options.lateral.labels.sign_out', redirect_url: 'sign-out' },
    ];
    this.principalOptions = [
      { label: 'options.principal.labels.home', redirect_url: 'home' },
      { label: 'options.principal.labels.dishes', redirect_url: 'dishes' },
      { label: 'options.principal.labels.ingredients', redirect_url: 'ingredients' },
    ];
  }
  async navigate(url: string): Promise<any> {
    if (url === 'sign-out') {
      await this.commonsService.logOut();
    } else {
      await this.commonsService.navigate(url);
    }
  }
  async verifySession(): Promise<any> {
    this.activeSession = !(await this.commonsService.verifyToken());
  }
  get selectLanguage$(): Observable<Languages> {
    return this.appFacade.selectLanguage$;
  }
  registerRouteChanges(): void {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(async () => {
        await this.verifySession();
      });
  }
}

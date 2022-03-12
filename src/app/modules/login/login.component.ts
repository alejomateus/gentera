import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Languages } from '@store/actions/app.actions';
import { AppFacade } from '@store/facades/app.facade';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { LoginValidationMessages } from './models/login';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '@shared/services/authentication.service';
import { CommonsService } from '@shared/services/commons.service';
import { StorageService } from '@shared/services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginValidationMessages: LoginValidationMessages;
  loginForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  errorLogin: boolean = false;
  loading: boolean = false;
  rememberOption: boolean = false;

  constructor(
    public translate: TranslateService,
    private appFacade: AppFacade,
    private commonsService: CommonsService,
    private authenticationService: AuthenticationService,
    private storageService: StorageService
  ) {
    this.selectLanguage$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: Languages) => {
        if (value) {
          this.translate.use(value);
        }
      });
  }

  async ngOnInit(): Promise<any>  {
   await  this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  async initForm(): Promise<any> {
    this.loginValidationMessages = {
      email: [
        { type: 'required', message: 'form_errors.email.required' },
        { type: 'pattern', message: 'form_errors.email.pattern' },
      ],
      password: [
        { type: 'required', message: 'form_errors.password.required' },
        { type: 'pattern', message: 'form_errors.password.pattern' },
      ],
    };

    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^([a-zA-Z0-9-+_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$'
        ),
      ]),
      password: new FormControl('', [Validators.required]),
    });
    const remember_data = JSON.parse(await this.storageService.getItem('remember_data'));
    if (remember_data) {
      this.loginForm.controls.email.setValue(remember_data.email);
      this.loginForm.controls.password.setValue(remember_data.password);
    }
  }
  async login(): Promise<any> {
    this.errorLogin = false;
    this.loading = true;
    const { email, password } = this.loginForm.value;
    try {
      await this.authenticationService.signIn(
        email,
        password,
        this.rememberOption
      );
      this.commonsService.redirectToHome();
    } catch (error) {
      this.errorLogin = true;
    } finally {
      this.loading = false;
    }
  }

  navigateTo(route: string): void {
    this.commonsService.navigate(route);
  }
  get selectLanguage$(): Observable<Languages> {
    return this.appFacade.selectLanguage$;
  }
}

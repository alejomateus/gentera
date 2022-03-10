import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { Languages } from '@store/actions/app.actions';
import { AppFacade } from '@store/facades/app.facade';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { SignUpValidationMessages } from './models/sign-up';
import { takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '@shared/services/authentication.service';
import { CommonsService } from '@shared/services/commons.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  signUpValidationMessages: SignUpValidationMessages;
  signUpForm: FormGroup;
  destroy$: Subject<boolean> = new Subject<boolean>();
  errorSignup: boolean = false;
  loading: boolean = false;
  rememberOption: boolean = false;

  constructor(
    public translate: TranslateService,
    private appFacade: AppFacade,
    private commonsService: CommonsService,
    private authenticationService: AuthenticationService
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
    this.signUpValidationMessages = {
      email: [
        { type: 'required', message: 'form_errors.email.required' },
        { type: 'pattern', message: 'form_errors.email.pattern' },
      ],
      password: [
        { type: 'required', message: 'form_errors.password.required' },
        { type: 'pattern', message: 'form_errors.password.pattern' },
      ],
      names: [
        { type: 'required', message: 'form_errors.names.required' },
      ],
      last_names: [
        { type: 'required', message: 'form_errors.last_names.required' },
      ],
    };

    this.signUpForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern(
          '^([a-zA-Z0-9-+_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\\.([a-zA-Z]{2,5})$'
        ),
      ]),
      password: new FormControl('', [Validators.required]),
      names: new FormControl('', [Validators.required]),
      last_names: new FormControl('', [Validators.required]),
    });
  }
  async signUp(): Promise<any> {
    this.errorSignup = false;
    this.loading = true;
    const dataSignUp = this.signUpForm.value;
    try {
      await this.authenticationService.signUp(
        dataSignUp
      );
      this.commonsService.redirectToHome();
    } catch (error) {
      this.errorSignup = true;
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

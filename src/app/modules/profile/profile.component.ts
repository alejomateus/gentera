import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Languages } from '@app/store/actions/app.actions';
import { AppFacade } from '@app/store/facades/app.facade';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CommonsService } from '@shared/services/commons.service';
import { AuthenticationService } from '@shared/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  destroy$: Subject<boolean> = new Subject<boolean>();
  profileForm: FormGroup;

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

  async ngOnInit(): Promise<any> {
    await this.initForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  async initForm(): Promise<any> {
    this.profileForm = new FormGroup({
      email: new FormControl(
        { value: '', disabled: true },
        []
      ),
      names: new FormControl(
        { value: '', disabled: true },
        []
      ),
      last_names: new FormControl(
        { value: '', disabled: true },
        []
      ),
    });
    const userData =
      (await this.authenticationService.getCurrentAuthenticatedUser()).data.user;
    this.profileForm.controls.email.setValue(userData.email);
    this.profileForm.controls.names.setValue(userData.names);
    this.profileForm.controls.last_names.setValue(userData.last_names);
  }

  returntoHome(): void {
    this.commonsService.redirectToHome();
  }
  get selectLanguage$(): Observable<Languages> {
    return this.appFacade.selectLanguage$;
  }
}

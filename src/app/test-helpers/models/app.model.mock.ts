
import { Injectable } from "@angular/core";
import { Languages } from "@store/actions/app.actions";
import { BehaviorSubject } from "rxjs";

@Injectable()
export class AppModelMock {
  public static selectLanguageNull$: BehaviorSubject<
    any
  > = new BehaviorSubject(null);
  public static selectLanguage$: BehaviorSubject<
    any
  > = new BehaviorSubject("en");
  public static selectIdentificationTypeNull$: BehaviorSubject<
    any
  > = new BehaviorSubject(null);
  public changeLanguaje(Language: Languages): void {}

}

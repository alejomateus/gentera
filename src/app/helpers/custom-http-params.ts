import { HttpParams } from "@angular/common/http";
/**
 * CustomHttpParams Class
 */
export class CustomHttpParams extends HttpParams {
  /**
   * Constructor
   * @param type type
   */
  constructor(public type: string) {
    super();
  }
}

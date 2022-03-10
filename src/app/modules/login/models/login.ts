import { IFormValidationMessages } from "@app/models/form-validation-messages";

export interface LoginValidationMessages {
  email: IFormValidationMessages[];
  password: IFormValidationMessages[];
}

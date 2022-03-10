import { IFormValidationMessages } from "@app/models/form-validation-messages";

export interface SignUpValidationMessages {
  names: IFormValidationMessages[];
  last_names: IFormValidationMessages[];
  email: IFormValidationMessages[];
  password: IFormValidationMessages[];
}

export interface SignUp {
  names: string;
  last_names: string;
  email: string;
  password: string;
}

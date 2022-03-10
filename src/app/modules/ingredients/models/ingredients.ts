export interface IIngredient {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
  strType: string | null;
}

export interface IIngredients {
  data: IIngredient[] | null;
  error: any;
  loaded: boolean | null;
  loading: boolean | null;
}

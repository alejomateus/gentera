import { ILanguage } from "../reducers/app.reducer";
import { selectLanguage } from "./app.selector";
describe("AppSelector", () => {
  const language = "es";
  const initialLanguaje: ILanguage = {
    language,
  };

  it("should return the selectLanguage", () => {
    expect(selectLanguage.projector(initialLanguaje)).toEqual(language);
  });
});

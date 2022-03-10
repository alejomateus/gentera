import { changeLanguaje, TypeActionsApp } from "./app.actions";

describe("App Actions", () => {
  it("should change language", () => {
    const sharedDataLoad = "es";
    expect(changeLanguaje(sharedDataLoad)).toEqual({
      type: TypeActionsApp.languageChange,
      language: sharedDataLoad,
    });
  });
});

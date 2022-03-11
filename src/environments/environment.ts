// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlAuth: "http://localhost:4004/",
  url: "/api/json/v1/1",
  ordersKey: "0rd3rsK3y2022*?",
  endpoints: {
    login: "login",
    signup: "sign-up",
    ingredients: "/list.php?i=list",
    dishes: "/search.php?s=",
    dish: "/lookup.php?i="
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

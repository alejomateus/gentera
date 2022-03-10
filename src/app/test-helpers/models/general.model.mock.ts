export const routerSpy = { navigate: jasmine.createSpy("navigate") };

export const activatedRouteMock = {
  snapshot: {
    paramMap: {
      get(id: string) {
        return "1213123";
      },
    },
  },
};
export const activatedRouteMock2 = {
  snapshot: {
    paramMap: {
      get(id: string) {
        return null;
      },
    },
  },
};

export const initialState = {
  language: {
    language: "es",
  }
};
export const spySingup = {
  next: () => {
    return;
  },
  navigatetoError: () => {
    return;
  },
  clearStore: () => {
    return;
  },
  navigatetoLogin: () => {
    return;
  },
  previous: () => {
    return;
  },
  clearSignInStore: () => {
    return;
  },
  clearCompleteSignUpStore: () => {
    return;
  },
  clearAccountStore: () => {
    return;
  },
};

export const spyHelperService = {
  // isTokenExpired: (token: string) => {
  //   return token !== "1" ? true : false;
  // },
  decodeToken() {
    return {
      sub: "d298c4f1-a30d-4f9e-93a3-d038e69959a4",
      iss: "https://cognito-idp.us-east-2.amazonaws.com/us-east-2_K1WRObBlx",
      session_id: "4c7bf394-1aab-4a5f-8143-3e23c173f716",
      aud: "3mfdvgphdv4b734ahe6es7c0lr",
      event_id: "78e5060a-1536-4d42-a2b8-af501f257dca",
      token_use: "id",
      segment: "pj",
      auth_time: 1626105978,
      name: "Alejandrp Jimenez",
      nickname: "34444444444-11023013041",
      exp: 1626106578,
      actions:
        "CUEASI,CLINOT,REPCON,USUCRE,CUECRE,DOCSUB,CUEMOD,REPGEN,REPESP,VEHRES,CUESALDO,CUESEL,CUEDEF,MOVCON,MOVDES,VEHCON,CUEPRI,CUEDEV,CUESALB,MNUDSH,MNUMOV,MNUASI,REPMOV,REPPLA,REPPEA,VEHCRE,VEHACT,VEHINA,TAGCAM,TAGCOM,TAGAUT,VEHELI,VEHDES,MNUVEH",
      iat: 1626105978,
      email: "alejandro.jimenez+001@avaldigitallabs.com",
      person_id: "34444444444",
    };
  },
};

export const spyCommons = {
  logOut: () => {
    return;
  },
  redirectToHome: () => {
    return;
  },
  navigate: () => {
    return;
  },
};

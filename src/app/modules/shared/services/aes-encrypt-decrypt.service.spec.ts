import { TestBed } from "@angular/core/testing";
import { AESEncryptDecryptService } from "./aes-encrypt-decrypt.service";

describe("AesEncryptDecryptService", () => {
  let service: AESEncryptDecryptService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [],
    });
    service = TestBed.inject(AESEncryptDecryptService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should be encrypt", () => {
    service.encrypt("123");
    expect(service).toBeTruthy();
  });
  it("should be decrypt", () => {
    const data = service.decrypt(
      "U2FsdGVkX1/mRSVGrtLfxIBiD06tkJiAfXFmkBXiUFY=",
    );
    expect(data).toEqual("123");
    expect(service).toBeTruthy();
  });
});

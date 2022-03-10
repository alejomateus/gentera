/**
 * Service to encrypt and decrypt with cryptojs
 */
import { Injectable } from "@angular/core";
import { environment } from "@environment";
import * as CryptoJS from "crypto-js";
/**
 * Injectable
 */
@Injectable({
  providedIn: "root",
})
/**
 * CryptoJs implementation
 */
export class AESEncryptDecryptService {
  secretKey = environment.ordersKey;
  constructor() {}
  /**
   * Encrypt Method using AES
   * @param value Value to encrypt
   */
  encrypt(value: string): string {
    return CryptoJS.AES.encrypt(value, this.secretKey.trim()).toString();
  }
  /**
   * Decrypt Method using AES
   * @param textToDecrypt Value to descrypt
   */
  decrypt(textToDecrypt: string): string {
    return CryptoJS.AES.decrypt(textToDecrypt, this.secretKey.trim()).toString(
      CryptoJS.enc.Utf8,
    );
  }
}

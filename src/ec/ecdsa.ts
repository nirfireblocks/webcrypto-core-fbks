import { ProviderKeyUsages } from "../types";
import { EllipticProvider } from "./base";

export abstract class EcdsaProvider extends EllipticProvider {

  public readonly name: string = "ECDSA";

  public readonly hashAlgorithms = ["SHA-1", "SHA-256", "SHA-384", "SHA-512", "NO-HASH"];

  public usages: ProviderKeyUsages = {
    privateKey: ["sign"],
    publicKey: ["verify"],
  };

  public namedCurves = ["P-256", "P-384", "P-521", "K-256"];

  public checkAlgorithmParams(algorithm: EcdsaParams): void {
    this.checkRequiredProperty(algorithm, "hash");
    this.checkHashAlgorithm(algorithm.hash as Algorithm, this.hashAlgorithms);
  }

  public abstract onSign(algorithm: EcdsaParams, key: CryptoKey, data: ArrayBuffer, ...args: any[]): Promise<ArrayBuffer>;
  public abstract onVerify(algorithm: EcdsaParams, key: CryptoKey, signature: ArrayBuffer, data: ArrayBuffer, ...args: any[]): Promise<boolean>;

}

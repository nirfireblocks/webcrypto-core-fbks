import { OperationError } from "../errors";
import { CryptoKey } from "../key";
import { ProviderKeyUsages } from "../types";
import { EllipticProvider } from "./base";

export class EcdhProvider extends EllipticProvider {

  public readonly name = "ECDH";

  public usages: ProviderKeyUsages = {
    privateKey: ["deriveBits", "deriveKey"],
    publicKey: [],
  };

  public namedCurves = ["P-256", "P-384", "P-521"];

  public checkAlgorithmParams(algorithm: EcdhKeyDeriveParams) {
    this.checkRequiredProperty(algorithm, "public");
    if (!(algorithm.public instanceof CryptoKey)) {
      throw new TypeError("public: Is not a CryptoKey");
    }
    if (algorithm.public.type !== "public") {
      throw new OperationError("public: Is not a public key");
    }
    if (algorithm.public.algorithm.name !== this.name) {
      throw new OperationError(`public: Is not ${this.name} key`);
    }
  }

}

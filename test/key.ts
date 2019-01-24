import assert from "assert";
import { CryptoKey } from "../src/key";

context("CryptoKey", () => {

  context("isKeyType", () => {
    it("correct key type", () => {
      assert.equal(CryptoKey.isKeyType("secret"), true);
    });
    it("incorrect key type", () => {
      assert.equal(CryptoKey.isKeyType("Secret"), false);
    });
  });

});

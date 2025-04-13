# @chainless-js/biometric-ed25519

## 1.2.3

### Patch Changes

- Updated dependencies []:
  - @chainless-js/crypto@1.2.4
  - @chainless-js/utils@0.2.2

## 1.2.2

### Patch Changes

- Updated dependencies []:
  - @chainless-js/crypto@1.2.3
  - @chainless-js/utils@0.2.1

## 1.2.1

### Patch Changes

- [#1339](https://github.com/wulianapp/chainless-api-ts/pull/1339) [`86cf5057`](https://github.com/wulianapp/chainless-api-ts/commit/86cf5057516e9709273fe3cb23681bc4a6df1862) Thanks [@hcho112](https://github.com/hcho112)! - Bug fix on createKey and getKeys

## 1.2.0

### Minor Changes

- [#1331](https://github.com/wulianapp/chainless-api-ts/pull/1331) [`bc2e982b`](https://github.com/wulianapp/chainless-api-ts/commit/bc2e982b35a6777c33675a1502a40404c9dd9df2) Thanks [@hcho112](https://github.com/hcho112)! - Include sanitization on navigator.credentials response to support Bitwarden password manager

### Patch Changes

- [#1223](https://github.com/wulianapp/chainless-api-ts/pull/1223) [`9060b781`](https://github.com/wulianapp/chainless-api-ts/commit/9060b7811668d71bdf21170273a42842c3691f9b) Thanks [@gtsonevv](https://github.com/gtsonevv)! - Replace bn.js by BigInt.

- Updated dependencies [[`9060b781`](https://github.com/wulianapp/chainless-api-ts/commit/9060b7811668d71bdf21170273a42842c3691f9b)]:
  - @chainless-js/utils@0.2.0
  - @chainless-js/crypto@1.2.2

## 1.1.2

### Patch Changes

- [#1309](https://github.com/wulianapp/chainless-api-ts/pull/1309) [`4b5aae44`](https://github.com/wulianapp/chainless-api-ts/commit/4b5aae441fc3c10a5a3bf4d559ed2867c5e9abf1) Thanks [@gtsonevv](https://github.com/gtsonevv)! - Fix recoverPublicKey(), createKey() and getKeys() methods.

## 1.1.1

### Patch Changes

- Updated dependencies [[`662cc13d`](https://github.com/wulianapp/chainless-api-ts/commit/662cc13d7961c3bdabed3ad51b1c57958739a3e6), [`c4655576`](https://github.com/wulianapp/chainless-api-ts/commit/c4655576bacb1d8b85030dca5b9443649621c8ee)]:
  - @chainless-js/utils@0.1.0
  - @chainless-js/crypto@1.2.1

## 1.1.0

### Minor Changes

- [#1224](https://github.com/wulianapp/chainless-api-ts/pull/1224) [`1900c490`](https://github.com/wulianapp/chainless-api-ts/commit/1900c49060c3ea8279448cead7347049a23f421f) Thanks [@gtsonevv](https://github.com/gtsonevv)! - remove buggy dependencies - replace js-sha256 with noble-hashes - replace elliptic with noble-curves - remove error-polyfill package

### Patch Changes

- [#1259](https://github.com/wulianapp/chainless-api-ts/pull/1259) [`94cd0e65`](https://github.com/wulianapp/chainless-api-ts/commit/94cd0e6511750beba87b823a1b87bf89f51ad7eb) Thanks [@gtsonevv](https://github.com/gtsonevv)! - pass the correct parameter to getPublicKey() in getKeys()

- Updated dependencies [[`1900c490`](https://github.com/wulianapp/chainless-api-ts/commit/1900c49060c3ea8279448cead7347049a23f421f), [`c6cdc8c7`](https://github.com/wulianapp/chainless-api-ts/commit/c6cdc8c724a6dd53114cc5f53fd58e57cea86b78)]:
  - @chainless-js/crypto@1.2.0

## 1.0.1

### Patch Changes

- Updated dependencies [[`aeeb1502`](https://github.com/wulianapp/chainless-api-ts/commit/aeeb15022a1c1deb99114eba0473739b0998fc50)]:
  - @chainless-js/crypto@1.1.0

## 1.0.0

### Major Changes

- [#1168](https://github.com/wulianapp/chainless-api-ts/pull/1168) [`61349aec`](https://github.com/wulianapp/chainless-api-ts/commit/61349aeca3af830f702b24654e0f13cd428192d8) Thanks [@gagdiez](https://github.com/gagdiez)! - feat: updated borsh-js to v1.0.1

### Minor Changes

- [#1191](https://github.com/wulianapp/chainless-api-ts/pull/1191) [`6a67ce35`](https://github.com/wulianapp/chainless-api-ts/commit/6a67ce35a688c6cfa4105adf0e3b06fff19f0892) Thanks [@hcho112](https://github.com/hcho112)! - Handing null response on create key flow

### Patch Changes

- Updated dependencies [[`695220e7`](https://github.com/wulianapp/chainless-api-ts/commit/695220e75bc43834a7700cfc5491a7eebd324947), [`ecf29e2d`](https://github.com/wulianapp/chainless-api-ts/commit/ecf29e2d56611a7773c79d5bb5bd20c8b7e738ea), [`61349aec`](https://github.com/wulianapp/chainless-api-ts/commit/61349aeca3af830f702b24654e0f13cd428192d8), [`cdd8d1c8`](https://github.com/wulianapp/chainless-api-ts/commit/cdd8d1c8c37db641bd995b2c470ad0b4fdddb93f)]:
  - @chainless-js/utils@0.0.5
  - @chainless-js/crypto@1.0.0

## 0.3.0

### Minor Changes

- [#1148](https://github.com/wulianapp/chainless-api-ts/pull/1148) [`60b59044`](https://github.com/wulianapp/chainless-api-ts/commit/60b5904439fff25fab0cebed0b9b041938890964) Thanks [@hcho112](https://github.com/hcho112)! - bugfix and improvements on biometric-ed25519

## 0.2.0

### Minor Changes

- [#1139](https://github.com/wulianapp/chainless-api-ts/pull/1139) [`60c65dd1`](https://github.com/wulianapp/chainless-api-ts/commit/60c65dd1b8609551c270a5d53b9f70970aa1bcd8) Thanks [@hcho112](https://github.com/hcho112)! - Introducing a new util function, isPassKeyAvailable on biometric-ed25519 package

### Patch Changes

- Updated dependencies [[`40fa6465`](https://github.com/wulianapp/chainless-api-ts/commit/40fa64654fdaf3b463122c35521a6f72282974f2)]:
  - @chainless-js/crypto@0.0.5

## 0.1.0

### Minor Changes

- [#1135](https://github.com/wulianapp/chainless-api-ts/pull/1135) [`28be70e6`](https://github.com/wulianapp/chainless-api-ts/commit/28be70e6d69aa807bde82eaee2ea8b3bda3d3f95) Thanks [@andy-haynes](https://github.com/andy-haynes)! - Remove module-scoped globals and update build configuration

## 0.0.11

### Patch Changes

- [#1132](https://github.com/wulianapp/chainless-api-ts/pull/1132) [`f9b094ee`](https://github.com/wulianapp/chainless-api-ts/commit/f9b094ee37b2ecee046ee5d6a8a4866ed580d8de) Thanks [@andy-haynes](https://github.com/andy-haynes)! - Remove yarn.lock

## 0.0.10

### Patch Changes

- [#1129](https://github.com/wulianapp/chainless-api-ts/pull/1129) [`aeeda99c`](https://github.com/wulianapp/chainless-api-ts/commit/aeeda99c435f95d1bd26046a3f480e84a8945c88) Thanks [@MaximusHaximus](https://github.com/MaximusHaximus)! - Remove account length limit

## 0.0.9

### Patch Changes

- [#1125](https://github.com/wulianapp/chainless-api-ts/pull/1125) [`5808d3a7`](https://github.com/wulianapp/chainless-api-ts/commit/5808d3a7cad6ebfe19e2e249eebca8387b9d7495) Thanks [@esaminu](https://github.com/esaminu)! - This PR fixes a bug with the getKeys method in the biometric-ed25519 package. This method is currently broken due to not awaiting an async function and trying to access undefined properties on the promise.

## 0.0.8

### Patch Changes

- Updated dependencies []:
  - @chainless-js/crypto@0.0.4

## 0.0.7

### Patch Changes

- Updated dependencies []:
  - @chainless-js/crypto@0.0.3

## 0.0.6

### Patch Changes

- [#1091](https://github.com/wulianapp/chainless-api-ts/pull/1091) [`ca458cac`](https://github.com/wulianapp/chainless-api-ts/commit/ca458cac683fab614b77eb5daa160e03b0640350) Thanks [@andy-haynes](https://github.com/andy-haynes)! - Only include contents of lib/ in NPM packages

- Updated dependencies [[`ca458cac`](https://github.com/wulianapp/chainless-api-ts/commit/ca458cac683fab614b77eb5daa160e03b0640350)]:
  - @chainless-js/crypto@0.0.2

## 0.0.5

### Patch Changes

- [#1087](https://github.com/wulianapp/chainless-api-ts/pull/1087) [`4f9e3d4d`](https://github.com/wulianapp/chainless-api-ts/commit/4f9e3d4d978adc4a073e0ae2cdba69c3e1600201) Thanks [@andy-haynes](https://github.com/andy-haynes)! - Use new packages in @chainless-js/biometric-ed25519

## 0.0.4

### Patch Changes

- Updated dependencies [[`8ee564c0`](https://github.com/wulianapp/chainless-api-ts/commit/8ee564c0f4786e3c9281892c73761bd6a9205074), [`8feb1997`](https://github.com/wulianapp/chainless-api-ts/commit/8feb199733a770b25b63b0bbc7d79fc8b0b1683c), [`c740afc8`](https://github.com/wulianapp/chainless-api-ts/commit/c740afc897208d26165c4f8b2aae6db70694e70b), [`b823ada7`](https://github.com/wulianapp/chainless-api-ts/commit/b823ada740e64a45d4b9671fab791968b51de61a), [`726b7953`](https://github.com/wulianapp/chainless-api-ts/commit/726b795312230357aa2bb8a8db8a217a0f18a663), [`0c85da12`](https://github.com/wulianapp/chainless-api-ts/commit/0c85da123473017683b2a53f83652938488dd086)]:
  - chainless-api-ts@2.0.0

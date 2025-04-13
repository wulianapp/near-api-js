# @chainless-js/providers

## 0.2.2

### Patch Changes

- [#1349](https://github.com/wulianapp/chainless-api-ts/pull/1349) [`ecdf1741`](https://github.com/wulianapp/chainless-api-ts/commit/ecdf1741fb692e71202c541c5b3692790baa65f0) Thanks [@gtsonevv](https://github.com/gtsonevv)! - Fix TxExecutionStatus import.

- [#1347](https://github.com/wulianapp/chainless-api-ts/pull/1347) [`92a6f5be`](https://github.com/wulianapp/chainless-api-ts/commit/92a6f5be3f4b7be6f3e9b55077025921c3aad2cb) Thanks [@gtsonevv](https://github.com/gtsonevv)! - Update tx execution status default value.

- Updated dependencies [[`ecdf1741`](https://github.com/wulianapp/chainless-api-ts/commit/ecdf1741fb692e71202c541c5b3692790baa65f0), [`92a6f5be`](https://github.com/wulianapp/chainless-api-ts/commit/92a6f5be3f4b7be6f3e9b55077025921c3aad2cb)]:
  - @chainless-js/types@0.2.1
  - @chainless-js/transactions@1.2.2
  - @chainless-js/utils@0.2.2

## 0.2.1

### Patch Changes

- Updated dependencies [[`06baa81d`](https://github.com/wulianapp/chainless-api-ts/commit/06baa81dc604cfe0463476de7a4dcdd39a6f716a)]:
  - @chainless-js/types@0.2.0
  - @chainless-js/transactions@1.2.1
  - @chainless-js/utils@0.2.1

## 0.2.0

### Minor Changes

- [#1334](https://github.com/wulianapp/chainless-api-ts/pull/1334) [`3f363113`](https://github.com/wulianapp/chainless-api-ts/commit/3f363113e102d0acf29b7b2635acf6160a028cc3) Thanks [@denbite](https://github.com/denbite)! - Introduce FailoverRpcProvider that switches between providers in case of a failure of one of them

### Patch Changes

- [#1223](https://github.com/wulianapp/chainless-api-ts/pull/1223) [`9060b781`](https://github.com/wulianapp/chainless-api-ts/commit/9060b7811668d71bdf21170273a42842c3691f9b) Thanks [@gtsonevv](https://github.com/gtsonevv)! - Replace bn.js by BigInt.

- Updated dependencies [[`9060b781`](https://github.com/wulianapp/chainless-api-ts/commit/9060b7811668d71bdf21170273a42842c3691f9b)]:
  - @chainless-js/transactions@1.2.0
  - @chainless-js/types@0.1.0
  - @chainless-js/utils@0.2.0

## 0.1.1

### Patch Changes

- Updated dependencies [[`42dc7e2a`](https://github.com/wulianapp/chainless-api-ts/commit/42dc7e2ac794e973987bed7b89da5ef2d3c6c8ac)]:
  - @chainless-js/transactions@1.1.2

## 0.1.0

### Minor Changes

- [#1275](https://github.com/wulianapp/chainless-api-ts/pull/1275) [`662cc13d`](https://github.com/wulianapp/chainless-api-ts/commit/662cc13d7961c3bdabed3ad51b1c57958739a3e6) Thanks [@denbite](https://github.com/denbite)! - Display user-friendly messages for JSON RPC errors:

  - MethodNotFound
  - CodeDoesNotExist
  - AccessKeyDoesNotExist
  - AccountDoesNotExist

### Patch Changes

- Updated dependencies [[`662cc13d`](https://github.com/wulianapp/chainless-api-ts/commit/662cc13d7961c3bdabed3ad51b1c57958739a3e6)]:
  - @chainless-js/utils@0.1.0
  - @chainless-js/transactions@1.1.1

## 0.0.10

### Patch Changes

- Updated dependencies [[`1900c490`](https://github.com/wulianapp/chainless-api-ts/commit/1900c49060c3ea8279448cead7347049a23f421f)]:
  - @chainless-js/transactions@1.1.0

## 0.0.9

### Patch Changes

- Updated dependencies []:
  - @chainless-js/transactions@1.0.1

## 0.0.8

### Patch Changes

- [#1195](https://github.com/wulianapp/chainless-api-ts/pull/1195) [`695220e7`](https://github.com/wulianapp/chainless-api-ts/commit/695220e75bc43834a7700cfc5491a7eebd324947) Thanks [@ShaunSHamilton](https://github.com/ShaunSHamilton)! - add check for global 'process' object

- [#1205](https://github.com/wulianapp/chainless-api-ts/pull/1205) [`0be6c420`](https://github.com/wulianapp/chainless-api-ts/commit/0be6c4209f56c0595bf66e217b7ac01444981b99) Thanks [@denbite](https://github.com/denbite)! - retry RPC request on 408 HTTP error

- [#1215](https://github.com/wulianapp/chainless-api-ts/pull/1215) [`ecf29e2d`](https://github.com/wulianapp/chainless-api-ts/commit/ecf29e2d56611a7773c79d5bb5bd20c8b7e738ea) Thanks [@denbite](https://github.com/denbite)! - Internal logging library with capabilities for integration with modern logging libraries like Pino, Winston, etc

- [#1209](https://github.com/wulianapp/chainless-api-ts/pull/1209) [`cdd8d1c8`](https://github.com/wulianapp/chainless-api-ts/commit/cdd8d1c8c37db641bd995b2c470ad0b4fdddb93f) Thanks [@gtsonevv](https://github.com/gtsonevv)! - Replace tweetnacl by @noble/curves

- [#1194](https://github.com/wulianapp/chainless-api-ts/pull/1194) [`038b9b9f`](https://github.com/wulianapp/chainless-api-ts/commit/038b9b9fd57f73e537041d4b90ed07bf3cd811d9) Thanks [@andrew-scott-fischer](https://github.com/andrew-scott-fischer)! - fixes override of global fetch property

- Updated dependencies [[`695220e7`](https://github.com/wulianapp/chainless-api-ts/commit/695220e75bc43834a7700cfc5491a7eebd324947), [`ecf29e2d`](https://github.com/wulianapp/chainless-api-ts/commit/ecf29e2d56611a7773c79d5bb5bd20c8b7e738ea), [`61349aec`](https://github.com/wulianapp/chainless-api-ts/commit/61349aeca3af830f702b24654e0f13cd428192d8)]:
  - @chainless-js/utils@0.0.5
  - @chainless-js/transactions@1.0.0

## 0.0.7

### Patch Changes

- Updated dependencies []:
  - @chainless-js/transactions@0.2.1

## 0.0.6

### Patch Changes

- Updated dependencies [[`e21ff896`](https://github.com/wulianapp/chainless-api-ts/commit/e21ff89601c858fb703169e3bb53c6d96cff5342), [`00b4d2ba`](https://github.com/wulianapp/chainless-api-ts/commit/00b4d2ba3f9f3a1f90343e34cb9bde8cdb607ceb)]:
  - @chainless-js/transactions@0.2.0

## 0.0.5

### Patch Changes

- Updated dependencies [[`bf81ddc1`](https://github.com/wulianapp/chainless-api-ts/commit/bf81ddc11c958dece2244798bdfa6ab11e653940)]:
  - @chainless-js/types@0.0.4
  - @chainless-js/transactions@0.1.1
  - @chainless-js/utils@0.0.4

## 0.0.4

### Patch Changes

- [#1111](https://github.com/wulianapp/chainless-api-ts/pull/1111) [`d6d53ab1`](https://github.com/wulianapp/chainless-api-ts/commit/d6d53ab1b90e3d4041080dd4a6e22d24900c1ca5) Thanks [@andy-haynes](https://github.com/andy-haynes)! - Only fall back on `node-fetch` when global.fetch is `undefined`

## 0.0.3

### Patch Changes

- [#1103](https://github.com/wulianapp/chainless-api-ts/pull/1103) [`b713ae78`](https://github.com/wulianapp/chainless-api-ts/commit/b713ae78969d530e7e69e21e315e3d3fdb5e68e9) Thanks [@austinabell](https://github.com/austinabell)! - Implement light client block retrieval and relevant types

- [#1097](https://github.com/wulianapp/chainless-api-ts/pull/1097) [`d97d2a6e`](https://github.com/wulianapp/chainless-api-ts/commit/d97d2a6e891350cdea418da2af2b2971bdf0467e) Thanks [@andy-haynes](https://github.com/andy-haynes)! - Add support for delegate actions and meta transactions

- [#1071](https://github.com/wulianapp/chainless-api-ts/pull/1071) [`4704ee77`](https://github.com/wulianapp/chainless-api-ts/commit/4704ee7717d9e92e7729037368e7ace84a9c7f1c) Thanks [@kiskesis](https://github.com/kiskesis)! - Fix Provider.validators method signature to accept a `null` argument

- Updated dependencies [[`b713ae78`](https://github.com/wulianapp/chainless-api-ts/commit/b713ae78969d530e7e69e21e315e3d3fdb5e68e9), [`bc53c32c`](https://github.com/wulianapp/chainless-api-ts/commit/bc53c32c80694e6f22d9be97db44603591f0026b), [`d97d2a6e`](https://github.com/wulianapp/chainless-api-ts/commit/d97d2a6e891350cdea418da2af2b2971bdf0467e), [`8c6bf391`](https://github.com/wulianapp/chainless-api-ts/commit/8c6bf391a01af9adb81cb8731c45bdb17f5291c0)]:
  - @chainless-js/types@0.0.3
  - @chainless-js/transactions@0.1.0
  - @chainless-js/utils@0.0.3

## 0.0.2

### Patch Changes

- [#1091](https://github.com/wulianapp/chainless-api-ts/pull/1091) [`ca458cac`](https://github.com/wulianapp/chainless-api-ts/commit/ca458cac683fab614b77eb5daa160e03b0640350) Thanks [@andy-haynes](https://github.com/andy-haynes)! - Only include contents of lib/ in NPM packages

- Updated dependencies [[`ca458cac`](https://github.com/wulianapp/chainless-api-ts/commit/ca458cac683fab614b77eb5daa160e03b0640350)]:
  - @chainless-js/transactions@0.0.2
  - @chainless-js/types@0.0.2
  - @chainless-js/utils@0.0.2

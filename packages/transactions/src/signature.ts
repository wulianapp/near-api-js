import { KeyType } from '@chainless-js/crypto';
import { Assignable } from '@chainless-js/types';

export class Signature extends Assignable {
    keyType: KeyType;
    data: Uint8Array;
}

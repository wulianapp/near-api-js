import { Assignable } from '@chainless-js/types';
import { baseEncode, baseDecode } from '@chainless-js/utils';
import { ed25519 } from '@noble/curves/ed25519';

import { KeySize, KeyType } from './constants';

function key_type_to_str(keyType: KeyType): string {
    switch (keyType) {
        case KeyType.ED25519: return 'ed25519';
        default: throw new Error(`Unknown key type ${keyType}`);
    }
}

function str_to_key_type(keyType: string): KeyType {
    switch (keyType.toLowerCase()) {
        case 'ed25519': return KeyType.ED25519;
        default: throw new Error(`Unknown key type ${keyType}`);
    }
}

/**
 * PublicKey representation that has type and bytes of the key.
 */
export class PublicKey extends Assignable {
    keyType: KeyType;
    data: Uint8Array;

    /**
     * Creates a PublicKey instance from a string or an existing PublicKey instance.
     * @param value The string or PublicKey instance to create a PublicKey from.
     * @returns {PublicKey} The PublicKey instance.
     */
    static from(value: string | PublicKey): PublicKey {
        if (typeof value === 'string') {
            return PublicKey.fromString(value);
        }
        return value;
    }

    /**
     * Creates a PublicKey instance from an encoded key string.
     * @param encodedKey The encoded key string.
     * @returns {PublicKey} The PublicKey instance created from the encoded key string.
     */
    static fromString(encodedKey: string): PublicKey {
        const parts = encodedKey.split(':');
        let publicKey: string;
        let keyType = KeyType.ED25519;
        if (parts.length === 1) {
            publicKey = parts[0];
        } else if (parts.length === 2) {
            publicKey = parts[1];
            keyType = str_to_key_type(parts[0]);
        } else {
            throw new Error('Invalid encoded key format, must be <curve>:<encoded key>');
        }
        const decodedPublicKey = baseDecode(publicKey);
        if(decodedPublicKey.length !== KeySize.SECRET_KEY) {
            throw new Error(`Invalid public key size (${decodedPublicKey.length}), must be ${KeySize.SECRET_KEY}`);
        }
        return new PublicKey({ keyType, data: decodedPublicKey });
    }

    /**
     * Returns a string representation of the public key.
     * @returns {string} The string representation of the public key.
     */
    toString(): string {
        return `${key_type_to_str(this.keyType)}:${baseEncode(this.data)}`;
    }

    /**
     * Verifies a message signature using the public key.
     * @param message The message to be verified.
     * @param signature The signature to be verified.
     * @returns {boolean} `true` if the signature is valid, otherwise `false`.
     */
    verify(message: Uint8Array, signature: Uint8Array): boolean {
        switch (this.keyType) {
            case KeyType.ED25519: return ed25519.verify(signature, message, this.data);
            default: throw new Error(`Unknown key type ${this.keyType}`);
        }
    }
}

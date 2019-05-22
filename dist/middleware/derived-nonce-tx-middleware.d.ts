import { Address } from '../address';
import { ITxMiddlewareHandler, Client, ITxResults } from '../client';
/**
 * Wraps data in a NonceTx.
 *
 * This middleware derives the Account from the provided txData.  This assumes that no other
 * Tx Wrappers have been applied yet after the LoomProvider._callAsync() method.  I.E. the txData
 * parameter should have the following deserializable layers: Transaction(MessageTx(<any>))
 *
 * This middleware obtains the latest nonce from the chain for each tx.
 * The Loom DAppChain keeps track of the nonce of the last committed tx to prevent replay attacks.
 */
export declare class DerivedNonceTxMiddleware implements ITxMiddlewareHandler {
    private _client;
    constructor(client: Client);
    static DeriveAccount(txData: Readonly<Uint8Array>): Address;
    Handle(txData: Readonly<Uint8Array>): Promise<Uint8Array>;
    HandleResults(results: ITxResults): ITxResults;
}

import { ITxMiddlewareHandler, Client, ITxResults } from '../client';
/**
 * Wraps data in a NonceTx.
 *
 * This middleware derives the Account from the provided txData.  This assumes that no other
 * Tx Wrappers have been applied after the LoomProvider._callAsync() method.  I.E. the txData
 * parameter should have the following deserializable layers: Transaction(MessageTx(<any>))
 *
 * This middleware obtains the initial nonce value from the chain, and then increments it locally
 * for every tx, if a tx fails due to a nonce mismatch the chain is queried again to obtain the
 * latest nonce.
 *
 * The CachedNonceTxMiddleware waits for a tx to be commited before incrementing the cached nonce,
 * while the SpeculativeDerivedNonceTxMiddleware increments the cached nonce before the tx is even
 * sent to the chain - which makes it possible for a caller to rapidly submit a bunch of txs.
 */
export declare class SpeculativeDerivedNonceTxMiddleware implements ITxMiddlewareHandler {
    private _client;
    private _lastNonceByAddress;
    private _fetchNoncePromise;
    constructor(client: Client);
    Handle(txData: Readonly<Uint8Array>): Promise<Uint8Array>;
    HandleResults(results: ITxResults): ITxResults;
    handleError(err: any): void;
    private _updateLastNonce;
    private _fetchNonce;
}

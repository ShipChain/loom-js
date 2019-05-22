import { ITxMiddlewareHandler, Client, ITxResults } from '../client';
export declare const INVALID_TX_NONCE_ERROR = "Invalid tx nonce";
/**
 * Wraps data in a NonceTx.
 * This middleware obtains the latest nonce from the chain for each tx.
 * The Loom DAppChain keeps track of the nonce of the last committed tx to prevent replay attacks.
 */
export declare class NonceEthTxMiddleware implements ITxMiddlewareHandler {
    private _client;
    constructor(client: Client);
    Handle(txData: Readonly<Uint8Array>): Promise<Uint8Array>;
    HandleResults(results: ITxResults): ITxResults;
}

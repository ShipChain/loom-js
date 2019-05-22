import debug from 'debug'

import { Address } from '../address'
import { ITxMiddlewareHandler, Client, ITxResults } from '../client'
import { NonceTx, Transaction, MessageTx } from '../proto/loom_pb'
import { INVALID_TX_NONCE_ERROR } from './nonce-tx-middleware'

const log = debug('derived-nonce-tx-middleware')

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
export class DerivedNonceTxMiddleware implements ITxMiddlewareHandler {
  private _client: Client

  constructor(client: Client) {
    this._client = client
  }

  static DeriveAccount(txData: Readonly<Uint8Array>): Address {
    const incomingTx: Transaction = Transaction.deserializeBinary(Uint8Array.from(txData))
    const incomingMsgTx: MessageTx = MessageTx.deserializeBinary(incomingTx.getData_asU8())
    return Address.UnmarshalPB(incomingMsgTx.getFrom()!)
  }

  async Handle(txData: Readonly<Uint8Array>): Promise<Uint8Array> {
    const fromAddress: Address = DerivedNonceTxMiddleware.DeriveAccount(txData)

    const nonce = await this._client.getAccountNonceAsync({ account: fromAddress.toString() })

    log(`Next nonce ${nonce + 1}`)

    const tx = new NonceTx()
    tx.setInner(txData as Uint8Array)
    tx.setSequence(nonce + 1)
    return tx.serializeBinary()
  }

  HandleResults(results: ITxResults): ITxResults {
    const { validation, commit } = results
    if (
      validation &&
      validation.code === 1 &&
      (validation.log && validation.log.indexOf('sequence number does not match') !== -1)
    ) {
      throw new Error(INVALID_TX_NONCE_ERROR)
    }
    if (
      commit &&
      commit.code === 1 &&
      (commit.log && commit.log.indexOf('sequence number does not match') !== -1)
    ) {
      throw new Error(INVALID_TX_NONCE_ERROR)
    }
    return results
  }
}

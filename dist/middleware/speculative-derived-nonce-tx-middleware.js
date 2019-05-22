"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var debug_1 = tslib_1.__importDefault(require("debug"));
var loom_pb_1 = require("../proto/loom_pb");
var client_1 = require("../client");
var nonce_tx_middleware_1 = require("./nonce-tx-middleware");
var derived_nonce_tx_middleware_1 = require("./derived-nonce-tx-middleware");
var log = debug_1.default('speculative-derived-nonce-tx-middleware');
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
var SpeculativeDerivedNonceTxMiddleware = /** @class */ (function () {
    function SpeculativeDerivedNonceTxMiddleware(client) {
        this._client = client;
        this._lastNonceByAddress = new Map();
        this._fetchNoncePromise = null;
    }
    SpeculativeDerivedNonceTxMiddleware.prototype.Handle = function (txData) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var fromAddress, nextNonce, tx;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fromAddress = derived_nonce_tx_middleware_1.DerivedNonceTxMiddleware.DeriveAccount(txData);
                        if (!!this._lastNonceByAddress.has(fromAddress)) return [3 /*break*/, 2];
                        log('Nonce not cached');
                        return [4 /*yield*/, this._updateLastNonce(fromAddress)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        nextNonce = this._lastNonceByAddress.get(fromAddress) + 1;
                        this._lastNonceByAddress.set(fromAddress, nextNonce);
                        log("Next nonce " + nextNonce);
                        tx = new loom_pb_1.NonceTx();
                        tx.setInner(txData);
                        tx.setSequence(nextNonce);
                        return [2 /*return*/, tx.serializeBinary()];
                }
            });
        });
    };
    SpeculativeDerivedNonceTxMiddleware.prototype.HandleResults = function (results) {
        var validation = results.validation, commit = results.commit;
        var isInvalidTx = validation && validation.code !== 0;
        var isFailedTx = commit && commit.code;
        if (isInvalidTx || isFailedTx) {
            // Nonce has to be reset regardless of the cause of the tx failure.
            log("Reset cached nonce due to failed tx");
            // this._lastNonce = -1
            // Throw a specific error for a nonce mismatch
            var isCheckTxNonceInvalid = validation &&
                validation.code === 1 &&
                (validation.log && validation.log.indexOf('sequence number does not match') !== -1);
            var isDeliverTxNonceInvalid = commit &&
                commit.code === 1 &&
                (commit.log && commit.log.indexOf('sequence number does not match') !== -1);
            if (isCheckTxNonceInvalid || isDeliverTxNonceInvalid) {
                throw new Error(nonce_tx_middleware_1.INVALID_TX_NONCE_ERROR);
            }
        }
        return results;
    };
    SpeculativeDerivedNonceTxMiddleware.prototype.handleError = function (err) {
        if (client_1.isTxAlreadyInCacheError(err)) {
            // This error indicates the tx payload & nonce were identical to a previously sent tx,
            // which means the cached nonce has diverged from the nonce on the node, need to clear it out
            // so it's refetched for the next tx.
            // this._lastNonce = -1
            // TODO: start a timeout so nonce isn't requeried too soon
            log('Reset cached nonce due to dupe tx');
        }
    };
    SpeculativeDerivedNonceTxMiddleware.prototype._updateLastNonce = function (fromAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                // make sure only one request is in flight at any time
                if (this._fetchNoncePromise) {
                    return [2 /*return*/, this._fetchNoncePromise];
                }
                this._fetchNoncePromise = this._fetchNonce(fromAddress);
                this._fetchNoncePromise
                    .then(function () { return (_this._fetchNoncePromise = null); })
                    .catch(function () { return (_this._fetchNoncePromise = null); });
                return [2 /*return*/, this._fetchNoncePromise];
            });
        });
    };
    SpeculativeDerivedNonceTxMiddleware.prototype._fetchNonce = function (fromAddress) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var lastNonce, err_1;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        log('Fetching nonce...');
                        return [4 /*yield*/, this._client.getAccountNonceAsync({ account: fromAddress.toString() })];
                    case 1:
                        lastNonce = _a.sent();
                        this._lastNonceByAddress.set(fromAddress, lastNonce);
                        log("Fetched nonce " + lastNonce);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        throw Error('Failed to obtain latest nonce');
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return SpeculativeDerivedNonceTxMiddleware;
}());
exports.SpeculativeDerivedNonceTxMiddleware = SpeculativeDerivedNonceTxMiddleware;
//# sourceMappingURL=speculative-derived-nonce-tx-middleware.js.map
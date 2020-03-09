"use strict";
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var tape_1 = tslib_1.__importDefault(require("tape"));
var helpers_1 = require("../../helpers");
var __1 = require("../..");
var helpers_2 = require("../helpers");
var evm_helpers_1 = require("../evm-helpers");
var contracts_1 = require("../../contracts");
var solidity_helpers_1 = require("../../solidity-helpers");
var Web3 = require('web3');
var EthereumTx = require('ethereumjs-tx');
var TEST_ETH_ADDR = '0x41ef0087901189bB5134De780fC6b3392C7914E6';
var TEST_ETH_PRIVATE_KEY = '0110000101110100011001010111001101110100011010110110010101111001';
function signTransaction(unsignedTx) {
    var privateKey = new Buffer(TEST_ETH_PRIVATE_KEY, 'hex');
    var tx = new EthereumTx(unsignedTx);
    tx.sign(privateKey);
    return tx.serialize();
}
function generateCallTransaction(value, contract, web3) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var abiEncodedData, nonce;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    abiEncodedData = contract.methods.set(value).encodeABI();
                    return [4 /*yield*/, web3.eth.getTransactionCount(TEST_ETH_ADDR)];
                case 1:
                    nonce = _a.sent();
                    return [2 /*return*/, {
                            nonce: nonce,
                            gasPrice: 0,
                            gasLimit: 0,
                            to: contract.options.address,
                            value: 0,
                            data: abiEncodedData
                        }];
            }
        });
    });
}
function generateDeployTransaction(web3) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var contractData, nonce;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contractData = '0x608060405234801561001057600080fd5b50600a60008190555061010e806100286000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60d9565b6040518082815260200191505060405180910390f35b806000819055506000547fb922f092a64f1a076de6f21e4d7c6400b6e55791cc935e7bb8e7e90f7652f15b60405160405180910390a250565b600080549050905600a165627a7a72305820b76f6c855a1f95260fc70490b16774074225da52ea165a58e95eb7a72a59d1700029';
                    return [4 /*yield*/, web3.eth.getTransactionCount(TEST_ETH_ADDR)];
                case 1:
                    nonce = _a.sent();
                    return [2 /*return*/, {
                            nonce: nonce,
                            gasPrice: 0,
                            gasLimit: 0,
                            data: contractData
                        }];
            }
        });
    });
}
function loadRinkebyAccount(web3) {
    var ownerAccount = web3.eth.accounts.privateKeyToAccount('0x' + TEST_ETH_PRIVATE_KEY);
    web3.eth.accounts.wallet.add(ownerAccount);
    return { account: ownerAccount, web3: web3 };
}
function newContractAndClient() {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var privKey, client, from, web3, rinkeby, signer, error_1, contractData, ABI, loomProvider, result, err_1, contract;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    privKey = __1.CryptoUtils.generatePrivateKey();
                    client = helpers_2.createTestClient();
                    from = __1.LocalAddress.fromPublicKey(__1.CryptoUtils.publicKeyFromPrivateKey(privKey)).toString();
                    web3 = new Web3('http://127.0.0.1:46658/eth');
                    client.txMiddleware = helpers_1.createDefaultTxMiddleware(client, privKey);
                    client.on('error', console.log);
                    rinkeby = loadRinkebyAccount(web3);
                    signer = new solidity_helpers_1.OfflineWeb3Signer(rinkeby.web3, rinkeby.account);
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, mapAccounts({
                            client: client,
                            signer: signer,
                            ownerRinkebyAddress: rinkeby.account,
                            ownerExtdevAddress: from
                        })];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    console.log('account mapping error', error_1);
                    return [3 /*break*/, 4];
                case 4:
                    contractData = '0x608060405234801561001057600080fd5b50600a60008190555061010e806100286000396000f3006080604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c146078575b600080fd5b348015605957600080fd5b5060766004803603810190808035906020019092919050505060a0565b005b348015608357600080fd5b50608a60d9565b6040518082815260200191505060405180910390f35b806000819055506000547fb922f092a64f1a076de6f21e4d7c6400b6e55791cc935e7bb8e7e90f7652f15b60405160405180910390a250565b600080549050905600a165627a7a72305820b76f6c855a1f95260fc70490b16774074225da52ea165a58e95eb7a72a59d1700029';
                    ABI = [
                        {
                            constant: false,
                            inputs: [{ name: '_value', type: 'uint256' }],
                            name: 'set',
                            outputs: [],
                            payable: false,
                            stateMutability: 'nonpayable',
                            type: 'function'
                        },
                        {
                            constant: true,
                            inputs: [],
                            name: 'get',
                            outputs: [{ name: '', type: 'uint256' }],
                            payable: false,
                            stateMutability: 'view',
                            type: 'function'
                        },
                        { inputs: [], payable: false, stateMutability: 'nonpayable', type: 'constructor' },
                        {
                            anonymous: false,
                            inputs: [{ indexed: true, name: '_value', type: 'uint256' }],
                            name: 'NewValueSet',
                            type: 'event'
                        }
                    ];
                    loomProvider = new __1.LoomProvider(client, privKey);
                    _a.label = 5;
                case 5:
                    _a.trys.push([5, 7, , 8]);
                    return [4 /*yield*/, evm_helpers_1.deployContract(loomProvider, contractData)];
                case 6:
                    result = _a.sent();
                    return [3 /*break*/, 8];
                case 7:
                    err_1 = _a.sent();
                    console.debug(err_1);
                    process.exit(0);
                    return [3 /*break*/, 8];
                case 8:
                    try {
                        contract = new web3.eth.Contract(ABI, result.contractAddress, { from: from });
                    }
                    catch (err) {
                        console.debug(err);
                    }
                    return [2 /*return*/, { contract: contract, web3: web3, from: from, privKey: privKey, client: client }];
            }
        });
    });
}
function mapAccounts(_a) {
    var client = _a.client, signer = _a.signer, ownerRinkebyAddress = _a.ownerRinkebyAddress, ownerExtdevAddress = _a.ownerExtdevAddress;
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var ownerRinkebyAddr, ownerExtdevAddr, mapperContract, err_2, mapping, err_3, err_4;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    ownerRinkebyAddr = __1.Address.fromString("eth:" + ownerRinkebyAddress.address);
                    ownerExtdevAddr = __1.Address.fromString(client.chainId + ":" + ownerExtdevAddress);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, contracts_1.AddressMapper.createAsync(client, ownerExtdevAddr)];
                case 2:
                    mapperContract = _b.sent();
                    return [3 /*break*/, 4];
                case 3:
                    err_2 = _b.sent();
                    console.debug(err_2);
                    return [3 /*break*/, 4];
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, mapperContract.getMappingAsync(ownerExtdevAddr)];
                case 5:
                    mapping = _b.sent();
                    console.log(mapping.from.toString() + " is already mapped to " + mapping.to.toString());
                    return [2 /*return*/];
                case 6:
                    err_3 = _b.sent();
                    return [3 /*break*/, 7];
                case 7:
                    console.debug('addIdentityMappingAsync');
                    _b.label = 8;
                case 8:
                    _b.trys.push([8, 10, , 11]);
                    return [4 /*yield*/, mapperContract.addIdentityMappingAsync(ownerExtdevAddr, ownerRinkebyAddr, signer)];
                case 9:
                    _b.sent();
                    console.log("Mapped " + ownerExtdevAddr + " to " + ownerRinkebyAddr);
                    return [3 /*break*/, 11];
                case 10:
                    err_4 = _b.sent();
                    console.debug('addIdentityMappingAsync error', err_4);
                    return [3 /*break*/, 11];
                case 11: return [2 /*return*/];
            }
        });
    });
}
tape_1.default('getEthereumTxHash should generate correct tx hash for EVM call tx', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, contract, web3, client, value, unsignedTx, signedTx, ethTxHash, txSigned, receipt, err_5, err_6;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, newContractAndClient()];
            case 1:
                _a = _b.sent(), contract = _a.contract, web3 = _a.web3, client = _a.client;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, , 9]);
                value = '0';
                return [4 /*yield*/, generateCallTransaction(value, contract, web3)];
            case 3:
                unsignedTx = _b.sent();
                signedTx = signTransaction(unsignedTx);
                ethTxHash = helpers_1.getEthereumTxHash(signedTx);
                txSigned = '0x' + signedTx.toString('hex');
                receipt = void 0;
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, web3.eth.sendSignedTransaction(txSigned)];
            case 5:
                receipt = _b.sent();
                return [3 /*break*/, 7];
            case 6:
                err_5 = _b.sent();
                console.log('send tx error', err_5);
                return [3 /*break*/, 7];
            case 7:
                t.equal(receipt.transactionHash, ethTxHash, 'tx hash on receipt matches pre-generated hash');
                return [3 /*break*/, 9];
            case 8:
                err_6 = _b.sent();
                console.log(err_6);
                t.error(err_6, 'Error found');
                return [3 /*break*/, 9];
            case 9:
                if (client) {
                    client.disconnect();
                }
                t.end();
                return [2 /*return*/];
        }
    });
}); });
tape_1.default('getEthereumTxHash should generate correct tx hash for EVM deploy tx', function (t) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
    var _a, web3, client, unsignedTx, signedTx, ethTxHash, txSigned, receipt, err_7, err_8;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, newContractAndClient()];
            case 1:
                _a = _b.sent(), web3 = _a.web3, client = _a.client;
                _b.label = 2;
            case 2:
                _b.trys.push([2, 8, , 9]);
                return [4 /*yield*/, generateDeployTransaction(web3)];
            case 3:
                unsignedTx = _b.sent();
                signedTx = signTransaction(unsignedTx);
                ethTxHash = helpers_1.getEthereumTxHash(signedTx);
                txSigned = '0x' + signedTx.toString('hex');
                receipt = void 0;
                _b.label = 4;
            case 4:
                _b.trys.push([4, 6, , 7]);
                return [4 /*yield*/, web3.eth.sendSignedTransaction(txSigned)];
            case 5:
                receipt = _b.sent();
                return [3 /*break*/, 7];
            case 6:
                err_7 = _b.sent();
                console.log('send tx error', err_7);
                return [3 /*break*/, 7];
            case 7:
                t.equal(receipt.transactionHash, ethTxHash, 'tx hash on receipt matches pre-generated hash');
                return [3 /*break*/, 9];
            case 8:
                err_8 = _b.sent();
                console.log(err_8);
                t.error(err_8, 'Error found');
                return [3 /*break*/, 9];
            case 9:
                if (client) {
                    client.disconnect();
                }
                t.end();
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=verify-hash-test.js.map
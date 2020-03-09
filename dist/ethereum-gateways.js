"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var debug_1 = tslib_1.__importDefault(require("debug"));
var ethers_1 = require("ethers");
var _1 = require(".");
var helpers_1 = require("./helpers");
var transfer_gateway_pb_js_1 = require("./proto/transfer_gateway_pb.js");
var ValidatorManagerV2Factory_1 = require("./mainnet-contracts/ValidatorManagerV2Factory");
var EthereumGatewayV2Factory_1 = require("./mainnet-contracts/EthereumGatewayV2Factory");
var EthereumGatewayV1Factory_1 = require("./mainnet-contracts/EthereumGatewayV1Factory");
var log = debug_1.default('loom.ethereum');
var EthereumGatewayV1 = /** @class */ (function () {
    function EthereumGatewayV1(contract) {
        this.contract = contract;
        this.version = 1;
    }
    EthereumGatewayV1.prototype.withdrawAsync = function (receipt, overrides) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var signature, result;
            return tslib_1.__generator(this, function (_a) {
                signature = _1.CryptoUtils.bytesToHexAddr(receipt.oracleSignature);
                switch (receipt.tokenKind) {
                    case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ETH:
                        result = this.contract.functions.withdrawETH(receipt.tokenAmount.toString(), signature, overrides);
                        break;
                    case transfer_gateway_pb_js_1.TransferGatewayTokenKind.LOOMCOIN:
                    case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ERC20:
                        result = this.contract.functions.withdrawERC20(receipt.tokenAmount.toString(), signature, receipt.tokenContract.local.toString(), overrides);
                        break;
                    case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ERC721:
                        result = this.contract.functions.withdrawERC721(receipt.tokenId.toString(), signature, receipt.tokenContract.local.toString(), overrides);
                        break;
                    case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ERC721X:
                        result = this.contract.functions.withdrawERC721X(receipt.tokenId.toString(), receipt.tokenAmount.toString(), signature, receipt.tokenContract.local.toString(), overrides);
                        break;
                    default:
                        throw new Error('Unsupported token kind ' + receipt.tokenKind);
                }
                return [2 /*return*/, result];
            });
        });
    };
    EthereumGatewayV1.prototype.depositERC20Async = function (amount, contractAddress, overrides) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.contract.functions.depositERC20(amount.toString(), contractAddress, overrides)];
            });
        });
    };
    EthereumGatewayV1.prototype.withSigner = function (signer) {
        return new EthereumGatewayV1(this.contract.connect(signer));
    };
    return EthereumGatewayV1;
}());
exports.EthereumGatewayV1 = EthereumGatewayV1;
var EthereumGatewayV2 = /** @class */ (function () {
    function EthereumGatewayV2(contract, vmc) {
        this.contract = contract;
        this.vmc = vmc;
        this.version = 2;
    }
    EthereumGatewayV2.prototype.withdrawAsync = function (receipt, overrides) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var validators, hash, _a, vs, rs, ss, valIndexes, result;
            return tslib_1.__generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.vmc.functions.getValidators()];
                    case 1:
                        validators = _b.sent();
                        hash = createWithdrawalHash(receipt, this.contract.address);
                        _a = helpers_1.parseSigs(_1.CryptoUtils.bytesToHexAddr(receipt.oracleSignature), hash, validators), vs = _a.vs, rs = _a.rs, ss = _a.ss, valIndexes = _a.valIndexes;
                        switch (receipt.tokenKind) {
                            case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ETH:
                                result = this.contract.functions.withdrawETH(receipt.tokenAmount.toString(), valIndexes, vs, rs, ss, overrides);
                                break;
                            case transfer_gateway_pb_js_1.TransferGatewayTokenKind.LOOMCOIN:
                            case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ERC20:
                                result = this.contract.functions.withdrawERC20(receipt.tokenAmount.toString(), receipt.tokenContract.local.toString(), valIndexes, vs, rs, ss, overrides);
                                break;
                            case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ERC721:
                                result = this.contract.functions.withdrawERC721(receipt.tokenId.toString(), receipt.tokenContract.local.toString(), valIndexes, vs, rs, ss, overrides);
                                break;
                            case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ERC721X:
                                result = this.contract.functions.withdrawERC721X(receipt.tokenId.toString(), receipt.tokenAmount.toString(), receipt.tokenContract.local.toString(), valIndexes, vs, rs, ss, overrides);
                                break;
                            default:
                                throw new Error('Unsupported token kind ' + receipt.tokenKind);
                        }
                        return [2 /*return*/, result];
                }
            });
        });
    };
    EthereumGatewayV2.prototype.depositERC20Async = function (amount, contractAddress, overrides) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                return [2 /*return*/, this.contract.functions.depositERC20(amount.toString(), contractAddress, overrides)];
            });
        });
    };
    EthereumGatewayV2.prototype.withSigner = function (signer) {
        return new EthereumGatewayV2(this.contract.connect(signer), this.vmc);
    };
    return EthereumGatewayV2;
}());
exports.EthereumGatewayV2 = EthereumGatewayV2;
/**
 * Creates an Ethereum Gateway contract wrapper.
 * @param version Ethereum Gateway contract version, must be 1, or 2.
 * @param address Ethereum Gateway address.
 * @param provider web3 provider.
 */
function createEthereumGatewayAsync(version, address, provider) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var gatewayContract, _a, vmcAddress, vmcContract;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    gatewayContract = EthereumGatewayV2Factory_1.EthereumGatewayV2Factory.connect(address, provider);
                    _a = version;
                    switch (_a) {
                        case 2: return [3 /*break*/, 1];
                        case 1: return [3 /*break*/, 3];
                    }
                    return [3 /*break*/, 4];
                case 1: return [4 /*yield*/, gatewayContract.functions.vmc()];
                case 2:
                    vmcAddress = _b.sent();
                    vmcContract = ValidatorManagerV2Factory_1.ValidatorManagerV2Factory.connect(vmcAddress, provider);
                    return [2 /*return*/, new EthereumGatewayV2(gatewayContract, vmcContract)];
                case 3: return [2 /*return*/, new EthereumGatewayV1(EthereumGatewayV1Factory_1.EthereumGatewayV1Factory.connect(address, provider))];
                case 4: throw new Error('Invalid Ethereum Gateway version: ' + version);
            }
        });
    });
}
exports.createEthereumGatewayAsync = createEthereumGatewayAsync;
var MessagePrefix;
(function (MessagePrefix) {
    MessagePrefix["ETH"] = "\u000EWithdraw ETH:\n";
    MessagePrefix["ERC20"] = "\u0010Withdraw ERC20:\n";
    MessagePrefix["ERC721"] = "\u0011Withdraw ERC721:\n";
    MessagePrefix["ERC721X"] = "\u0012Withdraw ERC721X:\n";
})(MessagePrefix || (MessagePrefix = {}));
function createWithdrawalHash(receipt, gatewayAddress) {
    var prefix;
    var amountHashed;
    switch (receipt.tokenKind) {
        case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ERC721:
            prefix = MessagePrefix.ERC721;
            amountHashed = ethers_1.ethers.utils.solidityKeccak256(['uint256', 'address'], [receipt.tokenId ? receipt.tokenId.toString() : 0, receipt.tokenContract.local.toString()]);
            break;
        case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ERC721X:
            prefix = MessagePrefix.ERC721X;
            amountHashed = ethers_1.ethers.utils.solidityKeccak256(['uint256', 'uint256', 'address'], [
                receipt.tokenId ? receipt.tokenId.toString() : 0,
                receipt.tokenAmount ? receipt.tokenAmount.toString() : 0,
                receipt.tokenContract.local.toString()
            ]);
            break;
        case transfer_gateway_pb_js_1.TransferGatewayTokenKind.LOOMCOIN:
        case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ERC20:
            prefix = MessagePrefix.ERC20;
            amountHashed = ethers_1.ethers.utils.solidityKeccak256(['uint256', 'address'], [
                receipt.tokenAmount ? receipt.tokenAmount.toString() : 0,
                receipt.tokenContract.local.toString()
            ]);
            break;
        case transfer_gateway_pb_js_1.TransferGatewayTokenKind.ETH:
            prefix = MessagePrefix.ETH;
            amountHashed = ethers_1.ethers.utils.solidityKeccak256(['uint256'], [receipt.tokenAmount ? receipt.tokenAmount.toString() : 0]);
            break;
        default:
            throw new Error('Unsupported token kind');
    }
    return ethers_1.ethers.utils.solidityKeccak256(['string', 'address', 'uint256', 'address', 'bytes32'], [
        prefix,
        receipt.tokenOwner.local.toString(),
        receipt.withdrawalNonce.toString(),
        gatewayAddress,
        amountHashed
    ]);
}
//# sourceMappingURL=ethereum-gateways.js.map
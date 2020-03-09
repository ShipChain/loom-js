"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var contract_1 = require("../contract");
var sample_go_contract_pb_1 = require("../proto/sample_go_contract_pb");
var SampleGoContract = /** @class */ (function (_super) {
    tslib_1.__extends(SampleGoContract, _super);
    function SampleGoContract(params) {
        return _super.call(this, params) || this;
    }
    SampleGoContract.createAsync = function (client, callerAddr) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var contractAddr;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.getContractAddressAsync('sample-go-contract')];
                    case 1:
                        contractAddr = _a.sent();
                        if (!contractAddr) {
                            throw Error('Failed to resolve contract address');
                        }
                        return [2 /*return*/, new SampleGoContract({ contractAddr: contractAddr, callerAddr: callerAddr, client: client })];
                }
            });
        });
    };
    SampleGoContract.prototype.testNestedEvmCallsAsync = function (innerEmitter, outerEmitter, innerEmitterValue, outerEmitterValue) {
        var request = new sample_go_contract_pb_1.SampleGoContractNestedEvmRequest();
        request.setInnerEmitter(innerEmitter.MarshalPB());
        request.setOuterEmitter(outerEmitter.MarshalPB());
        request.setInnerEmitterValue(innerEmitterValue);
        request.setOuterEmitterValue(outerEmitterValue);
        return this.callAsync('TestNestedEvmCalls', request);
    };
    return SampleGoContract;
}(contract_1.Contract));
exports.SampleGoContract = SampleGoContract;
//# sourceMappingURL=sample-go-contract.js.map
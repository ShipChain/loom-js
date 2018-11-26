// package: 
// file: proto/dposv2.proto

import * as jspb from "google-protobuf";
import * as proto_loom_pb from "../proto/loom_pb";

export class ParamsV2 extends jspb.Message {
  getValidatorCount(): number;
  setValidatorCount(value: number): void;

  getElectionCycleLength(): number;
  setElectionCycleLength(value: number): void;

  hasCoinContractAddress(): boolean;
  clearCoinContractAddress(): void;
  getCoinContractAddress(): proto_loom_pb.Address | undefined;
  setCoinContractAddress(value?: proto_loom_pb.Address): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ParamsV2.AsObject;
  static toObject(includeInstance: boolean, msg: ParamsV2): ParamsV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ParamsV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ParamsV2;
  static deserializeBinaryFromReader(message: ParamsV2, reader: jspb.BinaryReader): ParamsV2;
}

export namespace ParamsV2 {
  export type AsObject = {
    validatorCount: number,
    electionCycleLength: number,
    coinContractAddress?: proto_loom_pb.Address.AsObject,
  }
}

export class Validator extends jspb.Message {
  getPubKey(): Uint8Array | string;
  getPubKey_asU8(): Uint8Array;
  getPubKey_asB64(): string;
  setPubKey(value: Uint8Array | string): void;

  getPower(): number;
  setPower(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Validator.AsObject;
  static toObject(includeInstance: boolean, msg: Validator): Validator.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: Validator, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Validator;
  static deserializeBinaryFromReader(message: Validator, reader: jspb.BinaryReader): Validator;
}

export namespace Validator {
  export type AsObject = {
    pubKey: Uint8Array | string,
    power: number,
  }
}

export class StateV2 extends jspb.Message {
  hasParams(): boolean;
  clearParams(): void;
  getParams(): ParamsV2 | undefined;
  setParams(value?: ParamsV2): void;

  clearValidatorsList(): void;
  getValidatorsList(): Array<Validator>;
  setValidatorsList(value: Array<Validator>): void;
  addValidators(value?: Validator, index?: number): Validator;

  getLastElectionTime(): number;
  setLastElectionTime(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StateV2.AsObject;
  static toObject(includeInstance: boolean, msg: StateV2): StateV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StateV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StateV2;
  static deserializeBinaryFromReader(message: StateV2, reader: jspb.BinaryReader): StateV2;
}

export namespace StateV2 {
  export type AsObject = {
    params?: ParamsV2.AsObject,
    validatorsList: Array<Validator.AsObject>,
    lastElectionTime: number,
  }
}

export class CandidateV2 extends jspb.Message {
  hasAddress(): boolean;
  clearAddress(): void;
  getAddress(): proto_loom_pb.Address | undefined;
  setAddress(value?: proto_loom_pb.Address): void;

  getPubKey(): Uint8Array | string;
  getPubKey_asU8(): Uint8Array;
  getPubKey_asB64(): string;
  setPubKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CandidateV2.AsObject;
  static toObject(includeInstance: boolean, msg: CandidateV2): CandidateV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CandidateV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CandidateV2;
  static deserializeBinaryFromReader(message: CandidateV2, reader: jspb.BinaryReader): CandidateV2;
}

export namespace CandidateV2 {
  export type AsObject = {
    address?: proto_loom_pb.Address.AsObject,
    pubKey: Uint8Array | string,
  }
}

export class CandidateListV2 extends jspb.Message {
  clearCandidatesList(): void;
  getCandidatesList(): Array<CandidateV2>;
  setCandidatesList(value: Array<CandidateV2>): void;
  addCandidates(value?: CandidateV2, index?: number): CandidateV2;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CandidateListV2.AsObject;
  static toObject(includeInstance: boolean, msg: CandidateListV2): CandidateListV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CandidateListV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CandidateListV2;
  static deserializeBinaryFromReader(message: CandidateListV2, reader: jspb.BinaryReader): CandidateListV2;
}

export namespace CandidateListV2 {
  export type AsObject = {
    candidatesList: Array<CandidateV2.AsObject>,
  }
}

export class DelegationV2 extends jspb.Message {
  hasValidator(): boolean;
  clearValidator(): void;
  getValidator(): proto_loom_pb.Address | undefined;
  setValidator(value?: proto_loom_pb.Address): void;

  hasDelegator(): boolean;
  clearDelegator(): void;
  getDelegator(): proto_loom_pb.Address | undefined;
  setDelegator(value?: proto_loom_pb.Address): void;

  getHeight(): number;
  setHeight(value: number): void;

  hasAmount(): boolean;
  clearAmount(): void;
  getAmount(): proto_loom_pb.BigUInt | undefined;
  setAmount(value?: proto_loom_pb.BigUInt): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DelegationV2.AsObject;
  static toObject(includeInstance: boolean, msg: DelegationV2): DelegationV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DelegationV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DelegationV2;
  static deserializeBinaryFromReader(message: DelegationV2, reader: jspb.BinaryReader): DelegationV2;
}

export namespace DelegationV2 {
  export type AsObject = {
    validator?: proto_loom_pb.Address.AsObject,
    delegator?: proto_loom_pb.Address.AsObject,
    height: number,
    amount?: proto_loom_pb.BigUInt.AsObject,
  }
}

export class DelegationListV2 extends jspb.Message {
  clearDelegationsList(): void;
  getDelegationsList(): Array<DelegationV2>;
  setDelegationsList(value: Array<DelegationV2>): void;
  addDelegations(value?: DelegationV2, index?: number): DelegationV2;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DelegationListV2.AsObject;
  static toObject(includeInstance: boolean, msg: DelegationListV2): DelegationListV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DelegationListV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DelegationListV2;
  static deserializeBinaryFromReader(message: DelegationListV2, reader: jspb.BinaryReader): DelegationListV2;
}

export namespace DelegationListV2 {
  export type AsObject = {
    delegationsList: Array<DelegationV2.AsObject>,
  }
}

export class DPOSInitRequestV2 extends jspb.Message {
  hasParams(): boolean;
  clearParams(): void;
  getParams(): ParamsV2 | undefined;
  setParams(value?: ParamsV2): void;

  clearValidatorsList(): void;
  getValidatorsList(): Array<Validator>;
  setValidatorsList(value: Array<Validator>): void;
  addValidators(value?: Validator, index?: number): Validator;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DPOSInitRequestV2.AsObject;
  static toObject(includeInstance: boolean, msg: DPOSInitRequestV2): DPOSInitRequestV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DPOSInitRequestV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DPOSInitRequestV2;
  static deserializeBinaryFromReader(message: DPOSInitRequestV2, reader: jspb.BinaryReader): DPOSInitRequestV2;
}

export namespace DPOSInitRequestV2 {
  export type AsObject = {
    params?: ParamsV2.AsObject,
    validatorsList: Array<Validator.AsObject>,
  }
}

export class DelegateRequestV2 extends jspb.Message {
  hasValidatorAddress(): boolean;
  clearValidatorAddress(): void;
  getValidatorAddress(): proto_loom_pb.Address | undefined;
  setValidatorAddress(value?: proto_loom_pb.Address): void;

  hasAmount(): boolean;
  clearAmount(): void;
  getAmount(): proto_loom_pb.BigUInt | undefined;
  setAmount(value?: proto_loom_pb.BigUInt): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DelegateRequestV2.AsObject;
  static toObject(includeInstance: boolean, msg: DelegateRequestV2): DelegateRequestV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: DelegateRequestV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): DelegateRequestV2;
  static deserializeBinaryFromReader(message: DelegateRequestV2, reader: jspb.BinaryReader): DelegateRequestV2;
}

export namespace DelegateRequestV2 {
  export type AsObject = {
    validatorAddress?: proto_loom_pb.Address.AsObject,
    amount?: proto_loom_pb.BigUInt.AsObject,
  }
}

export class RedelegateRequestV2 extends jspb.Message {
  hasValidatorAddress(): boolean;
  clearValidatorAddress(): void;
  getValidatorAddress(): proto_loom_pb.Address | undefined;
  setValidatorAddress(value?: proto_loom_pb.Address): void;

  hasAmount(): boolean;
  clearAmount(): void;
  getAmount(): proto_loom_pb.BigUInt | undefined;
  setAmount(value?: proto_loom_pb.BigUInt): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RedelegateRequestV2.AsObject;
  static toObject(includeInstance: boolean, msg: RedelegateRequestV2): RedelegateRequestV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RedelegateRequestV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RedelegateRequestV2;
  static deserializeBinaryFromReader(message: RedelegateRequestV2, reader: jspb.BinaryReader): RedelegateRequestV2;
}

export namespace RedelegateRequestV2 {
  export type AsObject = {
    validatorAddress?: proto_loom_pb.Address.AsObject,
    amount?: proto_loom_pb.BigUInt.AsObject,
  }
}

export class CheckDelegationRequestV2 extends jspb.Message {
  hasValidatorAddress(): boolean;
  clearValidatorAddress(): void;
  getValidatorAddress(): proto_loom_pb.Address | undefined;
  setValidatorAddress(value?: proto_loom_pb.Address): void;

  hasDelegatorAddress(): boolean;
  clearDelegatorAddress(): void;
  getDelegatorAddress(): proto_loom_pb.Address | undefined;
  setDelegatorAddress(value?: proto_loom_pb.Address): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckDelegationRequestV2.AsObject;
  static toObject(includeInstance: boolean, msg: CheckDelegationRequestV2): CheckDelegationRequestV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckDelegationRequestV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckDelegationRequestV2;
  static deserializeBinaryFromReader(message: CheckDelegationRequestV2, reader: jspb.BinaryReader): CheckDelegationRequestV2;
}

export namespace CheckDelegationRequestV2 {
  export type AsObject = {
    validatorAddress?: proto_loom_pb.Address.AsObject,
    delegatorAddress?: proto_loom_pb.Address.AsObject,
  }
}

export class CheckDelegationResponseV2 extends jspb.Message {
  hasDelegation(): boolean;
  clearDelegation(): void;
  getDelegation(): DelegationV2 | undefined;
  setDelegation(value?: DelegationV2): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CheckDelegationResponseV2.AsObject;
  static toObject(includeInstance: boolean, msg: CheckDelegationResponseV2): CheckDelegationResponseV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: CheckDelegationResponseV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CheckDelegationResponseV2;
  static deserializeBinaryFromReader(message: CheckDelegationResponseV2, reader: jspb.BinaryReader): CheckDelegationResponseV2;
}

export namespace CheckDelegationResponseV2 {
  export type AsObject = {
    delegation?: DelegationV2.AsObject,
  }
}

export class UnbondRequestV2 extends jspb.Message {
  hasValidatorAddress(): boolean;
  clearValidatorAddress(): void;
  getValidatorAddress(): proto_loom_pb.Address | undefined;
  setValidatorAddress(value?: proto_loom_pb.Address): void;

  hasAmount(): boolean;
  clearAmount(): void;
  getAmount(): proto_loom_pb.BigUInt | undefined;
  setAmount(value?: proto_loom_pb.BigUInt): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnbondRequestV2.AsObject;
  static toObject(includeInstance: boolean, msg: UnbondRequestV2): UnbondRequestV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnbondRequestV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnbondRequestV2;
  static deserializeBinaryFromReader(message: UnbondRequestV2, reader: jspb.BinaryReader): UnbondRequestV2;
}

export namespace UnbondRequestV2 {
  export type AsObject = {
    validatorAddress?: proto_loom_pb.Address.AsObject,
    amount?: proto_loom_pb.BigUInt.AsObject,
  }
}

export class RegisterCandidateRequestV2 extends jspb.Message {
  getPubKey(): Uint8Array | string;
  getPubKey_asU8(): Uint8Array;
  getPubKey_asB64(): string;
  setPubKey(value: Uint8Array | string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterCandidateRequestV2.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterCandidateRequestV2): RegisterCandidateRequestV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterCandidateRequestV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterCandidateRequestV2;
  static deserializeBinaryFromReader(message: RegisterCandidateRequestV2, reader: jspb.BinaryReader): RegisterCandidateRequestV2;
}

export namespace RegisterCandidateRequestV2 {
  export type AsObject = {
    pubKey: Uint8Array | string,
  }
}

export class UnregisterCandidateRequestV2 extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): UnregisterCandidateRequestV2.AsObject;
  static toObject(includeInstance: boolean, msg: UnregisterCandidateRequestV2): UnregisterCandidateRequestV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: UnregisterCandidateRequestV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): UnregisterCandidateRequestV2;
  static deserializeBinaryFromReader(message: UnregisterCandidateRequestV2, reader: jspb.BinaryReader): UnregisterCandidateRequestV2;
}

export namespace UnregisterCandidateRequestV2 {
  export type AsObject = {
  }
}

export class ElectDelegationRequestV2 extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ElectDelegationRequestV2.AsObject;
  static toObject(includeInstance: boolean, msg: ElectDelegationRequestV2): ElectDelegationRequestV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ElectDelegationRequestV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ElectDelegationRequestV2;
  static deserializeBinaryFromReader(message: ElectDelegationRequestV2, reader: jspb.BinaryReader): ElectDelegationRequestV2;
}

export namespace ElectDelegationRequestV2 {
  export type AsObject = {
  }
}

export class ListValidatorsRequestV2 extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListValidatorsRequestV2.AsObject;
  static toObject(includeInstance: boolean, msg: ListValidatorsRequestV2): ListValidatorsRequestV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListValidatorsRequestV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListValidatorsRequestV2;
  static deserializeBinaryFromReader(message: ListValidatorsRequestV2, reader: jspb.BinaryReader): ListValidatorsRequestV2;
}

export namespace ListValidatorsRequestV2 {
  export type AsObject = {
  }
}

export class ListValidatorsResponseV2 extends jspb.Message {
  clearValidatorsList(): void;
  getValidatorsList(): Array<Validator>;
  setValidatorsList(value: Array<Validator>): void;
  addValidators(value?: Validator, index?: number): Validator;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListValidatorsResponseV2.AsObject;
  static toObject(includeInstance: boolean, msg: ListValidatorsResponseV2): ListValidatorsResponseV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListValidatorsResponseV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListValidatorsResponseV2;
  static deserializeBinaryFromReader(message: ListValidatorsResponseV2, reader: jspb.BinaryReader): ListValidatorsResponseV2;
}

export namespace ListValidatorsResponseV2 {
  export type AsObject = {
    validatorsList: Array<Validator.AsObject>,
  }
}

export class ListCandidateRequestV2 extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCandidateRequestV2.AsObject;
  static toObject(includeInstance: boolean, msg: ListCandidateRequestV2): ListCandidateRequestV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListCandidateRequestV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCandidateRequestV2;
  static deserializeBinaryFromReader(message: ListCandidateRequestV2, reader: jspb.BinaryReader): ListCandidateRequestV2;
}

export namespace ListCandidateRequestV2 {
  export type AsObject = {
  }
}

export class ListCandidateResponseV2 extends jspb.Message {
  clearCandidatesList(): void;
  getCandidatesList(): Array<CandidateV2>;
  setCandidatesList(value: Array<CandidateV2>): void;
  addCandidates(value?: CandidateV2, index?: number): CandidateV2;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ListCandidateResponseV2.AsObject;
  static toObject(includeInstance: boolean, msg: ListCandidateResponseV2): ListCandidateResponseV2.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ListCandidateResponseV2, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ListCandidateResponseV2;
  static deserializeBinaryFromReader(message: ListCandidateResponseV2, reader: jspb.BinaryReader): ListCandidateResponseV2;
}

export namespace ListCandidateResponseV2 {
  export type AsObject = {
    candidatesList: Array<CandidateV2.AsObject>,
  }
}


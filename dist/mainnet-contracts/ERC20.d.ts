/* Generated by ts-generator ver. 0.0.8 */
/* tslint:disable */

import { Contract, ContractTransaction, EventFilter, Signer } from "ethers";
import { Listener, Provider } from "ethers/providers";
import { Arrayish, BigNumber, BigNumberish, Interface } from "ethers/utils";
import {
  TransactionOverrides,
  TypedEventDescription,
  TypedFunctionDescription
} from ".";

interface ERC20Interface extends Interface {
  functions: {
    transfer: TypedFunctionDescription<{
      encode([to, value]: [string, BigNumberish]): string;
    }>;

    transferFrom: TypedFunctionDescription<{
      encode([from, to, value]: [string, string, BigNumberish]): string;
    }>;

    approve: TypedFunctionDescription<{
      encode([spender, value]: [string, BigNumberish]): string;
    }>;
  };

  events: {
    Approval: TypedEventDescription<{
      encodeTopics([owner, spender, value]: [
        string | null,
        string | null,
        null
      ]): string[];
    }>;

    Transfer: TypedEventDescription<{
      encodeTopics([from, to, value]: [
        string | null,
        string | null,
        null
      ]): string[];
    }>;
  };
}

export class ERC20 extends Contract {
  connect(signerOrProvider: Signer | Provider | string): ERC20;
  attach(addressOrName: string): ERC20;
  deployed(): Promise<ERC20>;

  on(event: EventFilter | string, listener: Listener): ERC20;
  once(event: EventFilter | string, listener: Listener): ERC20;
  addListener(eventName: EventFilter | string, listener: Listener): ERC20;
  removeAllListeners(eventName: EventFilter | string): ERC20;
  removeListener(eventName: any, listener: Listener): ERC20;

  interface: ERC20Interface;

  functions: {
    balanceOf(who: string): Promise<BigNumber>;

    allowance(owner: string, spender: string): Promise<BigNumber>;

    transfer(
      to: string,
      value: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    transferFrom(
      from: string,
      to: string,
      value: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    approve(
      spender: string,
      value: BigNumberish,
      overrides?: TransactionOverrides
    ): Promise<ContractTransaction>;

    totalSupply(): Promise<BigNumber>;
  };

  filters: {
    Approval(
      owner: string | null,
      spender: string | null,
      value: null
    ): EventFilter;

    Transfer(from: string | null, to: string | null, value: null): EventFilter;
  };

  estimate: {
    transfer(to: string, value: BigNumberish): Promise<BigNumber>;

    transferFrom(
      from: string,
      to: string,
      value: BigNumberish
    ): Promise<BigNumber>;

    approve(spender: string, value: BigNumberish): Promise<BigNumber>;
  };
}

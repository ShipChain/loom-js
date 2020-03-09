import BN from 'bn.js';
import { ethers } from 'ethers';
import { Address, Contracts } from '.';
import { IWithdrawalReceipt } from './contracts/transfer-gateway';
import { CrossChainUser, CrossChainUserParams, CrossChainUserConstructorParams } from './crosschain-user';
import { ERC20 } from './mainnet-contracts/ERC20';
import { EthereumGatewayV2 as EthereumGatewayV2Contract } from './mainnet-contracts/EthereumGatewayV2';
import { ValidatorManagerV2 as ValidatorManagerContractV2 } from './mainnet-contracts/ValidatorManagerV2';
export declare type GatewayVersion = 1 | 2;
export interface EthereumContracts {
    gateway: EthereumGatewayV2Contract;
    loomToken: ERC20;
    vmc?: ValidatorManagerContractV2;
}
export interface GatewayUserParams extends CrossChainUserParams {
    gatewayAddress: string;
    version: GatewayVersion;
}
export interface GatewayUserConstructorParams extends CrossChainUserConstructorParams {
    gateway: EthereumGatewayV2Contract;
    loomToken: ERC20;
    vmc?: ValidatorManagerContractV2;
    dappchainGateway: Contracts.LoomCoinTransferGateway;
    dappchainLoom: Contracts.Coin;
    version: GatewayVersion;
}
/**
 * @deprecated Will be removed in loom-js v2.0.0
 */
export declare class GatewayUser extends CrossChainUser {
    private _ethereumGateway;
    private _ethereumLoom;
    private _ethereumVMC?;
    private _dappchainGateway;
    private _dappchainLoom;
    private _version;
    static createGatewayOfflineUserAsync(params: GatewayUserParams): Promise<GatewayUser>;
    static createGatewayMetamaskUserAsync(params: GatewayUserParams): Promise<GatewayUser>;
    static getContracts(wallet: ethers.Signer, gatewayAddress: string, version?: GatewayVersion): Promise<EthereumContracts>;
    private static getGatewayVersion;
    static createEthSignMetamaskGatewayUserAsync(params: GatewayUserParams): Promise<GatewayUser>;
    static createGatewayUserAsync(params: GatewayUserParams): Promise<GatewayUser>;
    constructor(params: GatewayUserConstructorParams);
    readonly ethereumVMC: ValidatorManagerContractV2 | undefined;
    readonly ethereumGateway: EthereumGatewayV2Contract;
    readonly ethereumLoom: ERC20;
    readonly dappchainLoom: Contracts.Coin;
    readonly dappchainGateway: Contracts.LoomCoinTransferGateway;
    /**
     * Deposits funds from mainnet to the gateway
     */
    depositAsync(amount: BN): Promise<ethers.ContractTransaction>;
    /**
     * Withdraw funds from the gateway to mainnet
     */
    withdrawAsync(amount: BN): Promise<ethers.ContractTransaction>;
    resumeWithdrawalAsync(): Promise<ethers.ContractTransaction | undefined>;
    getPendingWithdrawalReceiptAsync(): Promise<IWithdrawalReceipt | null>;
    /**
     * Retrieves the  DAppChain LoomCoin balance of a user
     * @param address The address to check the balance of. If not provided, it will check the user's balance
     */
    getDAppChainBalanceAsync(address?: string): Promise<BN>;
    /**
     * Deposits an amount of LOOM tokens to the dappchain gateway and return a signature which can be used to withdraw the same amount from the mainnet gateway.
     *
     * @param amount The amount that will be deposited to the DAppChain Gateway (and will be possible to withdraw from the mainnet)
     */
    private depositCoinToDAppChainGatewayAsync;
    getUnclaimedLoomTokensAsync(owner?: string): Promise<BN>;
    private withdrawCoinFromDAppChainGatewayAsync;
    private createWithdrawalHash;
    /**
     * Helper function to prefix an address with the chainId to get chainId:address format
     */
    prefixAddress(address: string): Address;
}

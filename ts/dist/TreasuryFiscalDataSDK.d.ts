import { AvgInterestRateEntity } from './entity/AvgInterestRateEntity';
import { DebtToPennyEntity } from './entity/DebtToPennyEntity';
export type * from './TreasuryFiscalDataTypes';
import { inspect } from 'node:util';
import type { Context, Feature } from './types';
import { config } from './Config';
import { TreasuryFiscalDataEntityBase } from './TreasuryFiscalDataEntityBase';
import { Utility } from './utility/Utility';
import { BaseFeature } from './feature/base/BaseFeature';
declare const stdutil: Utility;
declare class TreasuryFiscalDataSDK {
    _mode: string;
    _options: any;
    _utility: Utility;
    _features: Feature[];
    _rootctx: Context;
    constructor(options?: any);
    options(): any;
    utility(): any;
    prepare(fetchargs?: any): Promise<any>;
    direct(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    _rawRequest(fetchargs?: any): Promise<Error | {
        ok: boolean;
        err: any;
        status?: undefined;
        headers?: undefined;
        data?: undefined;
    } | {
        ok: boolean;
        status: number;
        headers: any;
        data: any;
        err?: undefined;
    }>;
    graphql(query: string, variables?: any, ctrl?: any): Promise<any>;
    AvgInterestRate(entopts?: Record<string, any>): AvgInterestRateEntity;
    DebtToPenny(entopts?: Record<string, any>): DebtToPennyEntity;
    static test(testoptsarg?: any, sdkoptsarg?: any): TreasuryFiscalDataSDK;
    tester(testopts?: any, sdkopts?: any): TreasuryFiscalDataSDK;
    toJSON(): {
        name: string;
    };
    toString(): string;
    [inspect.custom](): string;
}
declare const SDK: typeof TreasuryFiscalDataSDK;
export { stdutil, config, BaseFeature, TreasuryFiscalDataEntityBase, TreasuryFiscalDataSDK, SDK, };

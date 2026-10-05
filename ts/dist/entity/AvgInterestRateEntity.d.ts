import { TreasuryFiscalDataEntityBase } from '../TreasuryFiscalDataEntityBase';
import type { TreasuryFiscalDataSDK } from '../TreasuryFiscalDataSDK';
import type { Control } from '../types';
import type { AvgInterestRate, AvgInterestRateListMatch } from '../TreasuryFiscalDataTypes';
declare class AvgInterestRateEntity extends TreasuryFiscalDataEntityBase<AvgInterestRate> {
    constructor(client: TreasuryFiscalDataSDK, entopts: any);
    make(this: AvgInterestRateEntity): AvgInterestRateEntity;
    list(this: any, reqmatch?: AvgInterestRateListMatch, ctrl?: Control): Promise<AvgInterestRateEntity[]>;
}
export { AvgInterestRateEntity };

import { TreasuryFiscalDataEntityBase } from '../TreasuryFiscalDataEntityBase';
import type { TreasuryFiscalDataSDK } from '../TreasuryFiscalDataSDK';
import type { Control } from '../types';
import type { DebtToPenny, DebtToPennyListMatch } from '../TreasuryFiscalDataTypes';
declare class DebtToPennyEntity extends TreasuryFiscalDataEntityBase<DebtToPenny> {
    constructor(client: TreasuryFiscalDataSDK, entopts: any);
    make(this: DebtToPennyEntity): DebtToPennyEntity;
    list(this: any, reqmatch?: DebtToPennyListMatch, ctrl?: Control): Promise<DebtToPennyEntity[]>;
}
export { DebtToPennyEntity };

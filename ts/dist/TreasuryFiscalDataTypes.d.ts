export interface AvgInterestRate {
    avg_interest_rate_amt?: string;
    record_calendar_day?: string;
    record_calendar_month?: string;
    record_calendar_quarter?: string;
    record_calendar_year?: string;
    record_date?: string;
    record_fiscal_quarter?: string;
    record_fiscal_year?: string;
    security_desc?: string;
    security_type_desc?: string;
    src_line_nbr?: string;
}
export interface AvgInterestRateListMatch {
    field?: string;
    filter?: string;
    page_number?: number;
    page_size?: number;
    sort?: string;
}
export interface DebtToPenny {
    debt_held_public_amt?: string;
    intragov_hold_amt?: string;
    record_calendar_day?: string;
    record_calendar_month?: string;
    record_calendar_quarter?: string;
    record_calendar_year?: string;
    record_date?: string;
    record_fiscal_quarter?: string;
    record_fiscal_year?: string;
    src_line_nbr?: string;
    tot_pub_debt_out_amt?: string;
}
export interface DebtToPennyListMatch {
    field?: string;
    filter?: string;
    page_number?: number;
    page_size?: number;
    sort?: string;
}

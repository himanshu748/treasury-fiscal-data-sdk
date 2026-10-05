
import { BaseFeature } from './feature/base/BaseFeature'
import { TestFeature } from './feature/test/TestFeature'



const FEATURE_CLASS: Record<string, typeof BaseFeature> = {
   test: TestFeature,

}


const FEATURE_PLUGINS: Record<string, any[]> = {
  
}


class Config {

  makeFeature(this: any, fn: string) {
    const fc = FEATURE_CLASS[fn]
    const fi = new fc()
    return fi
  }

  // False for a feature added at runtime via options.extend (station's
  // adopt path) - the constructor uses this to skip makeFeature for names
  // no generated class backs.
  hasFeature(this: any, fn: string) {
    return null != FEATURE_CLASS[fn]
  }


  main = {
    name: 'TreasuryFiscalData',
        slug: "treasury-fiscal-data",
    version: "0.1.0",
    target: "ts",

  }


  feature = {
     test:     {
      "options": {
        "active": false
      },
      "optspec": {
        "entity": "`$MAP`",
        "net": "`$MAP`"
      },
      "strict": false,
      "transport": "base"
    },

  }


  options = {
    base: "https://api.fiscaldata.treasury.gov/services/api/fiscal_service",

    headers: {
      "content-type": "application/json"
    },

    entity: {
      
        avg_interest_rate: {
        },
  
        debt_to_penny: {
        },
  
    }
  }


  entity = {
    "avg_interest_rate": {
      "fields": [
        {
          "name": "avg_interest_rate_amt",
          "title": "Avg Interest Rate Amt",
          "type": "`$STRING`",
          "short": "Average Interest Rate Amount"
        },
        {
          "name": "record_calendar_day",
          "title": "Record Calendar Day",
          "type": "`$STRING`",
          "short": "Calendar Day Number"
        },
        {
          "name": "record_calendar_month",
          "title": "Record Calendar Month",
          "type": "`$STRING`",
          "short": "Calendar Month Number"
        },
        {
          "name": "record_calendar_quarter",
          "title": "Record Calendar Quarter",
          "type": "`$STRING`",
          "short": "Calendar Quarter Number"
        },
        {
          "name": "record_calendar_year",
          "title": "Record Calendar Year",
          "type": "`$STRING`",
          "short": "Calendar Year"
        },
        {
          "name": "record_date",
          "title": "Record Date",
          "type": "`$STRING`",
          "short": "Record Date",
          "format": "date"
        },
        {
          "name": "record_fiscal_quarter",
          "title": "Record Fiscal Quarter",
          "type": "`$STRING`",
          "short": "Fiscal Quarter Number"
        },
        {
          "name": "record_fiscal_year",
          "title": "Record Fiscal Year",
          "type": "`$STRING`",
          "short": "Fiscal Year"
        },
        {
          "name": "security_desc",
          "title": "Security Desc",
          "type": "`$STRING`",
          "short": "Security Description"
        },
        {
          "name": "security_type_desc",
          "title": "Security Type Desc",
          "type": "`$STRING`",
          "short": "Security Type Description"
        },
        {
          "name": "src_line_nbr",
          "title": "Src Line Nbr",
          "type": "`$STRING`",
          "short": "Source Line Number"
        }
      ],
      "name": "avg_interest_rate",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/accounting/od/avg_interest_rates",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "accounting"
                },
                {
                  "lit": "od"
                },
                {
                  "lit": "avg_interest_rates"
                }
              ],
              "parts": [
                "v2",
                "accounting",
                "od",
                "avg_interest_rates"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "filter",
                    "orig": "filter",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page_number",
                    "orig": "page[number]",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "page_size",
                    "orig": "page[size]",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 100
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "field",
                  "filter",
                  "page_number",
                  "page_size",
                  "sort"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    },
    "debt_to_penny": {
      "fields": [
        {
          "name": "debt_held_public_amt",
          "title": "Debt Held Public Amt",
          "type": "`$STRING`",
          "short": "Debt Held by the Public"
        },
        {
          "name": "intragov_hold_amt",
          "title": "Intragov Hold Amt",
          "type": "`$STRING`",
          "short": "Intragovernmental Holdings"
        },
        {
          "name": "record_calendar_day",
          "title": "Record Calendar Day",
          "type": "`$STRING`",
          "short": "Calendar Day Number"
        },
        {
          "name": "record_calendar_month",
          "title": "Record Calendar Month",
          "type": "`$STRING`",
          "short": "Calendar Month Number"
        },
        {
          "name": "record_calendar_quarter",
          "title": "Record Calendar Quarter",
          "type": "`$STRING`",
          "short": "Calendar Quarter Number"
        },
        {
          "name": "record_calendar_year",
          "title": "Record Calendar Year",
          "type": "`$STRING`",
          "short": "Calendar Year"
        },
        {
          "name": "record_date",
          "title": "Record Date",
          "type": "`$STRING`",
          "short": "Record Date",
          "format": "date"
        },
        {
          "name": "record_fiscal_quarter",
          "title": "Record Fiscal Quarter",
          "type": "`$STRING`",
          "short": "Fiscal Quarter Number"
        },
        {
          "name": "record_fiscal_year",
          "title": "Record Fiscal Year",
          "type": "`$STRING`",
          "short": "Fiscal Year"
        },
        {
          "name": "src_line_nbr",
          "title": "Src Line Nbr",
          "type": "`$STRING`",
          "short": "Source Line Number"
        },
        {
          "name": "tot_pub_debt_out_amt",
          "title": "Tot Pub Debt Out Amt",
          "type": "`$STRING`",
          "short": "Total Public Debt Outstanding"
        }
      ],
      "name": "debt_to_penny",
      "op": {
        "list": {
          "input": "data",
          "name": "list",
          "points": [
            {
              "kind": "http",
              "method": "GET",
              "orig": "/v2/accounting/od/debt_to_penny",
              "segments": [
                {
                  "lit": "v2"
                },
                {
                  "lit": "accounting"
                },
                {
                  "lit": "od"
                },
                {
                  "lit": "debt_to_penny"
                }
              ],
              "parts": [
                "v2",
                "accounting",
                "od",
                "debt_to_penny"
              ],
              "rename": {},
              "transform": {
                "req": "`reqdata`",
                "res": "`body.data`"
              },
              "args": {
                "query": [
                  {
                    "name": "field",
                    "orig": "fields",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "filter",
                    "orig": "filter",
                    "type": "`$STRING`",
                    "kind": "query"
                  },
                  {
                    "name": "page_number",
                    "orig": "page[number]",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 1
                  },
                  {
                    "name": "page_size",
                    "orig": "page[size]",
                    "type": "`$INTEGER`",
                    "kind": "query",
                    "example": 100
                  },
                  {
                    "name": "sort",
                    "orig": "sort",
                    "type": "`$STRING`",
                    "kind": "query"
                  }
                ]
              },
              "select": {
                "exist": [
                  "field",
                  "filter",
                  "page_number",
                  "page_size",
                  "sort"
                ]
              }
            }
          ]
        }
      },
      "relations": {
        "ancestors": []
      }
    }
  }
}


const config = new Config()

export {
  config,
  FEATURE_PLUGINS,
}


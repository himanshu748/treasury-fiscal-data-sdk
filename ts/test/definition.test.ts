import { describe, test } from 'node:test'
import { SDK } from '..'
import { runDefinitionPoint } from './definition-runner'
import { isControlSkipped } from './utility'


// Generated from the API definition, not from the model this SDK was built
// from: the route, the declared query parameters, the credential the security
// scheme names, and the definition's own response example.
const PLAN: any[] = [
  {
    "entity": "avg_interest_rate",
    "accessor": "AvgInterestRate",
    "op": "list",
    "method": "GET",
    "path": "/v2/accounting/od/avg_interest_rates",
    "args": [],
    "select": {
      "field": "v1",
      "filter": "v1",
      "page_number": "v1",
      "page_size": "v1",
      "sort": "v1"
    },
    "headers": [],
    "query": [
      "fields",
      "filter",
      "sort",
      "page[number]",
      "page[size]"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "avg_interest_rate_amt": "x",
          "record_calendar_day": "x",
          "record_calendar_month": "x",
          "record_calendar_quarter": "x",
          "record_calendar_year": "x",
          "record_date": "2026-01-01",
          "record_fiscal_quarter": "x",
          "record_fiscal_year": "x",
          "security_desc": "x",
          "security_type_desc": "x",
          "src_line_nbr": "x"
        }
      ],
      "meta": {},
      "links": {}
    },
    "idField": "id"
  },
  {
    "entity": "debt_to_penny",
    "accessor": "DebtToPenny",
    "op": "list",
    "method": "GET",
    "path": "/v2/accounting/od/debt_to_penny",
    "args": [],
    "select": {
      "field": "v1",
      "filter": "v1",
      "page_number": "v1",
      "page_size": "v1",
      "sort": "v1"
    },
    "headers": [],
    "query": [
      "fields",
      "filter",
      "sort",
      "page[number]",
      "page[size]"
    ],
    "auth": null,
    "status": 200,
    "sample": {
      "data": [
        {
          "debt_held_public_amt": "x",
          "intragov_hold_amt": "x",
          "record_calendar_day": "x",
          "record_calendar_month": "x",
          "record_calendar_quarter": "x",
          "record_calendar_year": "x",
          "record_date": "2026-01-01",
          "record_fiscal_quarter": "x",
          "record_fiscal_year": "x",
          "src_line_nbr": "x",
          "tot_pub_debt_out_amt": "x"
        }
      ],
      "meta": {},
      "links": {}
    },
    "idField": "id"
  }
]


describe('definition', () => {
  for (const point of PLAN) {
    test(point.entity + '.' + point.op + ' ' + point.method + ' ' + point.path, async (t) => {
      const control = isControlSkipped('entityOp', point.entity + '.' + point.op, 'definition')
      if (control.skip) {
        t.skip(control.reason || 'skipped via sdk-test-control.json')
        return
      }
      await runDefinitionPoint(SDK, point)
    })
  }
})

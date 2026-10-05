

import Path from 'node:path'
import * as Fs from 'node:fs'

import { test, describe, afterEach } from 'node:test'
import assert from 'node:assert'
import { createLiveTransport } from '../../live-runner'
import { runLiveEntity } from '../../live-entity'


import { TreasuryFiscalDataSDK, BaseFeature, stdutil } from '../../..'

import {
  envOverride,
  liveClientOptions,
  liveDelay,
  loadEnvLocal,
  makeCtrl,
  makeMatch,
  makeReqdata,
  makeStepData,
  makeValid,
  maybeSkipControl,
} from '../../utility'


loadEnvLocal(__dirname + '/../../../.env.local')


describe('DebtToPennyEntity', async () => {

  // Per-test live pacing. Delay is read from sdk-test-control.json's
  // `test.live.delayMs`; only sleeps when TREASURY_FISCAL_DATA_TEST_LIVE=TRUE.
  afterEach(liveDelay('TREASURY_FISCAL_DATA_TEST_LIVE'))

  test('instance', async () => {
    const testsdk = TreasuryFiscalDataSDK.test()
    const ent = testsdk.DebtToPenny()
    assert(null != ent)
  })


  test('basic', async (t) => {

    const live = 'TRUE' === process.env.TREASURY_FISCAL_DATA_TEST_LIVE
    for (const op of ['list']) {
      if (!live && maybeSkipControl(t, 'entityOp', 'debt_to_penny.' + op, live)) return
    }

    
    const setup = basicSetup()
    if (setup.live) {
      return runLiveEntity(setup, {"active":true,"alias":{"field":{}},"fields":{"debt_held_public_amt":{"a":true,"h":"Debt Held Public Amt","n":"debt_held_public_amt","r":false,"sh":"Debt Held by the Public","t":"`$STRING`","key$":"debt_held_public_amt","index$":0},"intragov_hold_amt":{"a":true,"h":"Intragov Hold Amt","n":"intragov_hold_amt","r":false,"sh":"Intragovernmental Holdings","t":"`$STRING`","key$":"intragov_hold_amt","index$":1},"record_calendar_day":{"a":true,"h":"Record Calendar Day","n":"record_calendar_day","r":false,"sh":"Calendar Day Number","t":"`$STRING`","key$":"record_calendar_day","index$":2},"record_calendar_month":{"a":true,"h":"Record Calendar Month","n":"record_calendar_month","r":false,"sh":"Calendar Month Number","t":"`$STRING`","key$":"record_calendar_month","index$":3},"record_calendar_quarter":{"a":true,"h":"Record Calendar Quarter","n":"record_calendar_quarter","r":false,"sh":"Calendar Quarter Number","t":"`$STRING`","key$":"record_calendar_quarter","index$":4},"record_calendar_year":{"a":true,"h":"Record Calendar Year","n":"record_calendar_year","r":false,"sh":"Calendar Year","t":"`$STRING`","key$":"record_calendar_year","index$":5},"record_date":{"a":true,"fo":"date","h":"Record Date","n":"record_date","r":false,"sh":"Record Date","t":"`$STRING`","key$":"record_date","index$":6},"record_fiscal_quarter":{"a":true,"h":"Record Fiscal Quarter","n":"record_fiscal_quarter","r":false,"sh":"Fiscal Quarter Number","t":"`$STRING`","key$":"record_fiscal_quarter","index$":7},"record_fiscal_year":{"a":true,"h":"Record Fiscal Year","n":"record_fiscal_year","r":false,"sh":"Fiscal Year","t":"`$STRING`","key$":"record_fiscal_year","index$":8},"src_line_nbr":{"a":true,"h":"Src Line Nbr","n":"src_line_nbr","r":false,"sh":"Source Line Number","t":"`$STRING`","key$":"src_line_nbr","index$":9},"tot_pub_debt_out_amt":{"a":true,"h":"Tot Pub Debt Out Amt","n":"tot_pub_debt_out_amt","r":false,"sh":"Total Public Debt Outstanding","t":"`$STRING`","key$":"tot_pub_debt_out_amt","index$":10}},"name":"debt_to_penny","op":{"list":{"input":"data","name":"list","points":[{"a":true,"co":{"id":"GET /v2/accounting/od/debt_to_penny","source":"openapi3","version":2},"g":{"query":[{"a":true,"k":"query","n":"field","or":"fields","r":false,"t":"`$STRING`","index$":0},{"a":true,"k":"query","n":"filter","or":"filter","r":false,"t":"`$STRING`","index$":1},{"a":true,"ex":1,"k":"query","n":"page_number","or":"page[number]","r":false,"t":"`$INTEGER`","index$":2},{"a":true,"ex":100,"k":"query","n":"page_size","or":"page[size]","r":false,"t":"`$INTEGER`","index$":3},{"a":true,"k":"query","n":"sort","or":"sort","r":false,"t":"`$STRING`","index$":4}]},"k":"http","m":"GET","o":"/v2/accounting/od/debt_to_penny","q":{"exist":["field","filter","page_number","page_size","sort"]},"r":{},"s":[{"lit":"v2"},{"lit":"accounting"},{"lit":"od"},{"lit":"debt_to_penny"}],"t":{"req":"`reqdata`","res":"`body.data`"},"index$":0}],"key$":"list"}},"relations":{"ancestors":[]},"key$":"debt_to_penny","name__orig":"debt_to_penny","Name":"DebtToPenny","name_":"debt_to_penny","name-":"debt-to-penny","NAME":"DEBT_TO_PENNY","index$":1}, {"active":true,"entity":"debt_to_penny","key$":"BasicDebtToPennyFlow","kind":"basic","name":"BasicDebtToPennyFlow","param":{},"step":[{"a":true,"d":{},"i":{},"m":{},"o":"list","s":[],"v":[{"apply":"ItemExists","def":{"ref":"debt_to_penny_ref01"}}]}]}, 'DebtToPenny', {"GET /v2/accounting/od/debt_to_penny":{"protocol":"http","parameters":[{"name":"fields","in":"query","required":false,"description":"Comma-separated fields. Selecting fields can trigger aggregation; see Treasury documentation.","schema":{"type":"string"},"index$":0},{"name":"filter","in":"query","required":false,"description":"Treasury filter expression, such as record_date:gte:2026-01-01.","schema":{"type":"string"},"index$":1},{"name":"sort","in":"query","required":false,"description":"Comma-separated fields; a leading minus reverses order.","schema":{"type":"string"},"index$":2},{"name":"page[number]","in":"query","required":false,"schema":{"type":"integer","minimum":1,"default":1},"index$":3},{"name":"page[size]","in":"query","required":false,"schema":{"type":"integer","minimum":1,"default":100},"index$":4}]}})
    }
    const client = setup.client
    const struct = setup.struct

    const isempty = struct.isempty
    const select = struct.select

    let debt_to_penny_ref01_data = Object.values(setup.data.existing.debt_to_penny)[0] as any

    // LIST
    const debt_to_penny_ref01_ent = client.DebtToPenny()
    const debt_to_penny_ref01_match: any = {}

    const debt_to_penny_ref01_list = (await debt_to_penny_ref01_ent.list(debt_to_penny_ref01_match)).map((e: any) => e.data())


  })
})



function basicSetup(extra?: any) {
  // TODO: fix test def options
  const options: any = {} // null

  // TODO: needs test utility to resolve path
  const entityDataFile =
    Path.resolve(__dirname, 
      '../../../../.sdk/test/entity/debt_to_penny/DebtToPennyTestData.json')

  // TODO: file ready util needed?
  const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8')

  // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
  const entityData = JSON.parse(entityDataSource)

  options.entity = entityData.existing

  let client = TreasuryFiscalDataSDK.test(options, extra)
  const struct = client.utility().struct
  const merge = struct.merge
  const transform = struct.transform

  let idmap = transform(
    ['debt_to_penny01','debt_to_penny02','debt_to_penny03'],
    {
      '`$PACK`': ['', {
        '`$KEY`': '`$COPY`',
        '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
      }]
    })

  const env = envOverride({
    'TREASURY_FISCAL_DATA_TEST_DEBT_TO_PENNY_ENTID': idmap,
    'TREASURY_FISCAL_DATA_TEST_LIVE': 'FALSE',
    'TREASURY_FISCAL_DATA_TEST_EXPLAIN': 'FALSE',
  })

  idmap = env['TREASURY_FISCAL_DATA_TEST_DEBT_TO_PENNY_ENTID']

  const live = 'TRUE' === env.TREASURY_FISCAL_DATA_TEST_LIVE

  const transport = createLiveTransport()
  if (live) {
    const rawIds = process.env['TREASURY_FISCAL_DATA_TEST_DEBT_TO_PENNY_ENTID']
    idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {}
    if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
      throw new Error('Live ENTID must be a JSON object')
    }
    client = new TreasuryFiscalDataSDK(merge([
      // FIRST, so the generated fields below win: sdk-test-control.json's
      // test.client.options adds to the live client, it does not redirect it.
      liveClientOptions(),
      {
      },
      // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
      // last entry is undefined, and basicSetup is normally called with no
      // argument at all - so a bare 'extra' silently discarded the apikey
      // and server values above and handed the SDK undefined. Harmless
      // while there was nothing in that object; not harmless now.
      extra || {},
      { system: { fetch: transport.fetch } }
    ]))
  }

  const setup = {
    idmap,
    env,
    options,
    client,
    struct,
    data: entityData,
    explain: 'TRUE' === env.TREASURY_FISCAL_DATA_TEST_EXPLAIN,
    live,
    transport,
    now: Date.now(),
  }

  return setup
}
  

const assert = require('node:assert/strict')
const { test } = require('node:test')
const fs = require('node:fs')
const path = require('node:path')

function SDK() {
  assert.ok(fs.existsSync(path.join(__dirname, '../ts/package.json')), 'Voxgig-generated TypeScript SDK must exist')
  return require('../ts').TreasuryFiscalDataSDK
}

const paths = ['/v2/accounting/od/debt_to_penny', '/v2/accounting/od/avg_interest_rates']

for (const endpoint of paths) {
  test(`direct GET retains path and decoded query values for ${endpoint}`, async () => {
    const Constructor = SDK()
    let received
    const client = new Constructor({ system: { fetch: async (url, init) => {
      received = { url: new URL(url), init }
      return new Response(JSON.stringify({ data: [], meta: { count: 0 }, links: {} }), { status: 200, headers: { 'content-type': 'application/json' } })
    } } })
    const query = { fields: 'record_date', filter: 'record_date:gte:2026-01-01', sort: '-record_date', 'page[number]': 2, 'page[size]': 1 }
    const result = await client.direct({ path: endpoint, method: 'GET', query })
    assert.equal(received.url.pathname, '/services/api/fiscal_service' + endpoint)
    assert.equal(received.init.method, 'GET')
    for (const [key, value] of Object.entries(query)) assert.equal(received.url.searchParams.get(key), String(value))
    assert.equal(result.ok, true)
    assert.equal(result.status, 200)
  })
}

test('successful response preserves string records and metadata envelope', async () => {
  const Constructor = SDK()
  const body = { data: [{ record_date: '2026-01-01', amount: '1.20', value: 'null' }], meta: { count: 1, total_count: 10 }, links: { next: '?page[number]=2' } }
  const client = new Constructor({ system: { fetch: async () => new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } }) } })
  const result = await client.direct({ path: paths[0], method: 'GET' })
  assert.equal(result.ok, true)
  assert.deepEqual(result.data, body)
})

test('empty data remains a successful response', async () => {
  const Constructor = SDK()
  const body = { data: [], meta: { count: 0 }, links: {} }
  const client = new Constructor({ system: { fetch: async () => new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } }) } })
  const result = await client.direct({ path: paths[0], method: 'GET' })
  assert.equal(result.ok, true)
  assert.deepEqual(result.data, body)
})

test('HTTP 400 preserves Treasury error response without false success', async () => {
  const Constructor = SDK()
  const body = { error: 'Invalid Query Param', message: "Invalid query parameter: Field 'invalid_field' does not exist." }
  const client = new Constructor({ system: { fetch: async () => new Response(JSON.stringify(body), { status: 400, headers: { 'content-type': 'application/json' } }) } })
  const result = await client.direct({ path: paths[0], method: 'GET', query: { fields: 'invalid_field' } })
  assert.equal(result.ok, false)
  assert.equal(result.status, 400)
  assert.deepEqual(result.data, body)
})

test('network failure surfaces without a false success envelope', async () => {
  const Constructor = SDK()
  const client = new Constructor({ system: { fetch: async () => { throw new Error('evaluation network failure') } } })
  const result = await client.direct({ path: paths[0], method: 'GET' })
  assert.equal(result.ok, false)
  assert.ok(result.err instanceof Error)
  assert.match(result.err.message, /evaluation network failure/)
})

for (const name of ['DebtToPenny', 'AvgInterestRate']) {
  test(`${name} list maps canonical query names and extracts Treasury data`, async () => {
    const Constructor = SDK()
    let received
    const body = { data: [{ record_date: '2026-01-01', src_line_nbr: '1' }], meta: { count: 1 }, links: {} }
    const client = new Constructor({ system: { fetch: async (url, init) => {
      received = { url: new URL(url), init }
      return new Response(JSON.stringify(body), { status: 200, headers: { 'content-type': 'application/json' } })
    } } })
    const records = await client[name]().list({ field: 'record_date', filter: 'record_date:gte:2026-01-01', sort: '-record_date', page_number: 2, page_size: 1 })
    assert.equal(received.url.searchParams.get('fields'), 'record_date')
    assert.equal(received.url.searchParams.get('page[number]'), '2')
    assert.equal(received.url.searchParams.get('page[size]'), '1')
    assert.equal(received.url.searchParams.get('filter'), 'record_date:gte:2026-01-01')
    assert.equal(received.url.searchParams.get('sort'), '-record_date')
    assert.equal(received.url.pathname, '/services/api/fiscal_service' + (name === 'DebtToPenny' ? paths[0] : paths[1]))
    assert.equal(records.length, 1)
    assert.deepEqual(records[0].data(), body.data[0])
  })
}

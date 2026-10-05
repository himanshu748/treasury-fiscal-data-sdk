const assert = require('node:assert/strict')
const fs = require('node:fs')
const path = require('node:path')
const { TreasuryFiscalDataSDK } = require('../ts')

const debt = '/v2/accounting/od/debt_to_penny'
const interest = '/v2/accounting/od/avg_interest_rates'
const client = new TreasuryFiscalDataSDK({
  headers: { accept: 'application/json' },
  system: { fetch: (url, init) => fetch(url, { ...init, signal: AbortSignal.timeout(30000) }) },
})

async function main() {
  const checks = []
  for (const [name, endpoint, query, status] of [
    ['debt-small-page', debt, { sort: '-record_date', 'page[size]': 2 }, 200],
    ['interest-small-page', interest, { sort: '-record_date', 'page[size]': 2 }, 200],
    ['debt-filter-sort-page', debt, { filter: 'record_date:gte:2026-01-01', sort: '-record_date', 'page[number]': 2, 'page[size]': 2 }, 200],
    ['debt-invalid-field', debt, { fields: 'invalid_field', 'page[size]': 1 }, 400],
  ]) {
    const result = await client.direct({ path: endpoint, method: 'GET', query })
    const check = { name, timestamp: new Date().toISOString(), path: endpoint, query, ok: result.ok, status: result.status, data: result.data, error: result.err?.message }
    checks.push(check)
    fs.writeFileSync(path.join(__dirname, 'evidence/live-results.json'), JSON.stringify(checks, null, 2) + '\n')
    assert.equal(result.status, status, `${name}: ${result.err?.message || 'unexpected HTTP status'}`)
    assert.equal(result.ok, status === 200)
    if (status === 200) {
      assert.ok(Array.isArray(result.data.data))
      assert.equal(result.data.data.length, 2)
      assert.ok(result.data.meta)
      assert.ok(result.data.links)
      for (const record of result.data.data) for (const value of Object.values(record)) assert.equal(typeof value, 'string')
    } else {
      assert.equal(result.data.error, 'Invalid Query Param')
      assert.match(result.data.message, /invalid_field/)
    }
    console.log(`${name}: HTTP ${result.status}, ${status === 200 ? result.data.data.length + ' records' : result.data.error}`)
  }
  for (const name of ['DebtToPenny', 'AvgInterestRate']) {
    const records = await client[name]().list({ sort: '-record_date', page_size: 2 })
    assert.equal(records.length, 2)
    const data = records.map(record => record.data())
    for (const record of data) assert.equal(typeof record.record_date, 'string')
    checks.push({ name: `entity-${name}`, timestamp: new Date().toISOString(), records: data })
    fs.writeFileSync(path.join(__dirname, 'evidence/live-results.json'), JSON.stringify(checks, null, 2) + '\n')
    console.log(`${name}.list(): ${records.length} real records`)
  }
}

main().catch(error => { console.error(error); process.exitCode = 1 })

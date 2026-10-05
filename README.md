# Treasury Fiscal Data SDK

An unofficial TypeScript SDK for two public US Treasury Fiscal Data endpoints, generated with [Voxgig's SDK generator](https://voxgig.com/sdk/). No account or API key is needed.

| Method | Treasury endpoint |
| --- | --- |
| `DebtToPenny().list()` | `/v2/accounting/od/debt_to_penny` |
| `AvgInterestRate().list()` | `/v2/accounting/od/avg_interest_rates` |

This is a small evaluation SDK, not full Treasury API coverage. It is not affiliated with or endorsed by the US Treasury.

## Install from source

The package has not been published to npm. Clone and build it locally. The evaluation used Node 24.19.0 and npm 11.9.0.

```sh
git clone https://github.com/himanshu748/treasury-fiscal-data-sdk.git
cd treasury-fiscal-data-sdk/ts
npm ci
npm run build
cd ..
```

To use it in another Node project, install this repository's `ts` directory with `npm install /path/to/treasury-fiscal-data-sdk/ts`. Then import `{ TreasuryFiscalDataSDK }` from `treasury-fiscal-data-sdk`.

## Read data

Run this example from the repository root as a `.cjs` file:

```js
const { TreasuryFiscalDataSDK } = require('./ts')
const client = new TreasuryFiscalDataSDK()

async function main() {
  const debt = await client.DebtToPenny().list({
    filter: 'record_date:gte:2026-01-01',
    sort: '-record_date',
    page_number: 1,
    page_size: 2,
  })
  console.log(debt.map(record => record.data()))

  const rates = await client.AvgInterestRate().list({
    sort: '-record_date',
    page_size: 2,
  })
  console.log(rates.map(record => record.data()))
}

main().catch(console.error)
```

List methods return entity objects. Call `.data()` for each Treasury record. Amounts and rates remain strings, as returned by Treasury.

### Query names

The entity methods use `field`, `filter`, `sort`, `page_number` and `page_size`. `field` maps to Treasury's `fields`; the two page options map to `page[number]` and `page[size]`. Set `field: 'record_date'` to select that column.

The SDK does not fetch every page automatically. Use `direct()` for the full response, including Treasury's `meta` and `links`:

```js
const result = await client.direct({
  path: '/v2/accounting/od/debt_to_penny',
  method: 'GET',
  query: { fields: 'record_date', sort: '-record_date', 'page[size]': 2 },
})

if (!result.ok) {
  console.error(result.status, result.data, result.err)
} else {
  console.log(result.data.data, result.data.meta, result.data.links)
}
```

Direct calls use Treasury's wire query names. HTTP errors return `ok: false`, the HTTP status and response data. Network failures return `ok: false` with `err`. An invalid field was checked against the live API and returned HTTP 400.

## Tests and report

```sh
(cd ts && npm test)
node --test evaluation/transport.test.cjs
node evaluation/live.cjs
```

The first two commands are offline. The last makes small read-only calls to Treasury and refreshes the saved live results.

Recorded results: 205 generated tests passed, one optional cost-feature test was skipped and eight additional transport tests passed. Live checks covered both endpoints, filters, sorting, pagination and an HTTP 400 response.

- [Short experience report](evaluation/report.md)
- [Verification commands, versions and evidence](evaluation/verification.md)
- [Additional tests](evaluation/transport.test.cjs)
- [Generated TypeScript guide](ts/README.md)

## Generator input and regeneration

The input is a small [OpenAPI 3.0.3 description](openapi/treasury.json), authored from [Treasury's documentation](https://fiscaldata.treasury.gov/api-documentation/) and real response shapes. It is not a Treasury-published OpenAPI specification.

The SDK runtime, entity methods and generated tests were produced by the official Voxgig generator. Its model, templates and lockfile are included under `.sdk/`.

```sh
(cd .sdk && npm ci && npm run generate)
(cd ts && npm ci && npm run build && npm test)
```

The initial scaffold used `@voxgig/sdkgen@0.30.6`. Installed generator versions and the full scaffold command are in the verification appendix. The SDK runtime source was left unchanged; this README was edited for the evaluation.

## License and scope

MIT. Upstream copyright notices are retained. [AUTHORSHIP.md](AUTHORSHIP.md) records Himanshu Kumar's original specification, configuration, tests and report.

This evaluation covers two read endpoints. Automatic pagination, optional retry features and other Treasury endpoints have not been evaluated. AI assisted with research, generation, testing and writing; Himanshu chose the API and approved the plan. The agent ran the recorded checks.

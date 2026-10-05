# Treasury Fiscal Data SDK evaluation

## Purpose and scope

Generate a small, MIT-licensed TypeScript client with the official Voxgig SDK generator and evaluate the developer experience. The agreed API is Treasury Fiscal Data. The SDK will cover only these read-only JSON endpoints:

- GET `/v2/accounting/od/debt_to_penny`
- GET `/v2/accounting/od/avg_interest_rates`

This is a two-endpoint evaluation, not a complete Treasury API client. No login, API key or payment is required. Publication and submission to Voxgig remain separate review steps.

## Structure and behavior

A locally authored OpenAPI 3.0 description will encode the two endpoints using Treasury's official documentation and observed responses. It will preserve the `data`, `meta` and `links` response envelope and string-valued records, including any literal `"null"` values. It will describe `fields`, `filter`, `sort`, `page[number]` and `page[size]` query parameters without implementing an additional query-building interface.

Voxgig's official scaffold and TypeScript target will generate the client, offline tests and documentation. The generator model is the source of truth. Corrections will live in the input description or supported model overlay, never in generated SDK source. No extra languages, CLI, MCP server, account setup or custom application will be added.

## Verification and deliverable

Run the generated TypeScript build and offline tests, including documentation examples, and the generator's drift check. Add narrowly scoped transport checks for endpoint paths, filter/sort/pagination encoding, response envelopes and HTTP 400 error handling. Verify both endpoints with small live reads and verify an invalid field request. Record failures and omissions instead of describing an incomplete check as passing.

The local deliverable will contain the input description, reproducible generator configuration, generated TypeScript client, validation evidence and a short developer-experience report. The SDK copyright will name Himanshu Kumar, with upstream notices retained. The report will disclose AI assistance and distinguish agent-observed results from Himanshu's own review.

## Time and stopping condition

Richard's brief says: "Please time-box the human work to 30 minutes maximum." Himanshu should record active human review/work time and stop at 30 minutes even if something is unfinished. Agent elapsed time will be logged separately; it will not be represented as human time. No separate unlimited-agent-work commitment is assumed.

Implementation stops once this small scope is generated, checked and documented, or a blocker cannot be resolved within the agreed evaluation scope. Incomplete work and the stopping point will be reported honestly.

## Sources

- [Treasury API documentation](https://fiscaldata.treasury.gov/api-documentation/)
- [Average Interest Rates dataset](https://fiscaldata.treasury.gov/datasets/average-interest-rates-treasury-securities/)
- [Voxgig generator](https://voxgig.com/sdk)
- [Voxgig SDK catalogue](https://github.com/orgs/voxgig-sdk/repositories)

Catalogue searches for Treasury, Fiscal Data, national debt and the API hostname found no matching SDK on 5 October 2026. This is a search result, not provider approval or an absolute guarantee against differently named coverage.

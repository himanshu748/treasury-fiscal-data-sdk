# Treasury SDK implementation plan

Goal: Generate and evaluate a small MIT-licensed TypeScript SDK with Voxgig's official generator.

Architecture: An authored OpenAPI 3.0 description covers the agreed two Treasury GET endpoints. Voxgig generates the SDK, model, offline tests and documentation. Separate evaluation tests and a report verify the generated behavior without replacing it with a handwritten client.

Stack: Node 24.19.0, npm 11.9.0, `@voxgig/create-sdkgen@0.30.6`, and the toolchain versions installed by that scaffold.

Design: `../specs/2026-10-05-treasury-sdk-design.md`

## Constraints

- Only `/v2/accounting/od/debt_to_penny` and `/v2/accounting/od/avg_interest_rates`, with JSON GET requests
- Query parameters: `fields`, `filter`, `sort`, `page[number]`, `page[size]`
- Preserve the `data`, `meta`, `links` envelope and string-valued records
- Correct the input description or supported model overlay, never generated SDK source
- SDK copyright: Himanshu Kumar; retain upstream notices and disclose AI assistance
- Human work stops at 30 active minutes; agent elapsed time is recorded separately
- No publication, client submission, account setup, payment or additional output surfaces

## Review focus

Tests will cover bracketed pagination/query encoding, literal `"null"` strings, empty successful data, HTTP 400 responses and transport failures. The report will name unsupported or untested behavior.

## 1. Generate and verify the SDK

Files: `openapi/treasury.json`, generated `.sdk/` and `ts/`, `evaluation/transport.test.cjs`, `evaluation/evidence/`

Interface: The generated `TreasuryFiscalDataSDK` constructor and its documented `direct({path, method, query})` request method. Results must retain the documented response/error behavior. Generated semantic-entity behavior is checked by its own offline suite.

- [ ] Write transport tests first: assert both GET paths, exact decoded query values, unchanged string records and envelope metadata, an empty `data` array, the documented HTTP 400 behavior, and a surfaced network failure
- [ ] Run `node --test evaluation/transport.test.cjs`; verify it fails because the SDK has not been generated
- [ ] Author the OpenAPI input from official Treasury documentation; scaffold with `npm create @voxgig/sdkgen@0.30.6 -- treasury-fiscal-data -d ./openapi/treasury.json -o . -t ts -f test`
- [ ] Put author/repository decisions in `.sdk/model/project.aontu`; the verified GitHub owner is `himanshu748`, and the repository remains unpublished
- [ ] Run `(cd .sdk && npm run generate)`; inspect generated names, warnings and model mappings
- [ ] Run `(cd ts && npm install && npm run build && npm test)`, then the transport tests and `(cd .sdk && npx voxgig-sdkgen doctor)`; keep outputs as evidence
- [ ] If a check fails, make one scoped input/model correction, regenerate and recheck; record an unresolved generator issue rather than expanding into generator development
- [ ] Make a local checkpoint commit only

## 2. Verify live behavior and report

Files: `evaluation/live.cjs`, `evaluation/evidence/`, `evaluation/report.md`, `evaluation/time-log.md`

Interface: The same generated SDK and two endpoint paths from task 1; no alternate HTTP client is used to claim SDK success.

- [ ] Use the generated client for small live reads of both endpoints, a filtered/sorted/paged request, and an invalid-field request
- [ ] Record actual status, response shape, validation commands and any mismatch; do not assert fixed current values or intentionally exhaust rate limits
- [ ] Regenerate once more and inspect the diff, then rerun affected checks and `doctor`
- [ ] Write a short DX report: API choice, commands/versions, successful checks, problems, recommendations, limitations and AI disclosure
- [ ] Log research, planning and implementation agent elapsed time separately; mark human time as unmeasured until Himanshu supplies it
- [ ] Commit the local deliverable and present it for review; keep publication and submission pending

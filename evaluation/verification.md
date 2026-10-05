# Treasury SDK verification appendix

Date: 5 October 2026. This is an AI-assisted evaluation approved by Himanshu Kumar. Results below were observed by the agent. Himanshu reports completing design and direction within 15 minutes and giving final approval.

## What was built

An unofficial TypeScript SDK covering two read-only Treasury Fiscal Data endpoints: Debt to the Penny and Average Interest Rates. The small OpenAPI 3.0.3 input was authored from [Treasury's documentation](https://fiscaldata.treasury.gov/api-documentation/) and real response shapes. No provider-published OpenAPI description was found in the sources checked. Catalogue searches found no matching Voxgig SDK for this API.

The SDK source, entity methods, offline tests and documentation were produced by the official Voxgig generator. Commands:

```sh
npm create --yes @voxgig/sdkgen@0.30.6 -- treasury-fiscal-data -d ./openapi/treasury.json -o . -t ts -f test
cd .sdk && npm run generate
cd ../ts && npm install && npm run build && npm test
cd .. && node --test evaluation/transport.test.cjs
node evaluation/live.cjs
cd .sdk && npx voxgig-sdkgen doctor
```

Node was 24.19.0; npm was 11.9.0. Installed Voxgig versions: create-sdkgen 0.30.6, sdkgen 4.34.0, apidef 8.22.1, model 12.0.0 and docgen 0.30.1. Lockfiles and the input/model are included.

## Verified results

- TypeScript build passed
- Generated suite: 206 tests, 205 passed, 1 skipped, 0 failed. The skip is the cost-feature test because that optional feature was not selected
- Generated documentation-example checks passed
- Eight additional transport checks passed: both paths and query encoding, string/envelope preservation, empty data, HTTP 400, network errors and both entity mappings
- Live generated-client calls passed for both endpoints, a filtered/sorted second page, and an invalid-field HTTP 400 response
- Both generated entity methods returned two real records: `DebtToPenny().list()` and `AvgInterestRate().list()`
- The recorded drift check passed before the publication README edit. A second generation left TypeScript output unchanged; the compiled model gained derived name metadata. Final build/test results are included as evidence
- A focused independent read-only review found no blocking issue and confirmed the evidence, upstream notices, authorship and AI disclosure. It did not repeat network calls

The entity interface normalizes Treasury's query names: `field` maps to `fields`, and `page_number`/`page_size` map to `page[number]`/`page[size]`. Entity lists extract `body.data`; use the generated `direct()` method when the full `meta`/`links` envelope is needed. Numeric-looking Treasury values remain strings.

## Recorded generator findings

1. The scaffold-to-build path was short and worked with one TypeScript target plus the offline test feature. The included tests and runnable documentation examples were useful checks before network access.
2. Generation succeeded but emitted `require-missing` warnings for `ReadmeFeatures_ts` and `AgentGuide_ts`. The corresponding documents and tests still worked. Explain whether these are optional components, or avoid warning at that level when their absence is expected.
3. The model's author setting correctly put Himanshu Kumar in the package manifest, but generated `LICENSE` files still name Voxgig. Their copyright is hardcoded independently of that author setting. Make attribution consistent for externally maintained SDKs while retaining upstream notices. This evaluation keeps generated license/runtime notices intact and identifies Himanshu's original additions in `AUTHORSHIP.md`.
4. Make wire-name normalization conspicuous in quickstarts, especially `field` versus `fields` and bracketed pagination names. The mapping worked, but a consumer coming from Treasury's docs may initially use the wire names with an entity method.

An initial npm cache failure was an environment issue: the default cache directory was unavailable. A cache under `/tmp` resolved it. That is not reported as a Voxgig defect.

## Limits and stopping point

This is a two-endpoint evaluation, not complete Treasury API coverage or a production-readiness claim. Authentication is unnecessary for these endpoints and was not evaluated. Automatic pagination, optional retry/rate-limit/cost features, other languages were not tested. The package has not been published to npm. No API account, key, payment or client submission was made during the evaluation.

Himanshu selected the API, designed and directed the evaluation, and gave final approval. He reports completing design and direction within 15 minutes. AI handled implementation with the Voxgig generator, verification and polishing of the documentation and report. The agreed maximum is 30 minutes of active human work; the separate time log distinguishes self-reported human time from recorded agent elapsed time.

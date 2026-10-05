# Treasury SDK experience report

5 October 2026. AI-assisted report approved by Himanshu Kumar.

Voxgig generated a working TypeScript SDK for two Treasury Fiscal Data endpoints: Debt to the Penny and Average Interest Rates. Both provide public data without an account or API key. Catalogue searches found no matching Voxgig SDK. The project uses the MIT License.

A small OpenAPI description was written from Treasury's docs and real responses, then passed to the official Voxgig generator. The generated SDK source was left unchanged.

## What worked

The build passed. Of 206 generated tests, 205 passed and one was skipped because the optional cost feature wasn't included. Eight extra transport tests passed too.

Live calls checked both endpoints, filters, sorting and pagination. An invalid field returned HTTP 400 with Treasury's error message. Both generated list methods returned real records. Documentation examples passed and the recorded drift check was clean before the README edit.

For example, this generated method returned two debt records:

```js
const records = await client.DebtToPenny().list({ page_size: 2 })
```

## What could be clearer

- Generation warned about two missing documentation components, although the documents and their examples still worked. Explain whether those components are optional.
- The package correctly names Himanshu as author, but generated LICENSE files still name Voxgig. The author setting should also guide copyright attribution. Upstream notices were retained; AUTHORSHIP.md records Himanshu's spec, configuration, tests and report.
- Make query-name changes easier to spot. Treasury uses page[size] and fields; the entity methods use page_size and field. These mappings worked in the tests and live calls.

Coverage is limited to these two read endpoints. Authentication, automatic pagination and optional retry features still need separate checks.

Himanshu designed and directed the evaluation, reporting that this work took no more than 15 minutes, and gave final approval. AI handled implementation with the Voxgig generator, verification and polishing of the documentation and report. The recorded checks were run by an agent. The human time is self-reported; the brief limits active human work to 30 minutes.

Commands, versions and evidence are in [the verification appendix](verification.md).

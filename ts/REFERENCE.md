# TreasuryFiscalData TypeScript SDK Reference

Complete API reference for the TreasuryFiscalData TypeScript SDK.


## TreasuryFiscalDataSDK

### Constructor

```ts
new TreasuryFiscalDataSDK(options?: object)
```

Create a new SDK client instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `options` | `object` | SDK configuration options. |
| `options.base` | `string` | Base URL for API requests. |
| `options.prefix` | `string` | URL prefix appended after base. |
| `options.suffix` | `string` | URL suffix appended after path. |
| `options.headers` | `object` | Custom headers for all requests. |
| `options.feature` | `object` | Feature configuration. |
| `options.system` | `object` | System overrides (e.g. custom fetch). |


### Static Methods

#### `TreasuryFiscalDataSDK.test(testopts?, sdkopts?)`

Create a test client with mock features active.

```ts
const client = TreasuryFiscalDataSDK.test()
```

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `testopts` | `object` | Test feature options. |
| `sdkopts` | `object` | Additional SDK options merged with test defaults. |

**Returns:** `TreasuryFiscalDataSDK` instance in test mode.


### Instance Methods

#### `AvgInterestRate(data?: object)`

Create a new `AvgInterestRate` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `AvgInterestRateEntity` instance.

#### `DebtToPenny(data?: object)`

Create a new `DebtToPenny` entity instance.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `data` | `object` | Initial entity data. |

**Returns:** `DebtToPennyEntity` instance.

#### `options()`

Return a deep copy of the current SDK options.

**Returns:** `object`

#### `utility()`

Return a copy of the SDK utility object.

**Returns:** `object`

#### `direct(fetchargs?: object)`

Make a direct HTTP request to any API endpoint.

**Parameters:**

| Name | Type | Description |
| --- | --- | --- |
| `fetchargs.path` | `string` | URL path with optional `{param}` placeholders. |
| `fetchargs.method` | `string` | HTTP method (default: `GET`). |
| `fetchargs.params` | `object` | Path parameter values for `{param}` substitution. |
| `fetchargs.query` | `object` | Query string parameters. |
| `fetchargs.headers` | `object` | Request headers (merged with defaults). |
| `fetchargs.body` | `any` | Request body (objects are JSON-serialized). |
| `fetchargs.ctrl` | `object` | Control options (e.g. `{ explain: true }`). |

**Returns:** `Promise<{ ok, status, headers, data } | Error>`

#### `prepare(fetchargs?: object)`

Prepare a fetch definition without sending the request. Accepts the
same parameters as `direct()`.

**Returns:** `Promise<{ url, method, headers, body } | Error>`

#### `tester(testopts?, sdkopts?)`

Alias for `TreasuryFiscalDataSDK.test()`.

**Returns:** `TreasuryFiscalDataSDK` instance in test mode.


---

## AvgInterestRateEntity

```ts
const avg_interest_rate = client.AvgInterestRate()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `avg_interest_rate_amt` | `string` | No | Average Interest Rate Amount |
| `record_calendar_day` | `string` | No | Calendar Day Number |
| `record_calendar_month` | `string` | No | Calendar Month Number |
| `record_calendar_quarter` | `string` | No | Calendar Quarter Number |
| `record_calendar_year` | `string` | No | Calendar Year |
| `record_date` | `string` | No | Record Date |
| `record_fiscal_quarter` | `string` | No | Fiscal Quarter Number |
| `record_fiscal_year` | `string` | No | Fiscal Year |
| `security_desc` | `string` | No | Security Description |
| `security_type_desc` | `string` | No | Security Type Description |
| `src_line_nbr` | `string` | No | Source Line Number |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.AvgInterestRate().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `AvgInterestRateEntity` instance with the same client and
options.

#### `client()`

Return the parent `TreasuryFiscalDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## DebtToPennyEntity

```ts
const debt_to_penny = client.DebtToPenny()
```

### Fields

| Field | Type | Required | Description |
| --- | --- | --- | --- |
| `debt_held_public_amt` | `string` | No | Debt Held by the Public |
| `intragov_hold_amt` | `string` | No | Intragovernmental Holdings |
| `record_calendar_day` | `string` | No | Calendar Day Number |
| `record_calendar_month` | `string` | No | Calendar Month Number |
| `record_calendar_quarter` | `string` | No | Calendar Quarter Number |
| `record_calendar_year` | `string` | No | Calendar Year |
| `record_date` | `string` | No | Record Date |
| `record_fiscal_quarter` | `string` | No | Fiscal Quarter Number |
| `record_fiscal_year` | `string` | No | Fiscal Year |
| `src_line_nbr` | `string` | No | Source Line Number |
| `tot_pub_debt_out_amt` | `string` | No | Total Public Debt Outstanding |

### Operations

#### `list(match: object, ctrl?: object)`

List entities matching the given criteria. Returns an array.

```ts
const results = await client.DebtToPenny().list()
```

### Common Methods

#### `data(data?: object)`

Get or set the entity data. When called with data, sets the entity's
internal data and returns the current data. When called without
arguments, returns a copy of the current data.

#### `match(match?: object)`

Get or set the entity match criteria. Works the same as `data()`.

#### `make()`

Create a new `DebtToPennyEntity` instance with the same client and
options.

#### `client()`

Return the parent `TreasuryFiscalDataSDK` instance.

#### `entopts()`

Return a copy of the entity options.


---

## Features

| Feature | Version | Description |
| --- | --- | --- |
| `test` | 0.0.1 | Test transport |


Features are activated via the `feature` option:

```ts
const client = new TreasuryFiscalDataSDK({
  feature: {
    test: { active: true },
  }
})
```


### Configuring features

Each feature is inactive until switched on, and an SDK with no feature
configured does no feature work at all. Every option below keeps its default
unless you name it.

The array form of \`feature\` is significant: several features wrap the
transport, and the order you list them in is the order they nest.

#### `test`

Test transport.

**Configuration**

| Option | Default |
|---|---|
| `active` | `false` |

| Option | Type |
|---|---|
| `entity` | map |
| `net` | map |

These take no default: the feature behaves one way when you supply them and
another when you do not.

**Usage**

Set `feature.test.active` to true in the client options, and override any option above in the same entry. Every option keeps
its default unless you name it.

**Considerations**

- Attaches to pipeline hooks, not the transport, so activation order does
  not change what it observes.
- Installs the BASE transport that the wrapping features wrap, so it must be
  activated before them.
- Inactive by default: leaving it out costs nothing at runtime.


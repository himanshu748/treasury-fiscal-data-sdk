"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_path_1 = __importDefault(require("node:path"));
const Fs = __importStar(require("node:fs"));
const node_test_1 = require("node:test");
const node_assert_1 = __importDefault(require("node:assert"));
const live_runner_1 = require("../../live-runner");
const live_entity_1 = require("../../live-entity");
const __1 = require("../../..");
const utility_1 = require("../../utility");
(0, utility_1.loadEnvLocal)(__dirname + '/../../../.env.local');
(0, node_test_1.describe)('DebtToPennyEntity', async () => {
    // Per-test live pacing. Delay is read from sdk-test-control.json's
    // `test.live.delayMs`; only sleeps when TREASURY_FISCAL_DATA_TEST_LIVE=TRUE.
    (0, node_test_1.afterEach)((0, utility_1.liveDelay)('TREASURY_FISCAL_DATA_TEST_LIVE'));
    (0, node_test_1.test)('instance', async () => {
        const testsdk = __1.TreasuryFiscalDataSDK.test();
        const ent = testsdk.DebtToPenny();
        (0, node_assert_1.default)(null != ent);
    });
    (0, node_test_1.test)('basic', async (t) => {
        const live = 'TRUE' === process.env.TREASURY_FISCAL_DATA_TEST_LIVE;
        for (const op of ['list']) {
            if (!live && (0, utility_1.maybeSkipControl)(t, 'entityOp', 'debt_to_penny.' + op, live))
                return;
        }
        const setup = basicSetup();
        if (setup.live) {
            return (0, live_entity_1.runLiveEntity)(setup, { "active": true, "alias": { "field": {} }, "fields": { "debt_held_public_amt": { "a": true, "h": "Debt Held Public Amt", "n": "debt_held_public_amt", "r": false, "sh": "Debt Held by the Public", "t": "`$STRING`", "key$": "debt_held_public_amt", "index$": 0 }, "intragov_hold_amt": { "a": true, "h": "Intragov Hold Amt", "n": "intragov_hold_amt", "r": false, "sh": "Intragovernmental Holdings", "t": "`$STRING`", "key$": "intragov_hold_amt", "index$": 1 }, "record_calendar_day": { "a": true, "h": "Record Calendar Day", "n": "record_calendar_day", "r": false, "sh": "Calendar Day Number", "t": "`$STRING`", "key$": "record_calendar_day", "index$": 2 }, "record_calendar_month": { "a": true, "h": "Record Calendar Month", "n": "record_calendar_month", "r": false, "sh": "Calendar Month Number", "t": "`$STRING`", "key$": "record_calendar_month", "index$": 3 }, "record_calendar_quarter": { "a": true, "h": "Record Calendar Quarter", "n": "record_calendar_quarter", "r": false, "sh": "Calendar Quarter Number", "t": "`$STRING`", "key$": "record_calendar_quarter", "index$": 4 }, "record_calendar_year": { "a": true, "h": "Record Calendar Year", "n": "record_calendar_year", "r": false, "sh": "Calendar Year", "t": "`$STRING`", "key$": "record_calendar_year", "index$": 5 }, "record_date": { "a": true, "fo": "date", "h": "Record Date", "n": "record_date", "r": false, "sh": "Record Date", "t": "`$STRING`", "key$": "record_date", "index$": 6 }, "record_fiscal_quarter": { "a": true, "h": "Record Fiscal Quarter", "n": "record_fiscal_quarter", "r": false, "sh": "Fiscal Quarter Number", "t": "`$STRING`", "key$": "record_fiscal_quarter", "index$": 7 }, "record_fiscal_year": { "a": true, "h": "Record Fiscal Year", "n": "record_fiscal_year", "r": false, "sh": "Fiscal Year", "t": "`$STRING`", "key$": "record_fiscal_year", "index$": 8 }, "src_line_nbr": { "a": true, "h": "Src Line Nbr", "n": "src_line_nbr", "r": false, "sh": "Source Line Number", "t": "`$STRING`", "key$": "src_line_nbr", "index$": 9 }, "tot_pub_debt_out_amt": { "a": true, "h": "Tot Pub Debt Out Amt", "n": "tot_pub_debt_out_amt", "r": false, "sh": "Total Public Debt Outstanding", "t": "`$STRING`", "key$": "tot_pub_debt_out_amt", "index$": 10 } }, "name": "debt_to_penny", "op": { "list": { "input": "data", "name": "list", "points": [{ "a": true, "co": { "id": "GET /v2/accounting/od/debt_to_penny", "source": "openapi3", "version": 2 }, "g": { "query": [{ "a": true, "k": "query", "n": "field", "or": "fields", "r": false, "t": "`$STRING`", "index$": 0 }, { "a": true, "k": "query", "n": "filter", "or": "filter", "r": false, "t": "`$STRING`", "index$": 1 }, { "a": true, "ex": 1, "k": "query", "n": "page_number", "or": "page[number]", "r": false, "t": "`$INTEGER`", "index$": 2 }, { "a": true, "ex": 100, "k": "query", "n": "page_size", "or": "page[size]", "r": false, "t": "`$INTEGER`", "index$": 3 }, { "a": true, "k": "query", "n": "sort", "or": "sort", "r": false, "t": "`$STRING`", "index$": 4 }] }, "k": "http", "m": "GET", "o": "/v2/accounting/od/debt_to_penny", "q": { "exist": ["field", "filter", "page_number", "page_size", "sort"] }, "r": {}, "s": [{ "lit": "v2" }, { "lit": "accounting" }, { "lit": "od" }, { "lit": "debt_to_penny" }], "t": { "req": "`reqdata`", "res": "`body.data`" }, "index$": 0 }], "key$": "list" } }, "relations": { "ancestors": [] }, "key$": "debt_to_penny", "name__orig": "debt_to_penny", "Name": "DebtToPenny", "name_": "debt_to_penny", "name-": "debt-to-penny", "NAME": "DEBT_TO_PENNY", "index$": 1 }, { "active": true, "entity": "debt_to_penny", "key$": "BasicDebtToPennyFlow", "kind": "basic", "name": "BasicDebtToPennyFlow", "param": {}, "step": [{ "a": true, "d": {}, "i": {}, "m": {}, "o": "list", "s": [], "v": [{ "apply": "ItemExists", "def": { "ref": "debt_to_penny_ref01" } }] }] }, 'DebtToPenny', { "GET /v2/accounting/od/debt_to_penny": { "protocol": "http", "parameters": [{ "name": "fields", "in": "query", "required": false, "description": "Comma-separated fields. Selecting fields can trigger aggregation; see Treasury documentation.", "schema": { "type": "string" }, "index$": 0 }, { "name": "filter", "in": "query", "required": false, "description": "Treasury filter expression, such as record_date:gte:2026-01-01.", "schema": { "type": "string" }, "index$": 1 }, { "name": "sort", "in": "query", "required": false, "description": "Comma-separated fields; a leading minus reverses order.", "schema": { "type": "string" }, "index$": 2 }, { "name": "page[number]", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 1 }, "index$": 3 }, { "name": "page[size]", "in": "query", "required": false, "schema": { "type": "integer", "minimum": 1, "default": 100 }, "index$": 4 }] } });
        }
        const client = setup.client;
        const struct = setup.struct;
        const isempty = struct.isempty;
        const select = struct.select;
        let debt_to_penny_ref01_data = Object.values(setup.data.existing.debt_to_penny)[0];
        // LIST
        const debt_to_penny_ref01_ent = client.DebtToPenny();
        const debt_to_penny_ref01_match = {};
        const debt_to_penny_ref01_list = (await debt_to_penny_ref01_ent.list(debt_to_penny_ref01_match)).map((e) => e.data());
    });
});
function basicSetup(extra) {
    // TODO: fix test def options
    const options = {}; // null
    // TODO: needs test utility to resolve path
    const entityDataFile = node_path_1.default.resolve(__dirname, '../../../../.sdk/test/entity/debt_to_penny/DebtToPennyTestData.json');
    // TODO: file ready util needed?
    const entityDataSource = Fs.readFileSync(entityDataFile).toString('utf8');
    // TODO: need a xlang JSON parse utility in voxgig/struct with better error msgs
    const entityData = JSON.parse(entityDataSource);
    options.entity = entityData.existing;
    let client = __1.TreasuryFiscalDataSDK.test(options, extra);
    const struct = client.utility().struct;
    const merge = struct.merge;
    const transform = struct.transform;
    let idmap = transform(['debt_to_penny01', 'debt_to_penny02', 'debt_to_penny03'], {
        '`$PACK`': ['', {
                '`$KEY`': '`$COPY`',
                '`$VAL`': ['`$FORMAT`', 'upper', '`$COPY`']
            }]
    });
    const env = (0, utility_1.envOverride)({
        'TREASURY_FISCAL_DATA_TEST_DEBT_TO_PENNY_ENTID': idmap,
        'TREASURY_FISCAL_DATA_TEST_LIVE': 'FALSE',
        'TREASURY_FISCAL_DATA_TEST_EXPLAIN': 'FALSE',
    });
    idmap = env['TREASURY_FISCAL_DATA_TEST_DEBT_TO_PENNY_ENTID'];
    const live = 'TRUE' === env.TREASURY_FISCAL_DATA_TEST_LIVE;
    const transport = (0, live_runner_1.createLiveTransport)();
    if (live) {
        const rawIds = process.env['TREASURY_FISCAL_DATA_TEST_DEBT_TO_PENNY_ENTID'];
        idmap = rawIds && rawIds.trim() ? JSON.parse(rawIds) : {};
        if (!idmap || Array.isArray(idmap) || typeof idmap !== 'object') {
            throw new Error('Live ENTID must be a JSON object');
        }
        client = new __1.TreasuryFiscalDataSDK(merge([
            // FIRST, so the generated fields below win: sdk-test-control.json's
            // test.client.options adds to the live client, it does not redirect it.
            (0, utility_1.liveClientOptions)(),
            {},
            // 'extra || {}', not a bare 'extra': struct.merge returns UNDEFINED when the
            // last entry is undefined, and basicSetup is normally called with no
            // argument at all - so a bare 'extra' silently discarded the apikey
            // and server values above and handed the SDK undefined. Harmless
            // while there was nothing in that object; not harmless now.
            extra || {},
            { system: { fetch: transport.fetch } }
        ]));
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
    };
    return setup;
}
//# sourceMappingURL=DebtToPennyEntity.test.js.map

import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { TreasuryFiscalDataSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = TreasuryFiscalDataSDK.test()
    equal(testsdk instanceof TreasuryFiscalDataSDK, true,
      'TreasuryFiscalDataSDK.test() must return a client synchronously')
  })

})

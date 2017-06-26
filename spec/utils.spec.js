/* global describe, it, expect */
'use strict';

const { moneyStrToNum, numToMoneyStr } = require('../lib/utils');

// TODO: more tests
describe('Money utilities', () => {
  it('should return an integer representation of money', () => {
    expect(moneyStrToNum('$1,234.50')).toBe(123450);
    expect(moneyStrToNum('$1,234')).toBe(123400);
  });

  it('should return a string representation of money', () => {
    expect(numToMoneyStr(123450)).toBe('$1,234.50');
    expect(numToMoneyStr(123400)).toBe('$1,234');
  });
});
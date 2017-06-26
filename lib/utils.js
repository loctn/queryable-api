'use strict';

exports.moneyStrToNum = moneyStr => parseFloat(moneyStr.replace(/[$,]/g, '')) * 100;

exports.numToMoneyStr = num => {
  const res = '$' + (num / 100).toLocaleString();
  return res + (res.lastIndexOf('.') === res.length - 2 ? '0' : '');
};
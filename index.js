'use strict';

const mysql = require('mysql');
const express = require('express');
const { moneyStrToNum, numToMoneyStr } = require('../lib/utils');


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'testing',
  password: 'testing',
  database: 'testing'
});

const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/providers', (req, res) => {
  connection.query(buildQuery(req.query), (err, results) => {
    if (err) {
      res.status(400).send('Bad Request');  // TODO: other errors
      console.error(err);
      return;
    }

    const json = results.map(r => ({
      'Provider Name': r.provider_name,
      'Provider Street Address': r.provider_street_address,
      'Provider City': r.provider_city,
      'Provider State': r.provider_state,
      'Provider Zip Code': '' + r.provider_zip_code,
      'Hospital Referral Region Description': r.hospital_referral_region_description,
      'Total Discharges': r.total_discharges,
      'Average Covered Charges': numToMoneyStr(r.average_covered_charges),
      'Average Total Payments': numToMoneyStr(r.average_total_payments),
      'Average Medicare Payments': numToMoneyStr(r.average_medicare_payments)
    }));

    res.json(json);
  });
});

// Builds and sanitizes a DB query
function buildQuery(q) {
  const a = q.max_discharges;
  const b = q.min_discharges;
  const c = q.max_average_covered_charges;
  const d = q.min_average_covered_charges;
  const e = q.max_average_medicare_payments;
  const f = q.min_average_medicare_payments;
  const g = q.state;

  // TODO: better sanitation
  const where = [];
  const u = undefined;
  if (a !== u && a >= 0) where.push('total_discharges <= ' + parseInt(a));
  if (b !== u && b >= 0) where.push('total_discharges >= ' + parseInt(b));
  if (c !== u && c >= 0) where.push('average_covered_charges <= ' + moneyStrToNum(c));
  if (d !== u && d >= 0) where.push('average_covered_charges >= ' + moneyStrToNum(d));
  if (e !== u && e >= 0) where.push('average_medicare_payments <= ' + moneyStrToNum(e));
  if (f !== u && f >= 0) where.push('average_medicare_payments >= ' + moneyStrToNum(f));
  if (g) where.push('state = ' + g.substr(0, 2));

  return `
    SELECT
      provider_name,
      provider_street_address,
      provider_city,
      provider_state,
      provider_zip_code,
      hospital_referral_region_description,
      total_discharges,
      average_covered_charges,
      average_total_payments,
      average_medicare_payments
    FROM
      testing
    WHERE
      ${where.join(' AND ')}
  `;
}

app.listen(8080, () => {
  console.log('Listening on 8080...');
});
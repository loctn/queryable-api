'use strict';

const fs = require('fs');
const byline = require('byline');
const mysql = require('mysql');
const { moneyStrToNum } = require('../lib/utils');


const stream = byline(fs.createReadStream('data/Inpatient_Prospective_Payment_System__IPPS__Provider_Summary_for_the_Top_100_Diagnosis-Related_Groups__DRG__-_FY2011.csv', {
  encoding: 'utf8'  // make sure data is UTF-8
}));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'testing',
  password: 'testing',
  database: 'testing'
});

let row = 0;

stream.on('data', function(line) {
  stream.pause();

  if (row % 1000 === 0) console.log(row);
  row++;
  if (row === 1) return stream.resume();  // skip first row (headings)

  const query = `
    INSERT INTO testing
      (
        drg_definition,
        provider_id,
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
      )
    VALUES
      (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const r = line.split(',');
  if (r.length !== 12) return stream.resume();

  let params = [
    r[0],
    parseInt(r[1]),
    r[2],
    r[3],
    r[4],
    r[5],
    parseInt(r[6]),
    r[7],
    parseInt(r[8]),
    moneyStrToNum(r[9]),
    moneyStrToNum(r[10]),
    moneyStrToNum(r[11])
  ];

  connection.query(query, params, err => {
    if (err) throw err;
    stream.resume();
  });
});
const fs = require('fs');
const Papa = require('papaparse');

const csv = fs.readFileSync('../../Downloads/us_institution_coverage.csv', 'utf8');

// Skip the comment line at the top
const lines = csv.split('\n');
const dataLines = lines.slice(1).join('\n');

const { data } = Papa.parse(dataLines, { header: true, skipEmptyLines: true });

const clean = data.filter(row => row.institution_id && row.name);

fs.writeFileSync(
  './src/assets/institutions.json',
  JSON.stringify(clean, null, 2)
);

console.log(`Converted ${clean.length} institutions`);

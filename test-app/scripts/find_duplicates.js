const fs = require('fs');
const Papa = require('papaparse');

const csv = fs.readFileSync('./src/assets/us_institution_coverage.csv', 'utf8');
const lines = csv.split('\n');
const dataLines = lines.slice(1).join('\n');
const { data } = Papa.parse(dataLines, { header: true, skipEmptyLines: true });

const institutions = data.filter(row => row.institution_id && row.name);

// Find duplicate names
const nameMap = {};
institutions.forEach(inst => {
    if (!nameMap[inst.name]) {
        nameMap[inst.name] = [];
    }
    nameMap[inst.name].push(inst.institution_id);
});

const duplicates = Object.entries(nameMap)
    .filter(([_, ids]) => ids.length > 1)
    .map(([name, ids]) => ({ name, count: ids.length, ids }));

console.log(`Total institutions: ${institutions.length}`);
console.log(`Duplicate names: ${duplicates.length}`);
console.log('\nDuplicates:');
duplicates.forEach(d => {
    console.log(`  ${d.name}: ${d.count} institutions (${d.ids.join(', ')})`);
});

// Save duplicates to JSON for later use
fs.writeFileSync(
    './src/assets/duplicate_names.json',
    JSON.stringify(duplicates, null, 2)
);

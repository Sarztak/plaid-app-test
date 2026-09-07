const fs = require('fs');
const path = require('path');

const LOGO_DIR = '/home/sleepwalker/Github/plaid-api-test/test-app/src/assets/duplicate_inst_logos';
const OUTPUT = '/home/sleepwalker/Github/plaid-api-test/test-app/src/assets/logoIds.json';

const files = fs.readdirSync(LOGO_DIR).filter(f => f.endsWith('.png'));
const ids = files.map(f => f.replace('.png', ''));

fs.writeFileSync(OUTPUT, JSON.stringify(ids, null, 2));
console.log(`Saved ${ids.length} logo IDs`);

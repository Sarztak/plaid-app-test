const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
require('dotenv').config({ path: '../server/.env' });

const config = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
        },
    },
});

const plaidClient = new PlaidApi(config);

const duplicates = JSON.parse(fs.readFileSync('./src/assets/duplicate_names.json', 'utf8'));

const LOGO_DIR = './src/assets/duplicate_inst_logos';
if (!fs.existsSync(LOGO_DIR)) {
    fs.mkdirSync(LOGO_DIR, { recursive: true });
}

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function fetchMetadata() {
    const metadata = {};

    for (const { name, ids } of duplicates) {
        try {
            const response = await plaidClient.institutionsSearch({
                query: name,
                country_codes: ['US', 'CA'],
                options: { include_optional_metadata: true },
            });

            const institutions = response.data.institutions.map(inst => ({
                institution_id: inst.institution_id,
                name: inst.name,
                logo: inst.logo,
                url: inst.url,
                primary_color: inst.primary_color,
            }));

            let relevant = institutions.filter(inst => ids.includes(inst.institution_id));

            const foundIds = new Set(relevant.map(inst => inst.institution_id));
            const missingIds = ids.filter(id => !foundIds.has(id));

            if (missingIds.length > 0) {
                console.log(`  ↳ Search returned ${relevant.length}/${ids.length}, fetching ${missingIds.length} by ID...`);

                for (const id of missingIds) {
                    try {
                        const byIdResponse = await plaidClient.institutionsGetById({
                            institution_id: id,
                            country_codes: ['US', 'CA'],
                            options: { include_optional_metadata: true },
                        });

                        const inst = byIdResponse.data.institution;
                        relevant.push({
                            institution_id: inst.institution_id,
                            name: inst.name,
                            logo: inst.logo,
                            url: inst.url,
                            primary_color: inst.primary_color,
                        });

                        await wait(500);
                    } catch (err) {
                        console.error(`  ↳ Failed to fetch ${id}: ${err.message}`);
                    }
                }
            }

            // Save logos as resized PNG files and build metadata
            const metadataEntries = [];
            for (const inst of relevant) {
                const entry = {
                    institution_id: inst.institution_id,
                    name: inst.name,
                    url: inst.url,
                    primary_color: inst.primary_color,
                };

                if (inst.logo) {
                    try {
                        const base64Data = inst.logo.replace(/^data:image\/\w+;base64,/, '');
                        const buffer = Buffer.from(base64Data, 'base64');

                        const resized = await sharp(buffer)
                            .resize(64, 64)
                            .png({ quality: 80 })
                            .toBuffer();

                        const filename = `${inst.institution_id}.png`;
                        fs.writeFileSync(path.join(LOGO_DIR, filename), resized);
                        entry.logo = filename;
                    } catch (err) {
                        console.error(`  ↳ Failed to resize logo for ${inst.institution_id}: ${err.message}`);
                    }
                }

                metadataEntries.push(entry);
            }

            if (metadataEntries.length > 0) {
                metadata[name] = metadataEntries;
                console.log(`✓ ${name}: ${metadataEntries.length} institutions with metadata`);
            } else {
                console.log(`✗ ${name}: no matching institutions in search results`);
            }

            await wait(500);
        } catch (err) {
            console.error(`✗ ${name}: ${err.message}`);
        }
    }

    fs.writeFileSync(
        './src/assets/institution_metadata.json',
        JSON.stringify(metadata, null, 2)
    );

    console.log(`\nSaved metadata for ${Object.keys(metadata).length} duplicate names`);
}

fetchMetadata();

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');

puppeteer.use(StealthPlugin());


async function scrapeInstitutions(waitTime = 1000) {
    const browser = await puppeteer.launch({
        headless: true,
        defaultViewport: null,
    });

    const page = await browser.newPage();
    await page.goto('https://plaid.com/docs/institutions/', {
        waitUntil: 'networkidle2',
    });

    const results = [];
    let i = 0;

    while (true) {
        i ++;
        if (i == 3) break
        const currentPageTexts = await page.$$eval(
            '.MuiBox-root.css-yeouz0',
            elements => elements.map(el => el.innerText.trim())
        );

        const label = await page.$eval('button[aria-label^="Page "]', el => el.getAttribute('aria-label'));
        const match = label.match(/Page \d+/);
        if (match) {
            console.log(`Scrapping names from ${match[0]}`);
        }

        results.push(...currentPageTexts);

        const nextButton = await page.$('[aria-label="Go to next page"]');

        if (!nextButton) break;

        const isDisabled = await page.evaluate(
            btn => btn.disabled || btn.getAttribute('aria-disabled') === 'true',
            nextButton
        );

        if (isDisabled) break;

        await nextButton.click();
        await new Promise(resolve => setTimeout(resolve, waitTime));
    }

    await browser.close();
    console.log(results);
    console.log(`${results.length} names collected.`);
}

const waitTime = 1000;
scrapeInstitutions(waitTime);

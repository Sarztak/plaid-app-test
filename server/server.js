/*
the first decision to be taken when requesting the link token is should I pre fetch is when the webpage loads or else when the user clicks the connect button. I can handle error if anything failes before hand, in the UI itself if I prefetch, but it could also mean that I am making request even if the user does not proceed further to link the account. Error handling and testing is quite important from the get go and I should also think about how I want the UI to be since I need to handle two different item creation one for bank and one for investment accounts with multi-link flow enabled for each. Next handle item updates and error handling. UI needs to work in tandem to increase the conversion.
also need to add webhooks, and set up ngrok for that following similar pattern to plaid/pattern example
a DB is also needed, to create user, perhaps authenticate them with email address or mobile number with name. 
do I need to match that name with names in financial institutions, that is do I verify the identify of those linking to the app? what is the standard approach in this case?
how does I write tests for testing these addresses?

*/

/*
    TODO: 
    1. The endpoints are public, before production they need to be secured.
*/
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const app = express();
app.use(express.json());
app.use(cors());

const config = new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV || 'sandbox'],
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
            'PLAID-SECRET': process.env.PLAID_SECRET,
            'Plaid-Version': '2020-09-14',
        },
    },
});

const plaidClient = new PlaidApi(config);

app.post('/api/create_link_token', async (req, res) => {
    try {
        const response = await plaidClient.linkTokenCreate({
            user: {
                client_user_id: 'test-user-123',
            },
            client_name: 'Sandbox Plaid App',
            products: (process.env.PLAID_PRODUCTS || 'auth').split(','),
            country_codes: (process.env.PLAID_COUNTRY_CODES || 'US').split(','),
            language: 'en',
        });
        res.json({ link_token: response.data.link_token })
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'failed to create link token' })
    }
});

app.post('/api/exchange_public_token', async (req, res) => {
    let errorMessage = '';
    try {
        // the request body maybe empty and req.body will fail
        if (!req.body) {
            errorMessage = 'Request body is missing';
        }

        const { public_token } = req.body;

        if (!public_token) {
            errorMessage = 'Missing public_token';
        } else if (typeof public_token !== 'string' || !public_token.startsWith('public-')) {
            errorMessage = 'Invalid public_token format';
        }

        if (errorMessage !== '') {
            return res.status(400).json({ error: errorMessage });
        }

        const response = await plaidClient.itemPublicTokenExchange({
            public_token: public_token
        });

        res.json({
            ok: true,
            item_id: response.data.item_id
        });
    } catch (error) {
        console.error(error.response?.data || error.message);
        res.status(500).json({ error: 'failed to exchange public token' });
    }
});

app.listen(process.env.APP_PORT || 8000, () => {
    console.log(`Server running on port ${process.env.APP_PORT || 800}`)
});


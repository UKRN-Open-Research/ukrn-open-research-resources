exports.handler = main;
require('dotenv').config();
const {
    GOOGLE_SPREADSHEET_ID_FROM_URL,
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    GOOGLE_PRIVATE_KEY
} = process.env;

/* API use script adapted from https://www.swyx.io/netlify-google-sheets/ */
const { GoogleSpreadsheet } = require('google-spreadsheet');

/**
 * Process requests from a client
 * @param event {object} request details
 * @param context {object} environment details
 * @param callback {function(error: string|null, response: HTTPResponse) => void} function to send the response to the client
 */
async function main(event, context, callback) {
    try {
        let sheetData = {};
        console.log(`Fetching Google Sheets content`)

        const doc = new GoogleSpreadsheet(GOOGLE_SPREADSHEET_ID_FROM_URL);
        // https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
        await doc.useServiceAccountAuth({
            client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            private_key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
        });

        await doc.loadInfo(); // loads document properties and worksheets. required.

        const sheet = doc.sheetsByIndex[0]; // you may want to customize this if you have more than 1 sheet

        const rows = await sheet.getRows(); // can pass in { limit, offset }

        sheetData = rows.map(r => serializeRow(sheet, r));

        callback(null, {statusCode: 200, body: JSON.stringify(sheetData)});
    } catch(e) {
        console.error(e);
        callback(e);
    }
}

/*
 * utils
 */
function serializeRow(sheet, row) {
    let temp = {};
    sheet.headerValues.map((header) => {
        temp[header] = row[header];
    });
    return temp;
}
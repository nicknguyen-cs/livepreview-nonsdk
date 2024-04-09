const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();

/**
 * SSR Based Approach. Requires SDK & Utils to re-render html. WIP.
 */
/*

const Stack = require('./Stack.js');
const ContentstackLivePreview = require("@contentstack/live-preview-utils");

ContentstackLivePreview.init({
    enable: true,
    ssr: true,
    stackDetails: {
        apiKey: process.env.API_KEY,
        ssr:true
    }
});

app.use((req, response, next) => {
    Stack.livePreviewQuery(req.query);
    console.log(req.query);
    next();
});

app.use(express.static(path.join(__dirname, 'front-end/build')));
*/


app.use(cors());

let entryUid = process.env.ENTRY_UID;
app.get('/live-preview', async (req, res) => {
    try {
        let url = `https://rest-preview.contentstack.com/v3/content_types/${req.query.content_type_uid}/entries/${entryUid}?live_preview=${req.query.live_preview}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'api_key': process.env.API_KEY,
                'preview_token': process.env.PREVIEW_TOKEN,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json(); // Wait for the JSON data
        res.status(200).json(data); // Send the JSON data back to the client
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong');
    }
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});

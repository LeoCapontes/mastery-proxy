const express = require('express')
const router = express.Router()
const needle = require('needle')
const url = require('url');

// Env vars
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE


router.get('/account/by-riot-id/:region/:name/:tagline', async (req, res) => {
    try{
        const { region, name, tagline } = req.params;
        console.log(url.parse(req.url, true).query)
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
        })
        const apiUrl = `https://${encodeURIComponent(region)}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(name)}/${encodeURIComponent(tagline)}?${params.toString()}`;

        console.log(`Forwarding request to: ${apiUrl}`);

        const apiRes = await needle('get', apiUrl);
        const data = apiRes.body

        res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching data from Riot Games API:', error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
})

router.get('/mastery/by-puuid/:server/:puuid', async (req, res) => {
    try{
        const { server, puuid } = req.params;
        console.log(url.parse(req.url, true).query)
        const params = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
        })
        const apiUrl = `https://${encodeURIComponent(server)}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${encodeURIComponent(puuid)}?${params.toString()}`

        console.log(`Forwarding request to: ${apiUrl}`);

        const apiRes = await needle('get', apiUrl);
        const data = apiRes.body
        res.status(200).json(data)
    } catch (error) {
        console.error('Error fetching data from Riot Games API:', error.message);
        res.status(error.statusCode || 500).json({ error: error.message });
    }
})

module.exports = router


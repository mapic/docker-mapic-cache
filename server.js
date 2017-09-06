
// todo:
// save/retrieve cache pngs
// ensure never down

const express = require('express');

// Constants
const PORT = process.env.MAPIC_CACHE_PORT || 3004;
const HOST = '0.0.0.0';

// App
const app = express();
app.get('/v2/cache', (req, res) => {
    console.log('GET -> /v2/cache')
    res.send('Hello world\n');
});
app.post('/v2/cache', (req, res) => {
    console.log('POST -> /v2/cache')
    res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);

// todo:
// save/retrieve cache pngs
// ensure never down

const express = require('express');
var lodash = require('lodash');
var fs = require('fs');

// Constants
const PORT = 3004;
const HOST = '0.0.0.0';
const MAPIC_FOLDER = '/mapic/cache/';

// App
const app = express();
app.get('/v2/cache', (req, res) => {
    console.log('***************')
    console.log('GET -> /v2/cache')
    console.log('***************')

    console.log('req.query', req.query);

    var tilename = [req.query.layer_id, req.query.z, req.query.x, req.query.y, 'png'].join('.');

    console.log('tilename:', tilename);
    var tilepath = MAPIC_FOLDER + tilename;
    console.log('tilepath:', tilepath);

    fs.readFile(tilepath, function (err, buffer) {
        if (err) console.log('ERROR!', err);

        console.log('readFile buffer size', _.size(buffer));

        // return tile to client
        res.writeHead(200, {'Content-Type': 'image/png'});
        res.end(buffer);
    });

    // read from disk

    res.send('Hello world\n');
});
app.post('/v2/cache', (req, res) => {
    console.log('***************')
    console.log('POST -> /v2/cache')
    console.log('***************')

    console.log('req.query', req.query);

    var tilename = [req.query.layer_id, req.query.z, req.query.x, req.query.y, 'png'].join('.');
    console.log('tilename:', tilename);
    var tilepath = MAPIC_FOLDER + tilename;
    console.log('tilepath:', tilepath);

    var stream = fs.createWriteStream(tilepath);

    // save to disk

    req.on('data', function(data){
        console.log('req on data...');
        console.log('size: ', _.size(data));
        stream.write(data);
    }); 

    req.on('end', function(){
        console.log('req on end');

        console.log('done writing stream @ ', tilepath);

        // debug
        fs.readFile(tilepath, function (err, readfile) {
            console.log('readFile deug: ', err, _.size(readfile));
        });
    });

    res.send('Hello world\n');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);


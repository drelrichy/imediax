const { createServer } = require('https');
const { parse } = require('url');
const next = require('next');
const fs = require('fs');
const port = 3030;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
var privateKey  = fs.readFileSync('/etc/letsencrypt/live/imediaport.com-0001/privkey.pem', 'utf8');
var certificate = fs.readFileSync('/etc/letsencrypt/live/imediaport.com-0001/fullchain.pem', 'utf8');

var  httpsOptions  = {key: privateKey, cert: certificate};

const xhttpsOptions = {
    key: fs.readFileSync('./ssl/privkey.pem'),
    cert: fs.readFileSync('./ssl/privkey.pem')
};



app.prepare().then(() => {
    createServer(httpsOptions, async (req, res) => {
        const parsedUrl = parse(req.url, true);
        await handle(req, res, parsedUrl);
    }).listen(port, (err) => {
        if (err) throw err;
        console.log('ready - started server on url: https://imediaport.com:' + port);
    });
});

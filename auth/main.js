const express = require('express');
const cookieParser = require('cookie-parser');
const redis = require('redis');

const app = express();
app.use(cookieParser());

const client = redis.createClient({url: 'redis://redis'});
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

const port = 3000;

app.get('/', async (req, res) => {
    if (req.cookies && req.cookies.auth) {
        const reply = await client.get(req.cookies.auth);
        if (reply === 'exists') {
            res.status(200).send('200 OK');
            return;
        }
    }
    res.redirect(302, 'http://localhost/sso');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

const express = require('express');
const redis = require('redis');
const app = express();
const port = 3000;

const client = redis.createClient({url: 'redis://redis'});
client.on('error', err => console.log('Redis Client Error', err));
client.connect();

app.get('/sso', (req, res) => {
    // TODO replace with real login or captcha
    res.status(200).send('<form action="/sso" method="post"><input value="login" type="submit"></form>');
});

app.post('/sso', (req, res) => {
    const token = "token_" + Math.random();
    client.set(token, 'exists');
    res.cookie('auth', token);
    res.redirect(302, 'http://localhost/');
});

app.listen(port, () => {
    console.log(`Server is listening at http://localhost:${port}`);
});

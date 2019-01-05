const express = require('express');

let app = express();

app.get('/', (req, res) => {
    res.send({
        id: 1,
        fname: 'Ivan'
    });
});

app.get('/about', (req, res) => {
    res.send('About page.');
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Error occured.'
    });
});

app.listen(3000);
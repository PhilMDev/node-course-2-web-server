const express = require('express');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append to server log.');
        }
    });
    next();
});

/*app.use((req, res, next) => {
    res.sendFile('brb.html',options);
});*/

var options = {
    root: __dirname + '/public/',
    dotfiles: 'deny',
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
};

app.get('/', (req, res) => {
    //res.send('<h1>Hello Express</h1>');
    res.send({
        name: 'Phil',
        likes: ['chinese food','Marge']
    });
});

app.get('/about', (req, res) => {
    res.send('About page.');
});

app.get('/help', (req, res) => {
    res.sendFile('help.html', options);
})

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'This is an error!'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});


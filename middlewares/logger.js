const fs = require('fs');

let log = (req, res, next) => {
    let now = new Date().toString();
    const message = `Requested at: ${now} Method: ${req.method} URL: ${req.url}`;

    console.log(message);

    fs.appendFile('logs.txt', message + '\n', (err) => console.log);
    next();
};

module.exports = {
    log
};
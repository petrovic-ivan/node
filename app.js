console.log('Starting app');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

var argv = yargs.argv;
var command = argv._[0];
console.log('Command: ', command);

if (command === 'add') {
    const message = notes.addNote(argv.title, argv.body);
    console.log(message);
} else if (command === 'list') {
    notes.getAll();
} else if (command === 'read') {
    notes.getNote(argv.title);
} else if (command === 'remove') {
    const removed = notes.removeNote(argv.title);
    removed ? console.log(`Note "${argv.title}" removed!`) : console.log('Not found note.');
} else {
    console.log('Command not recognized.');
}
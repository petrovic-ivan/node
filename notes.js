console.log('Starting notes.js');

const fs = require('fs');

let fetchNotes = () => {
    try {
        let allNotes = fs.readFileSync('note-data.json');
        return JSON.parse(allNotes);
    } catch (e) {
        return [];
    }
};

let saveNotes = (notes) => {
    fs.writeFileSync('note-data.json', JSON.stringify(notes));
};

let addNote = (title, body) => {

    let note = {
        title,
        body
    };

    let notes = fetchNotes();
    let duplicateNotes = notes.filter(note => note.title === title);

    let message = 'Title already exists!'
    if (duplicateNotes.length === 0) {
        notes.push(note);
        saveNotes(notes);
        message = 'Note created.';
    }

    return message;
};

let getAll = () => {
    return fetchNotes();
};

let getNote = (title) => {
    const notes = fetchNotes();
    const filteredNotes = notes.filter(note => note.title === title);
    return filteredNotes[0];
};

let removeNote = (title) => {
    const notes = fetchNotes();
    const filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
};

let logNote = (note) => {
    console.log('-------');
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
};

let logNotes = (notes) => {
    notes.forEach(note => {
        console.log('-------');
        console.log(`Title: ${note.title}`);
        console.log(`Body: ${note.body}`);
    });
};

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote,
    logNotes
};
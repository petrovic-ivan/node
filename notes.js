console.log('Starting notes.js');

const fs = require('fs');

let fetchNotes = () => {
    try {
        let allNotes = fs.readFileSync('note-data.json');
        return JSON.parse(allNotes);
    } catch (e) {
        return [];
    }
}

let saveNotes = (notes) => {
    fs.writeFileSync('note-data.json', JSON.stringify(notes));
}

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
    console.log('Getting all notes...');
}

let getNote = (title) => {
    console.log(`Getting note ${title}`);
}

let removeNote = (title) => {
    const notes = fetchNotes();
    const filteredNotes = notes.filter(note => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}

module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote
};
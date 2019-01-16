const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { ObjectId } = require('mongodb');

const id = '5c3e832a25fd6b2e501b5079';

if (!ObjectId.isValid(id)) {
    console.log('Invalid ID.');
}

User.findById(id).then(console.log, console.log).catch(err => console.log('Unhangled error: ', err));

// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log('Todos: ', todos);
// });

// Todo.findOne({
//     _id: id
// }).then((todos) => {
//     console.log('Todos one: ', todos);
// });

// Todo.findById({
//     _id: id
// }).then((todos) => {
//     console.log('Todos by id: ', todos);
// }).catch(console.log);
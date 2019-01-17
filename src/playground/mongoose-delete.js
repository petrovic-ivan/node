const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');
const { ObjectId } = require('mongodb');


if (!ObjectId.isValid(id)) {
    console.log('Invalid ID.');
}


Todo.deleteOne({
    _id: id
}).then((res) => {
    console.log('Delted: ', res);
});
const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const mongoose = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    const todo = new Todo({
        text: req.body.text
    });

    todo.save().then((doc) => {
        res.send(doc);
    }, (err) => {
        res.status(400).send(err);
    });
});

app.get('/todos', (req, res) => {

    Todo.find({}).then((todos) => {
            res.send({ todos });
        }, (err) => {
            res.status(400).send(err);
        })
        .catch(err => console.log(err));
});

app.get('/todos/:id', (req, res) => {

    const id = req.params.id;
    const valid = ObjectId.isValid(id);

    if (valid) {
        Todo.findById({
            _id: id
        }).then(success => {
            res.status(200);
            res.send(success);
        }, reject => {
            res.status(404);
        });
    }
    res.status(404);
    res.send('Something is wrong.');
});

app.listen(3000, () => {
    console.log('Started on port 3000.');
});

module.exports = { app };
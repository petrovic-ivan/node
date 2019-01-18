const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId } = require('mongodb');
const mongoose = require('./db/mongoose');
const { User } = require('./models/user');
const { Todo } = require('./models/todo');

const env = process.env.NODE_ENV || 'development';
process.env.PORT = 3000;
if (env === 'development') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoApp';
} else if (env === 'test') {
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodoAppTest';
}
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

app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;
    console.log(!ObjectId.isValid(id));
    if (!ObjectId.isValid(id)) {
        res.status(400).send('Failed');
    }

    Todo.findByIdAndDelete(id)
        .then(result => {
            res.status(200).send(result);
        }, reason => {
            res.status(404).send(reason);
        }).catch(e => {
            res.status(500).send();
        });

});

app.patch('/todos/:id', (req, res) => {
    const todo = req.body.todo;
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400).send('Failed');
    }

    Todo.updateOne({ '_id': id }, { $set: { "text": todo.text, "completed": todo.completed } })
        .then(result => {
            res.status(200).send(result);
        }, reason => {
            res.status(404).send(reason);
        }).catch(e => {
            res.status(500).send();
        });

});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Started on port ${port}.`);
});

module.exports = { app };
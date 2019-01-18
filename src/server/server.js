require('./config/config');
require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const {
    ObjectId
} = require('mongodb');
const {
    Todo
} = require('./models/todo');

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
            res.send({
                todos
            });
        }, (err) => {
            res.status(400).send(err);
        })
        .catch(err => console.log(err));
});

app.get('/todos/:id', (req, res) => {

    const id = req.params.id;
    const valid = ObjectId.isValid(id);

    if (valid) {
        Todo.findById(id).exec((err, result) => {
            if (err) {
                res.status(404);
            } else if (result) {
                res.status(200);
                res.send(result);
            }
        });
    }
});

app.patch('/todos/:id', (req, res) => {
    const todo = req.body.todo;
    const id = req.params.id;

    if (!ObjectId.isValid(id)) {
        res.status(400).send('Failed');
    }

    Todo.updateOne({
            '_id': id
        }, {
            $set: {
                "text": todo.text,
                "completed": todo.completed
            }
        })
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

module.exports = {
    app
};
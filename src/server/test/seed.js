const { ObjectID } = require('mongodb');
const { Todo } = require('./../models/todo');
const { User } = require('./../models/user');
const jwt = require('jsonwebtoken');

const todos = [{
        _id: new ObjectID(),
        text: 'First test todo'
    },
    {
        _id: new ObjectID(),
        text: 'Second test todo',
        completed: true,
        completedAt: 333
    }
];

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
        _id: userOneId,
        email: 'test@test.com',
        password: 'qqaqa',
        tokens: [{
            access: 'auth',
            token: jwt.sign({
                _id: userOneId,
                access: 'auth'
            }, 'abc123').toString()
        }]
    },
    {
        _id: userTwoId,
        email: 'test1@test.com',
        password: 'qqaqa',
        tokens: [{
            access: 'auth',
            token: jwt.sign({
                _id: userOneId,
                access: 'auth'
            }, 'abc123').toString()
        }]
    }
];

const populateUsers = (done) => {
    User.deleteMany().then(() => {
        const save1 = new User(users[0]).save();
        return Promise.all([save1]);
    }).then(() => {
        done();
    });
};

const populateTodos = (done) => {
    Todo.deleteMany({}).then(() => {
        return Todo.insertMany(todos);
    }).then(() => {
        done();
    }, () => {});
};

module.exports = {
    todos,
    users,
    populateTodos,
    populateUsers
};
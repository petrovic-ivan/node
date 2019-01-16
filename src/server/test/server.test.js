const expect = require('expect');
const request = require('supertest');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const dummyTodos = [{
        text: 'First test todo.'
    },
    {
        text: 'Second test todo.'
    }
];

beforeEach(done => {
    Todo.remove({}).then(() => {
            return Todo.insertMany(dummyTodos);
        })
        .then(() => { done(); });
});

describe('POST /todos', () => {
    it('should create new todo', (done) => {
        const text = 'Test todo test';

        request(app)
            .post('/todos')
            .send({ text })
            .expect(200)
            .expect((res) => {
                expect(res.body.text).toBe(text);
            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                } else {
                    Todo.find().then((todos) => {
                        expect(todos.length).toBe(1);
                        done();
                    }).catch(err => done(err));
                }
            });
    });

    it('should not create todo with invalid text.', (done) => {
        const text = ' ';
        console.log('res');
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err, res) => {
                if (err) {
                    return done(err);
                }
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(0);
                    done();
                }).catch(err => done(err));
            });
    });
});
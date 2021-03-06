const expect = require('expect');
const request = require('supertest');
const { ObjectId } = require('mongodb');
const { app } = require('./../server');
const { Todo } = require('./../models/todo');
const { populateTodos, populateUsers, users, todos } = require('./seed');

let todoId;

beforeEach(done => populateUsers(done));
// beforeEach(done => populateTodos(done));

// describe('POST /todos', () => {
//     it('should create new todo', (done) => {
//         const text = 'Test todo test';

//         request(app)
//             .post('/todos')
//             .send({ text })
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBe(text);
//             })
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 } else {
//                     Todo.find().then((todos) => {
//                         expect(todos.length).toBe(1);
//                         done();
//                     }).catch(err => done(err));
//                 }
//             });
//     });

//     it('should not create todo with invalid text.', (done) => {
//         const text = ' ';
//         console.log('res');
//         request(app)
//             .post('/todos')
//             .send({})
//             .expect(400)
//             .end((err, res) => {
//                 if (err) {
//                     return done(err);
//                 }
//                 Todo.find().then((todos) => {
//                     expect(todos.length).toBe(0);
//                     done();
//                 }).catch(err => done(err));
//             });
//     });
// });

// describe('GET /todos', () => {
//     it('should return todo doc', (done) => {
//         request(app)
//             .get(`/todos`)
//             .expect(200)
//             .end(done);

//     });
// });

// describe('DELETE /todos/:id', () => {
//     it('should fail to delte todo doc', (done) => {
//         const id = 'dsfddswe23';

//         request(app)
//             .delete(`/todos/${id}`)
//             .expect(400)
//             .end(done);
//     });

//     it('should delte todo doc', (done) => {
//         request(app)
//             .delete(`/todos/${todoId}`)
//             .expect(200)
//             .end(done);
//     });

// });



describe('POST /users', () => {

    it('should create a user', (done) => {
        const email = 'example@example.com';
        const password = '12312ewdsa';
        expect(1).toBe(1);

        request(app)
            .post('/users')
            .send({ email, password })
            .expect(200)
            .end(done);
    });

});
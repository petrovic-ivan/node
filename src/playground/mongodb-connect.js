const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to Mongo DB.');

    const db = client.db('TodoApp');
    db.collection('Users').insertOne({ name: 'marc', age: '25', location: 'san francisco' }, (err, res) => {
        if (err) {
            console.log('Unable to insert user.', err);
        }
        console.log(res.ops[0]._id.getTimestamp());
    });
    client.close();
});
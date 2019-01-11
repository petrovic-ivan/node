const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to Mongo DB.');

    const db = client.db('TodoApp');
    const data = db.collection('Todos').deleteMany({ text: 'Do something' }).then(console.log, console.log);
    console.log(data);
    client.close();
});
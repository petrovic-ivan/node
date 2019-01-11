const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {

    if (err) {
        return console.log('Unable to connect to MongoDB');
    }
    console.log('Connected to Mongo DB.');

    const db = client.db('TodoApp');
    const data = db.collection('Todos').findOneAndUpdate({ _id: new ObjectId('5c37eee0e9a4fbbe86cd45dd') }, {
        $set: {
            text: 'Dinner',
            completed: false
        }
    }).then(console.log, console.log);
    console.log(data);
    client.close();
});
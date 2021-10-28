const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId
require('dotenv').config()


const app = express();
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.3zfz5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();



    }
    finally {
        // await client.close()
    }


}
run().catch(console.dir)







app.get('/', (req, res) => {
    res.send('THIS IS ADVENTOUR SERVER')
})

app.listen(port, () => {
    console.log('LISTENING PORT', port);
})
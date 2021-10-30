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

        const database = client.db("adventour");
        const offersCollection = database.collection("touroffers");
        const bookingCollection = database.collection("bookings")

        //GET ALL OFFERS
        app.get('/offers', async (req, res) => {
            const cursor = offersCollection.find({});
            const result = await cursor.toArray()
            res.send(result)
        })

        //GET A SINGLE OFFER
        app.get('/offers/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) };
            const result = await offersCollection.findOne(query);
            res.send(result)
        })


        //post A booking
        app.post('/bookings', async (req, res) => {
            const booking = req.body
            const result = await bookingCollection.insertOne(booking)
            res.json(result)
        })

        //get all bookings
        app.get('/bookings', async (req, res) => {
            const cursor = bookingCollection.find({})
            const result = await cursor.toArray()
            res.send(result)
        })


        //delete a booking
        app.delete("/bookings/:id", async (req, res) => {
            const id = (req.params.id);
            const query = { _id: ObjectId(id) }
            const result = await bookingCollection.deleteOne(query);
            res.send(result);
        });

        //get my bookings
        app.get("/mybookings/:email", async (req, res) => {
            const email = req.params.email
            const query = { email: email }
            const result = await bookingCollection.find(query).toArray();
            res.send(result);
        });

        //delet a mybooking
        app.delete("/mybookings/:id", async (req, res) => {
            const id = (req.params.id);
            const query = { _id: ObjectId(id) }
            const result = await bookingCollection.deleteOne(query);
            res.send(result);
        });





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
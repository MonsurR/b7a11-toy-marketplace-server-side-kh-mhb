const express = require('express')
const cors = require('cors');
const app = express()
require('dotenv').config();
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());




const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://mahmudulhasanw3b:${process.env.MONGO_PASSWORD}@cluster0.skf8emk.mongodb.net/?retryWrites=true&w=majority`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});
async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        const database = client.db("sportscar");
        const car = database.collection("car");
        const categories = database.collection('categories');

        app.get('/cars', async (req, res) => {
            const results = await car.find().toArray();
            console.log(results);
            res.send(results);
        })
        app.get('/catagorywise/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = {
                category: id
            }
            const results = await car.find(query).toArray();
            console.log(results);
            res.send(results);
        })
        app.get('/details/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id);
            const query = {
                _id: new ObjectId(id)
            }
            const results = await car.findOne(query);
            console.log(results);
            res.send(results);
        })
        app.get('/myproducts', async (req, res) => {
            const email = req.query.email;
            console.log(email)
            const query = {
                email: email
            }
            const results = await car.find(query).toArray();
            console.log(results);
            res.send(results);
        })
        app.post('/productadd', async (req, res) => {
            const data = req.body;
            const result = await car.insertOne(data);
            res.send(result);
        })
        app.post('/updateItem', async (req, res) => {
            const data = req.body;

            const filter = { _id: new ObjectId(data._id) }
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    price: data.price,
                    rating: data.rating,
                    quantity: data.quantity,
                    details: data.details
                },
            };

            const result = await car.updateOne(filter, updateDoc, options);
            console.log(result)
            res.send(result);
        })
        app.delete(`/deleteitem`, async (req, res) => {
            const id = req.query.id;
            const query = { _id: new ObjectId(id) }
            // console.log(query);
            const result = await car.deleteOne(query)
            res.send(result)
        })
        app.get('/categories', async (req, res) => {

            const result = await categories.find().toArray;
            res.send(result);
        })


    } finally {
        // Ensures that the client will close when you finish/error

    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Baby Corner Shop')
});
app.listen(port, () => {
    console.log(`Baby Corner Shop  Crud on ${port}`)
})